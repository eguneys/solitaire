import { Quad } from 'iksir'
import { IDrawer } from './types' 
import { lerp } from './util'

export default class Anim {

  get w(): number { return this.grid[0] }
  get h(): number { return this.grid[1] }

  frames: Array<Quad>; 



  i: number = 0
  ox: number = 0
  oy: number = 0
  frame: number = 0
  ri: number = 0

  get _frame(): Quad { return this.frames[this.frame] }
  get _duration(): number { return this.durations[this.frame] } 

  get _ox(): number { return this.xoffsets[this.frame] || 0 }
  get _oy(): number { return this.yoffsets[this.frame] || 0 }

  get iframe(): number {
    return this.i / this._duration
  }

  constructor(
    readonly g:IDrawer,
    readonly image: HTMLImageElement,
    readonly grid: Array<number>, 
    readonly fx: number, readonly fy: number,
    readonly durations: Array<number>,
    readonly xoffsets: Array<number> = [],
    readonly yoffsets: Array<number> = []) {

    this.frames = durations.map((_, i) => {
        let x = (grid[2] || 0) + (fx + i) * grid[0],
            y = (grid[3] || 0) + fy * grid[1],
            w = grid[0],
            h = grid[1]

      return Quad.make(image, x, y, w, h)
    })

    this.ox = this._ox
    this.oy = this._oy

  }

  gotof(_frame: number) {
    this.frame = _frame
    this.i = 0
    this.ri = 0
    this.ox = this._ox
    this.oy = this._oy
  }

  update(dt: number) {
    this.i += dt
    if (this.i >= this._duration) {
      this.frame = (this.frame + 1) % this.durations.length
      this.i = 0
      if (this.frame === 0) {
        this.ri++
        this.ox = this._ox
        this.oy = this._oy
      }
    }

    this.ox = lerp(0.3, this.ox, this._ox)
    this.oy = lerp(0.3, this.oy, this._oy)
  }


  draw(x: number, y: number, flipH: boolean = false, flipV: boolean = false, scalex: number = 1, scaley: number = 1) {
    let frame = this._frame

    if (flipH) {
      x += frame.w
      scalex *= -1
    }
    this.g.draw(frame,
      x + this.ox, y + this.oy,
      0, scalex, scaley) 
  }
}
