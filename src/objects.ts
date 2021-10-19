import { Context, Images, IDrawer } from './types'
import Quads from './quads'
import Anim from './anim' 
import { Rectangle } from './matrix'


export class GameObject {

  get g(): IDrawer { return this.ctx.g }
  get a(): Images { return this.ctx.a }

  get qs(): Quads { return this.ctx.qs }

  constructor(readonly ctx: Context) {}


  anim(grid: Array<number>, 
    fx: number,
    fy: number,
    durations: Array<number>): Anim {
      return new Anim(this.g,
         this.a[0],
        grid,
        fx, fy, durations)
    }

}
