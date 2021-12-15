import { Context } from './types'
import { ticks, dur } from './shared'
import { GameObject } from './objects'
import Anim from './anim'
import './solitaire'

export default class Play extends GameObject {


  init(x: number, y: number) {
  }


  update(dt: number) {
  }


  draw() {
    let { qbg } = this.qs

    this.g.draw(qbg, 0, 0, 0, 320, 180)

  }
}



export class Card extends GameObject {

  readonly abg: Anim = this.anim([30, 40, 0, 32], 0, 0, [dur, dur])

  readonly asuits: Anim = this.anim([12, 12, 0, 80], 0, 0, [dur, dur, dur, dur])

  readonly anumbers: Anim = this.anim([10, 10, 0, 117], 0, 0, [dur, dur, dur, dur, dur, dur, dur, dur, dur, dur, dur, dur, dur])

  init() {

  }


  update(dt: number) { }


  draw() {
  
    this.abg.draw(0, 0)
    this.anumbers.draw(1, 1)
    this.asuits.draw(16, 1)
  }
}
