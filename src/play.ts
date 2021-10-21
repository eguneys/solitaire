import { Context } from './types'
import Quads from './quads'
import { Play } from 'iksir'
import Anim from './anim' 
import { ticks, dur } from './shared'
import { Scene, GameObject, GameObjectWithScene } from './objects'
import { onInterval } from './util'


export default class PlayV extends GameObjectWithScene {


  gen: ShapeGenerator = new ShapeGenerator(this.scene, this.ctx)

  matrix: MatrixV = new MatrixV(this.scene, this.ctx)
  shape: ShapeOnMatrix = this.gen.next

  constructor(ctx: Context) {
    super(new Scene(), ctx)
  } 

  init() {
    this.shape.init(new Pos(0, -1))
  }


  miy?: Pos;
  tiy: number = -1;
  wastiy: number = -1;
  readonly tiyshort: number = ticks.half;
  readonly tiylong: number = ticks.third;

  get tiydur(): number { return this.tiy < this.tiyshort ? this.tiyshort : this.tiylong }



  tlock: number = 0 
  wastlock: number = 0 

  trot: number = 0
  wastrot: number = 0

  update = (dt: number) => {
    this.matrix.update(dt)
    this.shape.update(dt)


    this.wastiy = this.tiy

    if (this.input.btn('down') > 0) {
      this.miy = new Pos(0, 1)
    } else if (this.input.btn('up') > 0) {
      this.miy = new Pos(0, -1)
    } else if (this.input.btn('left') > 0) {
      this.miy = new Pos(-1, 0)
    } else if (this.input.btn('right') > 0) {
      this.miy = new Pos(1, 0)
    } else {
      this.miy = undefined
    }

    if (!!this.miy) {
      if (this.tiy === -1) {
        this.tiy = dt
      } else {
        this.tiy += dt
      } 

      if (onInterval(this.tiy, this.wastiy, this.tiydur)) {
        this.shape.pos = this.shape.pos.add(this.miy)
      }

    } else {
      this.wastiy = -1
      this.tiy = -1 
    }

    if (this.input.btn('x') > 0) {
      if (this.tlock === this.wastlock) {
        this.tlock++ 

        this.matrix.lock(this.shape) 
        this.shape = this.gen.next
        this.shape.init(new Pos(0, -1))

        this.matrix.match()
      }
    } else {
      this.wastlock = this.tlock
    }


    if (this.input.btn('c') > 0) {
      if (this.trot === this.wastrot) {
        this.trot++ 

        this.shape.rotate()
      }
    } else {
      this.wastrot = this.trot
    }
  }

  draw = () => {
    let { g, qs } = this

    g.draw(qs.qbg, 0, 0, 0, 180, 320)
    
    this.matrix.draw(8, 60)
    this.shape.draw(8, 60)
  }
}



export class Pos {

  static zero: Pos = new Pos(0, 0)

  get down(): Pos { return new Pos(this.x, this.y + 1) }

  get arr(): [number, number] { return [this.x, this.y] }

  constructor(readonly x: number,
    readonly y: number) {}

  withY(y: number): Pos { return new Pos(this.x, y) }


  scale(k: number) {
    return new Pos(this.x * k, this.y * k)
  }

  add(pos: Pos) {
    return this.addXY(pos.x, pos.y)
  }


  addXY(x: number, y: number) {
    return new Pos(this.x + x, this.y + y)
  }
}

export abstract class ShapeOnMatrix extends GameObjectWithScene {


  abstract data: Array<number>;
  abstract afgs: Array<Anim>;
  abstract rotations: Array<Array<Pos>>;
  irot: number = 0
  get model(): Array<Pos> {
    return this.rotations[this.irot]
  }
  asel: Anim = this.anim([16, 16, 0, 16], 6, 0, [dur])

  pos!: Pos
  tdown: Pos = new Pos(0, 0)

  rotate() {
    this.irot = (this.irot + 1) % this.rotations.length
  }

  init(pos: Pos) {
    this.pos = pos
  }

  update(dt: number) {

    super.update(dt)

    this.afgs.forEach(_ => _.update(dt))
  }


  draw(x: number, y: number) {
    this.afgs.forEach((_, i) => {
      let res = this.pos.scale(18)
      .add(this.model[i].scale(18))
     // .add(this.tdown.scale(18))
      .addXY(x, y)

      _.draw(...res.arr)
      this.asel.draw(...res.arr)
    })
  }


}


export class III extends ShapeOnMatrix {



  data: [number, number, number] = [1, 1, 1]

  afgs: [Anim, Anim, Anim] = [
    this.anim([16, 16, 0, 16], 1, 0, [dur]),
    this.anim([16, 16, 0, 16], 1, 0, [dur]),
    this.anim([16, 16, 0, 16], 1, 0, [dur])
  ]

  rotations: Array<[Pos, Pos, Pos]> = [[
    new Pos(0, 0),
    new Pos(1, 0),
    new Pos(2, 0)
  ], [
    new Pos(0, 0),
    new Pos(0, 1),
    new Pos(0, 2) ] 
  ]

}

export class II extends ShapeOnMatrix {

  data: [number, number] = [1, 1]
  
  afgs: [Anim, Anim] = [
    this.anim([16, 16, 0, 16], 2, 0, [dur]),
    this.anim([16, 16, 0, 16], 2, 0, [dur])
  ]

  rotations: Array<[Pos, Pos]> = [[
    new Pos(0, 0),
    new Pos(1, 0)
  ],[
    new Pos(0, 0),
    new Pos(0, 1)
  ] ]
}


export class E extends ShapeOnMatrix {


  data: [number] = [3]

  afgs: [Anim] = [
    this.anim([16, 16, 0, 16], 3, 0, [dur])
  ]

  rotations: Array<[Pos]> = [[
    new Pos(0, 0),
  ]]
}


export class O extends ShapeOnMatrix {


  data: [number] = [0]

  afgs: [Anim] = [
    this.anim([16, 16, 0, 16], 5, 0, [dur])
  ]

  rotations: Array<[Pos]> = [[
    new Pos(0, 0),
  ]]
}



export class ShapeGenerator extends GameObjectWithScene {


  get next(): ShapeOnMatrix {
    return this.gens[Math.floor(Math.random() * this.gens.length)]()
  }

  gens: Array<() => ShapeOnMatrix> = [
    () => new II(this.scene, this.ctx),
    () => new III(this.scene, this.ctx),
    () => new E(this.scene, this.ctx),
    () => new O(this.scene, this.ctx),
    () => new O(this.scene, this.ctx),
    () => new O(this.scene, this.ctx),
  ]


}



export class MatrixData<V> {

  data: Array<V | undefined> = []

  constructor(readonly rows: number = 7,
    readonly cols: number = 7) { }


  get(x: number, y: number): V | undefined {
    if (x < 0 || x >= this.rows ||
    y < 0 || y >= this.cols) {
      return undefined 
    }
    return this.data[x * this.cols + y]
  }


  set(x: number, y: number, val: V | undefined): void {
    if (x < 0 || x >= this.rows ||
    y < 0 || y >= this.cols) {
      return
    }
    this.data[x * this.cols + y] = val
  }
}

export class MatrixV extends GameObjectWithScene {
  
  abg: Anim = this.anim([16, 16, 0, 16], 0, 0, [dur])

  anims: MatrixData<Anim> = new MatrixData<Anim>()

  data: MatrixData<number> = new MatrixData<number>()

  lock(son: ShapeOnMatrix) {
    son.model.forEach((pos, i) => {
      let _pos = pos.add(son.pos).arr
      this.anims.set(..._pos, son.afgs[i])
      this.data.set(..._pos, son.data[i])
    })
  }



  matches: Array<Array<number>> = [
    [5,1,1,3,0],
    [3,1,1,1,0],
  ]

  match(): void {
    
    this.matches.forEach(match => {
      let [res, ...pattern] = match

      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          let bhor = false,
            bvert = false
          for (let k = 0; k < pattern.length; k++) {
             if (this.data.get(i, j + k) !== pattern[k]) {
               bvert = true
             }
            if (this.data.get(i + k, j) !== pattern[k]) {
              bhor = true
            }
          }

          if (!bvert) {
            for (let k = 0; k < pattern.length; k++) {
              if (pattern[k] === 0) {
                this.data.set(i, j + k, res)
              } else {
                this.data.set(i, j+k, undefined)
              }
            }
          }
        }
      }

    })
  }

  update = (dt: number) => {
  }


  draw = (x: number, y: number) => {

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        
        let pos = new Pos(x, y)
          .add(new Pos(i, j).scale(18))

        this.abg.draw(...pos.arr)

        let anim = this.anims.get(i, j)

        if (anim) {
          anim.draw(...pos.arr)
        }

      }
    }
  }
}
