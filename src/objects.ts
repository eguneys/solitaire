import { Context } from './types'
import { Play } from 'iksir'
import PlayV from './play'
import Camera from './camera'
import Quads from './quads'
import Maps from './maps'
import Anim from './anim'
import { ticks, dur } from './shared'
import Body from './physics'
import { Vec2, Rectangle } from './matrix'
import Input from './input'

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


  get camera(): Camera { return this.play.camera }

  abstract x: number
  abstract y: number

  constructor(ctx: Context,
    readonly play: PlayV) { super(ctx) }
}

