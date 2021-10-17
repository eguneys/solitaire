import { Context } from './types'
import PlayV from './play'
import Camera from './camera'
import Anim from './anim'
import { Vec2, Rectangle } from './matrix'
import Input from './input'
import Body from './physics'
import { ticks, dur } from './shared'
import { GameRoomObject } from './objects'
import Sensor from './sensor'

export const down: Vec2 = [0, +4]


export const topdx = (4 * 24 / ticks.second) 
export const decceldx = (topdx / ticks.sixth) 
export const turndecceldx = (4 / ticks.second)
export const acceldx = (topdx / ticks.second)
export const frictiondx = (topdx / ticks.sixth)

export const topfalldy = (4 * 24 / ticks.second)
export const gravitydy = (topfalldy / ticks.second)

export default class Player extends GameRoomObject {

  _ctarget: Vec2 = [0, 0]
  get ctarget(): Vec2 {
    this._ctarget[0] = this.body.cx
    this._ctarget[1] = this.body.cy
    return this._ctarget
  }

  get x(): number {
    return this.body.x
  }

  get y(): number {
    return this.body.y
  }
  
  get w(): number {
    return this.body.w
  }

  get h(): number {
    return this.body.h
  }

  aidle: Anim = this.anim([32, 32, 32, 0],
    0, 0, [dur], [-10], [-16])

  body!: Body


  _sa!: Sensor
  _sb!: Sensor

  facing: number = 1
  stepping: boolean = false

  get sa(): Sensor {
    return this.facing === 1 ? this._sb : this._sa
  }
  get sb(): Sensor {
    return this.facing === 1 ? this._sa : this._sb
  }

  get collided(): boolean {
    return this.play.fcollide(this.body)
  }

  get grounded(): boolean {
    return this.sa.tile && this.sb.tile
  }

  get agap1(): boolean {
    return !this.sa.tile && this.sa.extend && this.sb.tile
  }

  get agap(): boolean {
    return !this.sa.tile && !this.sa.extend &&
      this.sb.tile
  }

  get air(): boolean {
    return !this.sa.tile && !this.sb.tile
    &&
      !this.sa.extend && !this.sb.extend
  }

  constructor(ctx: Context,
    play: PlayV) {super(ctx, play)
  }

  init(x: number, y: number) {
    this.body = new Body(x, y, 
      0, 0,
      10, 16,
    this.fcollide)
    this.camera.follow(this.ctarget)

    this._sa = new Sensor(this.grid,
      this.body.sa,
      down
    )
    this._sb = new Sensor(this.grid,
      this.body.sb,
    down)
  }

  fcollide = (body: Body) => {

    if (this.stepping) {
      return false
    }
    return this.collided
  }

  update(dt: number) {

    let { input } = this


    let deccelx = decceldx * dt,
      turndeccelx = turndecceldx,
      topx = topdx,
      accelx = acceldx * dt,
      frictionx = frictiondx * dt


    let gravityy = gravitydy * dt,
        topfally = topfalldy

    this.ctarget

    let ix = 0


    if (input.btn('left') !== 0) {
      ix = -1
    } else if (input.btn('right') !== 0) {
      ix = 1
    }


    if (this.stepping) {
      
    } else {

      if (this.grounded) {

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
      }

      if (this.agap1) {
        this.stepping = true
      }

      if (this.air) {
        this.body.dy += gravityy 

        if (this.body.dy > topfally) {
          this.body.dy = topfally
        }
      }
    }

    this.facing = ix




    this.aidle.update(dt)
    this.body.move(dt)
  }

  draw() {
    this.aidle.draw(this.x, this.y)
    this.body.draw(this.camera, this.qs.qyellow)

    this.sa.draw(this.camera, this.qs)
    this.sb.draw(this.camera, this.qs)
  }
}
