import { Context } from './types'
import { Play } from 'iksir'
import Grid from './grid'
import PlayV from './play'
import Camera from './camera'
import Quads from './quads'
import Maps from './maps'
import Anim from './anim'
import { ticks, dur } from './shared'
import Body from './physics'
import { Vec2, Rectangle } from './matrix'
import Input from './input'
import Sensor from './sensor'

export abstract class GameObject {
  get g(): Play   { return this.ctx.g }
  get qs(): Quads { return this.ctx.qs }
  get ms(): Maps { return this.ctx.ms }
  get input(): Input { return this.ctx.input }

  abstract readonly camera: Camera

  anim(grid: Array<number>,
    fx: number, fy: number,
    durations: Array<number>,
    xoffsets?: Array<number>,
    yoffsets?: Array<number>): Anim {
      return new Anim(this.camera,
        this.ctx.a[0],
        grid,
        fx, fy, durations, xoffsets, yoffsets)
    }

  constructor(readonly ctx: Context) {}

  abstract init(x: number, y: number): void;
  abstract update(dt: number): void;
  abstract draw(): void;

}

export abstract class GameRoomObject extends GameObject {


  sensor(box: Rectangle, dir: Vec2): Sensor {
    return new Sensor(this,
      box, dir)
  }


  get grid(): Grid<boolean> { return this.play.grid }
  get camera(): Camera { return this.play.camera }

  _ctarget: Vec2 = [0, 0]

  get ctarget(): Vec2 {
    this._ctarget[0] = this.x + this.w * 0.5
    this._ctarget[1] = this.y + this.h * 0.5
    return this._ctarget
  }


  abstract x: number
  abstract y: number
  abstract w: number
  abstract h: number

  constructor(ctx: Context,
    readonly play: PlayV) { super(ctx) }

  update(dt: number) {
    this.ctarget
  }
}

export let down: Vec2 = [0, 4]

export abstract class PlayerObject extends GameRoomObject {


  readonly w: number = 16
  readonly h: number = 16

  _sa: Sensor = this.sensor([0, this.h, 4, 1], down)
  _sb: Sensor = this.sensor([this.w - 4, this.h, 4, 1], down)

  get sa(): Sensor {
    return this.facing === 1 ? this._sb : this._sa
  }
  get sb(): Sensor {
    return this.facing === 1 ? this._sa : this._sb
  }


  get agap1(): boolean {
    return !this.sa.tile && this.sa.extend && this.sb.tile
  }

  constructor(ctx: Context,
    play: PlayV,
    readonly facing: number) { super(ctx, play) }

  draw() {
    this.sa.draw(this.camera, this.qs)
    this.sb.draw(this.camera, this.qs)
  }
}
