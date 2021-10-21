import { Play, Quad } from 'iksir'
import { IDrawer } from './types'

export default class PlayDrawer implements IDrawer {

  constructor(readonly g: Play) {}


  x: number = 0
  y: number = 0


  translate(x: number, y: number) {
    this.x = x
    this.y = y
  }

  rect(quad: Quad, x: number, y: number,
    w: number, h: number): void {
    }
  draw(quad: Quad, x: number, y: number,
    r: number, sx: number, sy: number): void {

      this.g.draw(quad, this.x + x, this.y + y, r, sx, sy)
    }


}
