import Iksir from 'iksir'
import Assets from './assets'
import { Context } from './types'
import spritesPng from '../assets/sprites2.png'
import Play from './play'

import Quads from './quads'

export default function app(element: HTMLElement) {

  Assets([spritesPng]).then(
    a => {
      let g = Iksir(element, 180, 320)

      g.glOnce(a[0])

      let qs = new Quads(a)

      let context: Context = {
        g,
        a,
        qs
      }

      let play = new Play(context)

      let last: number
      function step(ts: number) {

        let dt = (ts - (last || ts)) / 1000
        last = ts


        play.update(dt)
        play.draw()

        g.flush()

        requestAnimationFrame(step)
      }

      requestAnimationFrame(step)

    })


}
