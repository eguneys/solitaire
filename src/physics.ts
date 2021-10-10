import { Quad } from 'iksir'
import { IDrawer } from './types'

import { Vec2, Rectangle } from './matrix'

export type FCollide = (body: Physics) => boolean

export default class Physics {

  x: number
  y: number
  ox: number
  oy: number
  w: number
  h: number

  _cbox: Rectangle = [0, 0, 0, 0];

  get cbox(): Rectangle {

    this._cbox[0] = this.x + this.ox
    this._cbox[1] = this.y + this.oy
    this._cbox[2] = this.w
    this._cbox[3] = this.h

    return this._cbox
  }

  dx: number = 0
  dy: number = 0
  remx: number = 0
  remy: number = 0

  damping: number = 1

  constructor(
    x: number,
    y: number,
    ox: number,
    oy: number,
    w: number,
    h: number,
  readonly fcollide: FCollide) {
    this.x = x
    this.y = y
    this.ox = ox
    this.oy = oy
    this.w = w
    this.h = h
  }



  move(dt: number) {


    this.remx += this.dx * dt * this.damping
    let amount: number = Math.floor(this.remx)
    this._movex(amount)
    this.remx -= amount

    this.remy += this.dy * dt * this.damping
    amount = Math.floor(this.remy)
    this._movey(amount)
    this.remy -= amount
  }


  _movex(amount: number) {
    let step = Math.sign(amount)
    for (let i = 0; i < Math.abs(amount); i++) {
      this.x += step
      if (this.fcollide(this)) {
        this.x -= step
        this.dx = 0
        return
      }
    }
  }

  _movey(amount: number) {
    let step = Math.sign(amount)
    for (let i = 0; i < Math.abs(amount); i++) {
      this.y += step
      if (this.fcollide(this)) {
        this.y -= step
        this.dy = 0
        return
      }
    }
  }

  draw(g: IDrawer, abox: Quad) {
    g.draw(abox, this.cbox[0],
      this.cbox[1],
      0,
      this.cbox[2],
      this.cbox[3])
  }
}

