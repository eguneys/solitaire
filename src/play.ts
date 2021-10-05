import { Context } from './types'
import { Quad } from 'iksir'
import { Vec2 } from 'iksir'

import Stack from './stack'

let i = 0

export default class Play {

  stack: Stack = Stack.zero(this.ctx)

  constructor(readonly ctx: Context) {

    let { a } = this.ctx
  }

  init = () => {}

  update = (dt: number) => {
    

  }

  draw = () => {

    this.stack.draw()

  }
}
