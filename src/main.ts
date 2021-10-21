import Iksir from 'iksir'
import Assets from './assets'
import { Context } from './types'
import spritesPng from '../assets/sprites.png'
import levelsPng from '../assets/sprites2.png'
import Play from './play'

import Quads from './quads'
import Input from './input'
import PlayDrawer from './drawer'

export default function app(element: HTMLElement) {

  Assets([spritesPng, levelsPng]).then(
    a => {

      let input = new Input()
      let _g = Iksir(element, 180, 320)

      _g.glOnce(a[0])

      let qs = new Quads(a)
      let g = new PlayDrawer(_g)

      let context: Context = {
        input,
        g,
        a,
        qs,
      }

      let play = new Play(context)

      play.init()

      let last: number
      function step(ts: number) {

        let dt = (ts - (last || ts)) / 1000
        last = ts

        input.update(dt)
        play.update(dt)
        play.draw()

        _g.flush()

        requestAnimationFrame(step)
      }

      requestAnimationFrame(step)

    })


}
