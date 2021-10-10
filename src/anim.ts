import { Quad } from 'iksir'
import { IDrawer } from './types' 

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

  }


  gotof(_frame: number) {
    this.frame = _frame
    this.i = 0
    this.ox = 0
    this.oy = 0
    this.ri = 0
  }

  update(dt: number) {
    this.i += dt
    if (this.i >= this._duration) {
      this.frame = (this.frame + 1) % this.durations.length
      this.i = 0
      if (this.frame === 0) {
        this.ri++
      }
    }
  }


  draw(x: number, y: number, flipH: boolean = false, flipV: boolean = false, scalex: number = 1, scaley: number = 1) {
    let frame = this._frame

    this.g.draw(frame, x, y, 0, scalex, scaley) 
  }
}
