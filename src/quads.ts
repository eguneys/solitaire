import { Quad } from 'iksir'
import { Images } from './types'


export default class Quads {


  qbg: Quad = Quad.make(this.a[0],
    2047, 0, 1, 1)

  qred: Quad = Quad.make(this.a[0],
    2046, 0, 1, 1)

  qyellow: Quad = Quad.make(this.a[0],
    2045, 0, 1, 1)

  constructor(readonly a: Images) {

  }

}
