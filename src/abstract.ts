import { Maybe } from './types'

export type Color = 'r' | 'g' | 'b'


export class Pos {

  static make = (x: number, y: number) =>
    new Pos(x, y)

  static fromKey = (key: string) => {
    let [x, y] = key.split(';')
      .map(_ => parseInt(_))

    return new Pos(x, y)
  }

  constructor(readonly x: number,
    readonly y: number) {}

  get left(): Pos {
    return new Pos(this.x - 1, this.y)
  }

  get down(): Pos {
    return new Pos(this.x, this.y + 1)
  }

  get key(): string {
    return this.x + ';' + this.y
  }

  add(pos: Pos): Pos {
    return new Pos(this.x + pos.x,
      this.y + pos.y)
  }
}

export class PosMap<Value> {

  
  static empty = new PosMap(new Map())

  static fromArray = <Value>(data: Array<[Pos, Value]>): PosMap<Value> =>
  new PosMap(new Map(data.map(([_, v]) => [_.key, v])))

  constructor(readonly data: Map<string, Value>) { }

  get entries(): Array<[Pos, Value]> {
    let res: Array<[Pos, Value]> = []
    for (let [key, value] of this.data.entries()) {
      res.push([Pos.fromKey(key), value])
    }
    return res
  }

  get copy(): PosMap<Value> {
    return new PosMap(new Map(this.data))
  }

  get(pos: Pos): Maybe<Value> {
    return this.data.get(pos.key)
  }

  set(pos: Pos, value: Value): PosMap<Value> {
    let res = new Map(this.data)

    res.set(pos.key, value)
    return new PosMap(res)
  }

}

export class Tile {

  static Red = new Tile('r')
  static Green = new Tile('g')
  static Blue = new Tile('b')

  static all = [Tile.Red, Tile.Green, Tile.Blue]

  static random = () => Tile.all[Math.floor(Math.random() * Tile.all.length)]

  constructor(readonly color: Color) {}
}

export class Shape {


  static readShape = (lines: string): Shape => {
    lines = lines.replace(/^\n(.*)\n$/, '$1')
    return lines.split('=').map(_lines => {
      let res = []
      let lines = _lines.split('\n')
      for (let y = 0; y< lines.length; y++) {
        let line = lines[y]
        for (let x = 0; x < line.length; x++) {
          if (line[x] === '.') {
            res.push(Pos.make(x, y))
          }
        }
      }
      return res
    })
  }

  static sL = `
.
.
..
=
  .
...
=
..
 .
 .
=
...
.
`

  static allS = [Shape.sL]
  static all: Array<Shape> = Shape.allS.map(_ => Shape.readShape(_))

  static random = () => Shape.all[Math.floor(Math.random() * Shape.all.length)]


  constructor(rotations: Array<Array<Pos>>) {}
}

console.log(Shape.all)

export class Grid {


  static empty = new Grid(PosMap.empty)
  static origin = Pos.make(0, 0)

  constructor(readonly model: PosMap<Tile>) {}


  get copy(): Grid {
    return new Grid(this.model.copy)
  }

  get(pos: Pos): Maybe<Tile> {
    return this.model.get(pos)
  }

  set(pos: Pos, tile: Tile): Maybe<Grid> {
    if (!this.get(pos)) {
      return new Grid(this.model.set(pos, tile))
    }
  }

  merge(song: ShapeOnGrid): Maybe<Grid> {
    let { grid, origin } = song,
    g2 = grid.copy 

    for (let [pos, tile] of grid.model.entries) {
      let p2 = pos.add(origin)
      let g2_ = g2.set(p2, tile)
      if (g2_) {
        g2 = g2_
      }
    }
    return g2
  }
}

export class ShapeOnGrid {

  static make = (grid: Grid) => new ShapeOnGrid(grid, Shape.random(), Grid.origin)

  static empty = ShapeOnGrid.make(Grid.empty)

  constructor(readonly grid: Grid,
    readonly shape: Shape,
    readonly origin: Pos) {}


  get down(): ShapeOnGrid {
    let { grid, shape, origin } = this

    return new ShapeOnGrid(
      grid,
      shape,
      origin.down
    ) 
  }

}
