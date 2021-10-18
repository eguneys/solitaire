
import { Context } from './types'
import PlayV from './play'
import Camera from './camera'
import Anim from './anim'
import { Vec2, Rectangle } from './matrix'
import Input from './input'
import Body from './physics'
import { ticks } from './shared'
import { PlayerObject } from './objects'
import Sensor from './sensor'
import Idle from './idle'

let dur = ticks.sixth

export default class RunAlign extends PlayerObject {


  astep: Anim = this.anim([16, 16, 0, 48],
    0, 0, 
    [dur, dur, dur, dur, dur, dur])

  x: number = 0
  y: number = 0

  constructor(ctx: Context,
    play: PlayV,
    facing: number) { 
    super(ctx, play, facing) }

  init(x: number, y: number) {
    this.x = x
    this.y = y

    this.camera.follow(this.ctarget)
  }

  update(dt: number) {

    super.update(dt)

    let { input } = this

    this.astep.update(dt)

    let ix = 0
    if (input.btn('left') !== 0) {
      ix = -1
    } else if (input.btn('right') !== 0){
      ix = 1
    }
  }

  draw() {
    this.astep.draw(this.x, this.y, this.facing === -1)
    super.draw()
 }

}
