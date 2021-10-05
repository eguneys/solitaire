import { Context } from './types'
import { Quad } from 'iksir'
import { Vec2 } from 'iksir'

export default class Card {

  static zero = (ctx: Context) => new Card(ctx)


  qfront: Quad
  qshapes: [Quad, Quad, Quad, Quad]
  qnums: Array<Quad>

  constructor(readonly ctx: Context) {

    let { a } = this.ctx

    this.qfront = Quad.make(a[0], 0, 0, 30, 40)
    this.qshapes = [
      Quad.make(a[0], 0, 48, 12, 12),
      Quad.make(a[0], 12, 48, 12, 12),
      Quad.make(a[0], 24, 48, 12, 12),
      Quad.make(a[0], 36, 48, 12, 12)]

    this.qnums = [
      Quad.make(a[0], 0, 64, 10, 15),
      Quad.make(a[0], 10, 64, 10, 15),
      Quad.make(a[0], 20, 64, 10, 15),
      Quad.make(a[0], 30, 64, 10, 15),
      Quad.make(a[0], 40, 64, 10, 15),
      Quad.make(a[0], 50, 64, 10, 15),
      Quad.make(a[0], 60, 64, 10, 15),
      Quad.make(a[0], 70, 64, 10, 15),
      Quad.make(a[0], 80, 64, 10, 15),
      Quad.make(a[0], 90, 64, 10, 15),
      Quad.make(a[0], 100, 64, 10, 15),
      Quad.make(a[0], 110, 64, 10, 15),
      Quad.make(a[0], 120, 64, 10, 15),
      Quad.make(a[0], 130, 64, 10, 15),
    ]

  }

  update = (dt: number) => {
    

  }

  draw = ({ x, y }: Vec2) => {
    let { g } = this.ctx

    g.draw(this.qfront, x, y)
    g.draw(this.qnums[0], x + 1, y + 1)
    g.draw(this.qshapes[0], x + 17, y + 1)

   // g.draw(this.qshapes[1], 50, 50, Math.PI * Math.sin(i++ * 0.02) , -3 + 2 * Math.sin(i++ * 0.2), 3)
  }
}
