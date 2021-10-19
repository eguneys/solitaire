import { Context } from './types'
import Quads from './quads'
import { Play } from 'iksir'
import Anim from './anim' 
import { ticks, dur } from './shared'
import { GameObject } from './objects'


export default class PlayV extends GameObject {

  atile: Anim = this.anim([4, 4], 7, 0, [dur]);

  shape: Shape
  pos: Pos

  constructor(ctx: Context) {
    super(ctx)
  } 

  init() {

  }

  update = (dt: number) => {
  }

  draw = () => {
    let { g, qs } = this

    g.draw(qs.qbg, 0, 0, 0, 180, 320)
  }
}
