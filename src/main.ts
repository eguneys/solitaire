import Iksir from 'iksir'
import Assets from './assets'
import { Context } from './types'
import spritesPng from '../assets/sprites.png'
import Play from './play'

export default function app(element: HTMLElement) {

  Assets([spritesPng]).then(
    a => {
      let g = Iksir(element)

      let context: Context = {
        g,
        a
      }

      let play = new Play(context)

      let last: number
      function step(ts: number) {

        let dt = ts - (last || ts)
        last = ts


        play.update(dt)
        play.draw()

        g.flush()

        requestAnimationFrame(step)
      }

      requestAnimationFrame(step)

    })


}
