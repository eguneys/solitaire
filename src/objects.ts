import { Context, IDrawer } from './types'
import { Play } from 'iksir'
import PlayV from './play'
import Quads from './quads'
import Anim from './anim'
import { ticks, dur } from './shared'
import Input from './input'
import PlayDrawer from './drawer'
import _Text from './ntext'

export abstract class GameObject {
  get qs(): Quads { return this.ctx.qs }
  get input(): Input { return this.ctx.input }

  $text: _Text

  g: IDrawer

  anim(grid: Array<number>,
    fx: number, fy: number,
    durations: Array<number>,
    xoffsets?: Array<number>,
    yoffsets?: Array<number>): Anim {
      return new Anim(this.g,
        this.ctx.a[0],
        grid,
        fx, fy, durations, xoffsets, yoffsets)
    }

  constructor(readonly ctx: Context) {
    this.g = new PlayDrawer(this.ctx.g)

    this.$text = new _Text()
  }

  abstract init(x: number, y: number): void;
  abstract update(dt: number): void;
  draw(): void {
    this.$text.draw(this.g)
  }

}

