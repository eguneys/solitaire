import { Play, Quad } from 'iksir'
import { IDrawer } from './types'


export default class PlayDrawer implements IDrawer {


  constructor(readonly play: Play) {}


  rect(quad: Quad, x: number, y: number,
    w: number, h: number): void {
      this.play.draw(quad, x, y, 0, w, h)
    }

  draw(quad: Quad, x: number, y: number, r: number,
    sx: number, sy: number): void {
      this.play.draw(quad, x, y, r, sx, sy)
    }




}
