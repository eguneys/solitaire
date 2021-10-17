import { Quad } from 'iksir'
import { Images } from './types'


export default class Quads {


  qbg: Quad = Quad.make(this.a[0],
    0, 0, 1, 1)

  qtile: Quad = Quad.make(this.a[0],
    16, 0, 16, 16)

  qred: Quad = Quad.make(this.a[0],
    1, 0, 1, 1)

  qyellow: Quad = Quad.make(this.a[0],
    2, 0, 1, 1)

  qblue: Quad = Quad.make(this.a[0],
    3, 0, 1, 1)

  constructor(readonly a: Images) {

  }

}
