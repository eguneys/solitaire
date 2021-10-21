import { Quad } from 'iksir'
import { Images } from './types'


export default class Quads {


  qbg: Quad = Quad.make(this.a[0],
    16, 0, 1, 1)

  constructor(readonly a: Images) {

  }

}
