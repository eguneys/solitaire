import { Context, IDrawer } from './types'
import { Play } from 'iksir'
import PlayV from './play'
import Quads from './quads'
import Anim from './anim'
import { ticks, dur } from './shared'
import Input from './input'
import PlayDrawer from './drawer'
import _Text from './text'

export abstract class GameObject {
  get qs(): Quads { return this.ctx.qs }
  get input(): Input { return this.ctx.input }
  get $text(): _Text { return this.ctx.text }


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
  }

  abstract init(x: number, y: number): void;
  abstract update(dt: number): void;
  abstract draw(): void;

}

