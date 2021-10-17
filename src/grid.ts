import { Maybe } from './types'
import Anim from './anim'
import { Play } from 'iksir'

export default class Grid<A> {


  data: Array<A> = []



  get width(): number { return this.cellw *this.nbtilesx } 
  get height(): number { return this.cellh *this.nbtilesy } 


  constructor(
    readonly cellw: number,
    readonly cellh: number,
    readonly nbtilesx: number,
    readonly nbtilesy: number) {}


  pos2key(xw: number, yw: number): Maybe<number> {
    if (xw >= this.width || yw >= this.height || xw < 0 || yw < 0) {
      return undefined
    }
    let [x, y] = [Math.floor(xw/this.cellw), Math.floor(yw/this.cellh)]
    return x + y * this.nbtilesx
  }
  
  
  check(x: number, y: number) {
    return this.collide(x, y, 1, 1)
  }



  collide(x: number, y: number,
    w: number, h: number,
    ox: number = 0,
    oy: number = 0) {


    for (let i = 0; i < w; i++) {
      for (let j = 0; j < h; j++) {
        if (this.get(ox + x + i, oy + y + j)) {
          return true
        }
      }
    }
    return false
  }

  get(xw: number, yw: number): Maybe<A> {
    let key = this.pos2key(xw, yw)
    if (key) {
      return this.data[key]
    }
  }


  set(x: number, y: number, value: A) {
    let key = this.pos2key(x, y)
    if (key) {
      this.data[key] = value
    }
  }

  draw(atile: Anim) {
    for (let i = 0; i < this.nbtilesx; i++) {
      for (let j = 0; j < this.nbtilesy; j++) {
        let t = this.get(i * this.cellw, j * this.cellh)
        if (t) {
          atile.draw(i * this.cellw, j * this.cellh)
        }
      }
    }
  }


}
