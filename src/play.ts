import { Context } from './types'
import Quads from './quads'
import { Play } from 'iksir'
import Anim from './anim' 
import { ticks, dur } from './shared'
import { GameObject } from './objects'

export default class PlayV extends GameObject {

  constructor(ctx: Context) {
    super(ctx)
 }

  init(x: number, y: number) {

  }

  update = (dt: number) => {
  }

  draw = () => {
    let { g, qs } = this

    g.draw(qs.qbg, 0, 0, 0, 320, 180)
  }
}
