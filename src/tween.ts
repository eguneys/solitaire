import { Pos,
  ShapeOnGrid } from './abstract'
  
export class Tween {

  _elapsed: number
  i: number

  constructor() {}


  update(dt) {
    _elapsed += dt

    i = _elapsed / duration

    if (i >= 1.0) {
      _elapsed = 0
      i = 1.0
    }
  }

}

export class Tweens {


  tweens: Array<Tween>

  constructor() {}

  

}

export interface Move {
  before: ShapeOnGrid;
  after: ShapeOnGrid;
}

export class TileStill {
  
}
