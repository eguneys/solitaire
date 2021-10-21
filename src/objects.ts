import { Context, Images, IDrawer } from './types'
import Input from './input'
import Quads from './quads'
import Anim from './anim' 
import { Rectangle } from './matrix'
import { ofInterval, onInterval } from './util'


export class GameObject {

  get input(): Input { return this.ctx.input }
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

export class GameObjectWithScene extends GameObject {


  constructor(
    readonly scene: Scene,
  ctx: Context) { super(ctx) }


  update(dt: number) {
    this.scene.update(dt)
  }
}

export class Scene {

  t: number = 0
  wast: number = 0

  onInterval(interval: number) {
    return onInterval(this.t, this.wast, interval)
  }

  ofInterval(interval: number) {
    return ofInterval(this.t, interval)
  }


  update(dt: number) {
    this.wast = this.t
    this.t += dt
  }
}

