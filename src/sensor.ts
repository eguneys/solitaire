import Grid from './grid'
import { IDrawer } from './types'
import Quads from './quads'
import PlayV from './play'
import { Vec2, Rectangle } from './matrix'

export default class Sensor {


  get tile(): boolean {
    return this.grid.collide(...this.area)
  }

  get extend(): boolean {
    return this.grid
      .collide(...this.earea)
  }

  get regress(): boolean {
    return this.grid
      .collide(...this.rarea)
  }

  get earea(): Rectangle { 
    return [
      this.area[0] + this.dir[0],
      this.area[1] + this.dir[1],
      this.area[2],
      this.area[3]
    ]
  }

  get rarea(): Rectangle { 
    return [
      this.area[0] - this.dir[0],
      this.area[1] - this.dir[1],
      this.area[2],
      this.area[3]]
  }

  constructor(
    readonly grid: Grid<boolean>,
    readonly area: Rectangle,
    readonly dir: Vec2) {}


  draw(g: IDrawer, qs: Quads) {
  
    if (this.tile) {
      g.rect(qs.qred, ...this.area)
    } else {
      if (this.extend) {
        g.rect(qs.qblue, ...this.earea)
      }
    }
  }

}
