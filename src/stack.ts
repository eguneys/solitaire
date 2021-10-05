import { Context } from './types'
import { Pos, Quad } from 'iksir'

import Card from './card'

let i = 0

export default class Stack {

  static zero = (ctx: Context) => new Stack(ctx)

  constructor(readonly ctx: Context) {

    let { a } = this.ctx
  }

  pos = Pos.zero
  cards: Array<StackCard> = []

  init = () => {

  }


  update = (dt: number) => {
    

  }

  draw = () => {

    this.cards.forEach(card => card.draw(this.pos, i))

  }
}

class StackCard {

  card: Card = Card.zero(this.ctx)

  constructor(readonly ctx: Context) {

    let { a } = this.ctx
  }

  init = () => {
  }


  update = (dt: number) => {
    

  }

  draw = (pos: Pos, index: number) => {

    this.card.draw(pos)

  }


}
