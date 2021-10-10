import { Quad } from 'iksir'
import { Images } from './types'


export default class Quads {


  qfront: Quad
  qback: Quad

  qsuits: Array<Quad>
  qranks: Array<Quad>

  constructor(readonly a: Images) {

    this.qfront = Quad.make(a[0], 0, 0, 30, 40)
    this.qback = Quad.make(a[0], 30, 0, 30, 40)
    this.qsuits = [
      Quad.make(a[0], 0, 48, 12, 12),
      Quad.make(a[0], 12, 48, 12, 12),
      Quad.make(a[0], 24, 48, 12, 12),
      Quad.make(a[0], 36, 48, 12, 12)]

    this.qranks = [
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
}
