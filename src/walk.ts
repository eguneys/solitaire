import { Context } from './types'
import PlayV from './play'
import Camera from './camera'
import Anim from './anim'
import { Vec2, Rectangle } from './matrix'
import Input from './input'
import Body from './physics'
import { ticks, dur } from './shared'
import { PlayerObject } from './objects'
import Sensor from './sensor'
import Idle from './idle'
import Run from './run'

export default class Walk extends PlayerObject {


  astep: Anim = this.anim([16, 16, 0, 48],
    0, 0, 
    [dur, dur, dur, dur, dur].map(_ => _*0.5), 
    [0,2,4,5,5].map(_ => _ * this.facing))


  x: number = 0
  y: number = 0

  oldox: number = 0

  constructor(ctx: Context,
    play: PlayV,
    facing: number) { 
    super(ctx, play, facing) }


  init(x: number, y: number) {
    this.x = x
    this.y = y
  }


  update(dt: number) {


    let { input } = this

    this.astep.update(dt)

    let ix = 0
    if (input.btn('left') !== 0) {
      ix = -1
    } else if (input.btn('right') !== 0){
      ix = 1
    }

    if (ix === 0) {
      let obj = new Idle(this.ctx, this.play, this.facing)
      this.play.add(obj, this.x + this.oldox, this.y)
      this.play.remove(this)
      return
    } else if (ix !== this.facing) {
      let obj = new Walk(this.ctx, this.play, ix)
      this.play.add(obj, this.x + this.oldox, this.y)
      this.play.remove(this)
      return
    }

    if (this.astep.ri === 1 && this.astep.frame === 2) {
      let obj = new Run(this.ctx, this.play, this.facing)
      this.play.add(obj, this.x + this.oldox, this.y)
      this.play.remove(this)
      return      
    }

    if (this.astep.ox !== 0) {
      this.oldox = this.astep.ox
    } else {
      this.x += this.oldox
      this.oldox = 0
    }

  }

  draw() {
    this.astep.draw(this.x, this.y, this.facing === -1)
  }

}
