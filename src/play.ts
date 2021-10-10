import { Context } from './types'
import { ShapeOnGrid } from './abstract'

export default class Play {


  song: ShapeOnGrid

  constructor(readonly ctx: Context) {
    this.song = ShapeOnGrid.empty
  }

  update = (dt: number) => {
  }

  draw = () => {
  }
}
