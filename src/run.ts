import { Context } from './types'
import PlayV from './play'
import Camera from './camera'
import Anim from './anim'
import { Vec2, Rectangle } from './matrix'
import Input from './input'
import Body from './physics'
import { ticks } from './shared'
import { down, PlayerObject } from './objects'
import Sensor from './sensor'
import Idle from './idle'

let dur = ticks.sixth

export const topdx = (4 * 16) / (dur * 4)
export const mindx = (4 * 8) / (dur * 4)
export const acceldx = topdx / (dur * 18)

export const topdy = (4 * 1) / (dur * 3)
export const topdowndy = (4 * 1) / (dur * 1)
export const mindy = topdy * 0.5
export const accelddy = 2*topdowndy / (dur * 1)

export default class Run extends PlayerObject {


  astep: Anim = this.anim([16, 16, 0, 48],
    5, 0, 
    [dur*0.2, dur, dur, dur, dur])


  get y(): number {
    return this._y + this.tempy
  }

  x: number = 0
  _y: number = 0

  tempy: number = 0
  dx: number = mindx
  dy: number = 0


  _saheada: Sensor = this.sensor([0, this.h, 4, 1], down)
  _saheadb: Sensor = this.sensor([this.w - 4, this.h, 4, 1], down)

  get sahead(): Sensor {
    return this.facing === -1 ? this._saheada : this._saheadb
  }

  get stepdown(): boolean {
    return !this.sahead.tile && this.sahead.extend
  }


  constructor(ctx: Context,
    play: PlayV,
    facing: number) { 
    super(ctx, play, facing) }

  oldframe: number = -1

  init(x: number, y: number) {
    this.x = x
    this._y = y
    this.dx = mindx

    this.camera.follow(this.ctarget)
  }

  logx: number = this.x

  update(dt: number) {

    super.update(dt)

    let { input } = this

    this.astep.update(dt)

    let ix = 0
    if (input.btn('left') !== 0) {
      ix = -1
    } else if (input.btn('right') !== 0){
      ix = 1
    }

    if (this.astep.frame === this.oldframe) {
      if (this.astep.frame === 0) {
        
        if (ix === 0) {
          let obj = new Idle(this.ctx, this.play, this.facing)
          this.play.add(obj, this.x, this._y)
          this.play.remove(this)

        } else if (ix !== this.facing) {
          let obj = new Run(this.ctx, this.play, ix)
          this.play.add(obj, this.x, this._y)
          this.play.remove(this)
        }

      } else {
        if (this.astep.frame === 4) {
          this.dy += accelddy * dt
          if (this.dy < mindy) {
            this.dy = mindy
          } else if (this.dy > topdowndy) {
            this.dy = topdowndy
          }
        } else {
          this.dy += -1 * accelddy * dt
          if (this.dy > mindy) {
            this.dy = -mindy
          } else if (this.dy < -topdy) {
            this.dy = -topdy
          }
        }
      
        this.tempy += this.dy * dt
        if (this.tempy > 0) {
          this.tempy = 0
        }

        if (ix === 0) {
          if (this.astep.frame < 4) {
            this.astep.gotof(4)
          }
        } else if (ix !== this.facing) {
          if (this.astep.frame < 4) {
            this.astep.gotof(4)
          }
        } else {
 
          let accelx = acceldx * dt
          this.dx += accelx
          if (this.dx > topdx) {
            this.dx = topdx
          }

          let dx = this.dx * dt
          this.x += dx * ix
        }
      }
    } else {
      this.oldframe = this.astep.frame

      if (this.astep.frame === 0) {
        this.tempy = 0
      }
    }
    
  }

  draw() {
    this.sahead.draw(this.camera, this.qs)
    this.astep.draw(this.x, this.y, this.facing === -1)
 }

}
