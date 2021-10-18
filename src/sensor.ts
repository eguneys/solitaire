import Grid from './grid'
import { IDrawer } from './types'
import Quads from './quads'
import PlayV from './play'
import { Vec2, Rectangle } from './matrix'
import { GameRoomObject } from './objects'

export default class Sensor {

  get grid(): Grid<boolean> {
    return this.base.grid
  }

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


  get area(): Rectangle {
    return [
      this.box[0] + this.base.x,
      this.box[1] + this.base.y,
      this.box[2],
      this.box[3]
    ]
  }


  get earea(): Rectangle { 
    let area = this.area
    return [
      area[0] + this.dir[0],
      area[1] + this.dir[1],
      area[2],
      area[3]
    ]
  }

  get rarea(): Rectangle { 
    let area = this.area
    return [
      area[0] - this.dir[0],
      area[1] - this.dir[1],
      area[2],
      area[3]]
  }

  constructor(
    readonly base: GameRoomObject,
    readonly box: Rectangle,
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
