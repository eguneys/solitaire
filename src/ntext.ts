import { Context, IDrawer } from './types'
import { Quad } from 'iksir'

export default class Text {

  $canvas: any
  $ctx: any
  quad: Quad

  constructor() {

    this.$canvas = document.createElement('canvas')
    this.$canvas.width = 320
    this.$canvas.height = 180
    this.$ctx = this.$canvas.getContext('2d')!
    this.quad = Quad.make(this.$canvas, 0, 0, 320, 180)
  }


  print(msg: string, wx: number, wy: number) {

    this.$ctx.fillRect(0, 0, 10, 10)
  }


  draw(g: IDrawer) {
   g.draw(this.quad, 0, 0, 0, 1, 1)
  }
}
