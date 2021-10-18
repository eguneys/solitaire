import { Context } from './types'
import Quads from './quads'
import { Play } from 'iksir'
import Anim from './anim' 
import { ticks, dur } from './shared'
import Grid from './grid'
import Maps from './maps' 
import { tiles } from './tiles'
import Camera from './camera'

import { GameObject } from './objects'
import { PlayerSpawn } from './spawn'
import Body from './physics'
import { oninterval } from './util'

let i = 0

export default class PlayV extends GameObject {

  grid: Grid<boolean>;

  camera: Camera = new Camera(this.g)

  atile: Anim = this.anim([4, 4], 7, 0, [dur]);

  objects: Array<GameObject> = []

  constructor(ctx: Context) {
    super(ctx)
    this.grid = new Grid<boolean>(4, 4, 360, 180)

    for (let i = 0; i < this.ms.res.length; i++) {
      let resi = this.ms.res[i]
      for (let j = 0; j < resi.length; j++) {
        let [x, y] = resi[j]
        let tile = tiles[i]

        if (tile) {
          tile(this, x * 4, y * 4, j) 
        } else {
          console.warn(`notile ${i}`)
        }
      }
    }
  }

  init(x: number, y: number) {

  }

  fcollide = (body: Body): boolean => {
    return !!this.issolid(...body.cbox)
  }

  check(x: number,
    y: number,
    ox: number = 0,
    oy: number = 0) {
    return this.issolid(x, y, 1, 1, ox, oy)
  }

  issolid(x: number,
    y: number,
    w: number, 
    h: number,
    ox: number = 0, 
    oy: number = 0) {
    return this.grid.collide(x, y,
      w, h,
      ox, oy)
  }

  solid(x: number, y: number, i: number) {
    this.grid.set(x, y, true)
  }

  spawn(x: number, y: number, i: number) {
    this.add(new PlayerSpawn(this.ctx, this), x, y)
  }

  add(obj: GameObject, x: number, y: number) {
    obj.init(x, y)
    this.objects.push(obj)
  }

  remove(obj: GameObject) {
    this.objects.splice(this.objects.indexOf(obj), 1)
  }

  update = (dt: number) => {
    for (let obj of this.objects) {
      obj.update(dt)
    }
    this.camera.update(dt)
  }

  draw = () => {
    let { g, qs } = this

    g.draw(qs.qbg, 0, 0, 0, 320, 180)
    this.grid.draw(this.atile)
    for (let obj of this.objects) {
      obj.draw()
    }

    //this.camera.debugdraw(this.qs.qyellow)
  }
}
