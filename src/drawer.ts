import { Play, Quad } from 'iksir'
import { IDrawer } from './types'

export default class PlayDrawer implements IDrawer {

  constructor(readonly g: Play) {}

  rect(quad: Quad, x: number, y: number,
    w: number, h: number): void {
    }
  draw(quad: Quad, x: number, y: number,
    r: number, sx: number, sy: number): void {

      this.g.draw(quad, x, y, r, sx, sy)
    }


}
