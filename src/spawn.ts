import { Context } from './types'
import { Play } from 'iksir'
import PlayV from './play'
import Player from './player'
import { GameRoomObject } from './objects'
import { ticks, dur } from './shared'
import Anim from './anim'

export class PlayerSpawn extends GameRoomObject {

 
  abegin: Anim = this.anim([80, 180, 0, 1868],
    0, 0, [dur,dur,dur,dur,dur,dur,dur,dur,dur,dur,dur,dur,dur,dur,dur,dur]);

  x: number = 0;
  y: number = 0;

  constructor(ctx: Context,
    play: PlayV) {
    super(ctx, play)
  }

  init = (x: number, y: number) => {

    this.x = x
    this.y = y
    this.camera.follow([x, y])
  }

   update(dt: number) {
    this.abegin.update(dt)


    if (this.abegin.ri !== 0) {

      let obj = new Player(this.ctx, this.play)
      this.play.add(obj, this.x, this.y)
      this.play.remove(this)
    }
   }


   draw() {
    this.abegin.draw(this.x - 24, this.y - 124)
   }
}

