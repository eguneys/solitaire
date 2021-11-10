import { Context } from './types'
import { GameObject } from './objects'


export default class Play extends GameObject {


  init(x: number, y: number) {

    this.$text.print('Eren, lives with his mom in a small village near forest and river, in Africa. Every other day, he catches fish on his boat, and sells it to collectors. He struggles with hearing random noises in his head under stress. On leisure Eren meets up with his old friend Pelin to talk about everyday life, and health.', 0, 60)
  }


  update(dt: number) {
  }


  draw() {
    this.g.draw(this.qs.qbg, 0, 0, 0, 320, 180)
  }
}

