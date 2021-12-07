import './index.css'
import Iksir from 'iksir'
import Assets from './assets'
import { Context } from './types'
import spritesPng from '../assets/sprites.png'
import levelsPng from '../assets/sprites2.png'
import Play from './play'

import Quads from './quads'
import Input from './input'

export default function app(element: HTMLElement) {

  Assets([spritesPng, levelsPng]).then(
    a => {

      let input = new Input()
      let g = Iksir(element, 320, 180)

      g.glOnce(a[0])

      let qs = new Quads(a)

      let context: Context = {
        input,
        g,
        a,
        qs
      }

      let play = new Play(context)

      play.init(0, 0)

      let last: number
      function step(ts: number) {

        let dt = (ts - (last || ts)) / 1000
        last = ts

        input.update(dt)
        play.update(dt)
        play.draw()

        g.flush()

        requestAnimationFrame(step)
      }

      requestAnimationFrame(step)

    })


}
