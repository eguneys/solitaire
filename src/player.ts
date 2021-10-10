import { Context } from './types'
import PlayV from './play'
import Camera from './camera'
import Anim from './anim'
import { Vec2, Rectangle } from './matrix'
import Input from './input'
import Body from './physics'
import { ticks, dur } from './shared'
import { GameRoomObject } from './objects'

export const topdx = (4 * 24 / ticks.second) 
export const decceldx = (topdx / ticks.sixth) 
export const turndecceldx = (4 / ticks.second)
export const acceldx = (topdx / ticks.second)
export const frictiondx = (topdx / ticks.sixth)

export default class Player extends GameRoomObject {


  _ctarget: Vec2 = [0, 0]
  
  get ctarget(): Vec2 {
    this._ctarget[0] = this.x
    this._ctarget[1] = this.y
    return this._ctarget
  }

  get x(): number {
    return this.body.x
  }

  get y(): number {
    return this.body.y
  }


  aidle: Anim = this.anim([16, 16],
    2, 0, [dur])

  body!: Body

  constructor(ctx: Context,
    play: PlayV) {super(ctx, play)


  }

  init(x: number, y: number) {
    this.body = new Body(x, y, 
      0, 0,
      16, 16,
    this.play.fcollide)
    this.camera.follow(this.ctarget)

  }

  update(dt: number) {

    let { input } = this


    let deccelx = decceldx * dt,
      turndeccelx = turndecceldx,
      topx = topdx,
      accelx = acceldx * dt,
      frictionx = frictiondx * dt

    this.ctarget

    let ix = 0


    if (input.btn('left') !== 0) {
      ix = -1
    } else if (input.btn('right') !== 0) {
      ix = 1
    }


    // http://info.sonicretro.org/SPG:Running
    if (ix < 0) { // press left
      if (this.body.dx > 0) { // moving right
        this.body.dx -= deccelx // decelerate
        if (this.body.dx <= 0) {
          this.body.dx = -1 * turndeccelx
        }
      } else if (this.body.dx > -topx) { // moving left

        this.body.dx -= accelx // accelarate
        if (this.body.dx <= - topx) {
          this.body.dx = -topx // limit top
        }
      }
    }

    if (ix > 0) { // press right
      if (this.body.dx < 0) { // moving left
        this.body.dx += deccelx // decelerate
        if (this.body.dx >= 0) {
          this.body.dx = turndeccelx
        }
      } else if (this.body.dx < topx) { // moving right

        this.body.dx += accelx // accelarate
        if (this.body.dx >= topx) {
          this.body.dx = topx // limit top
        }
      }
    }


    if (ix === 0) {
      this.body.dx -= Math.min(Math.abs(this.body.dx), frictionx) * Math.sign(this.body.dx) // deccelarate
    }


    this.body.move(dt)
  }

  draw() {
    this.aidle.draw(this.x, this.y)
  }
}
