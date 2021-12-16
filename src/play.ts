import { Context } from './types'
import { ticks, dur } from './shared'
import { GameObject } from './objects'
import Anim from './anim'

export default class Play extends GameObject {


  qrubber: Anim = this.anim([32, 32, 0, 480],
    0, 0, [1])

  qsky: Anim = this.anim([640, 180],
    0, 0, [1])

  qland: Anim = this.anim([640, 180],
    0, 1, [1])



  qsun: Anim = this.anim([96, 32, 0, 368],
    0, 0, [1])


  qvegetation: Array<Anim> = [
    this.anim([48, 32, 0, 416],
      0, 0, [1]),
    this.anim([16, 32, 48, 416],
      0, 0, [1]),
    this.anim([32, 32, 64, 416],
      0, 0, [1]),
    this.anim([32, 32, 64, 416],
      1, 0, [1]),
    this.anim([16, 32, 128, 416],
      0, 0, [1]),
    this.anim([32, 32, 144, 416],
      0, 0, [1])
  ]

  vegetation: Array<[number, number, number]> = []

  camx: number = 0
  camy: number = 0
  x: number = 120
  y: number = 100


  init(x: number, y: number) {


    this.vegetation = []

    for (let i = 0; i < 32; i++) {
      if (Math.random() < Math.random() * 0.3) continue
      for (let j = 0; j < 2; j++) {
        if (Math.random() < 0.5) continue

        this.vegetation.push([Math.floor(Math.random() * this.qvegetation.length), i * 32 - Math.random() * 10, 100 + j * 40 - Math.random() * 20])
      }
    }


  }


  update(dt: number) {

    let ix = 0
    if (this.input.btn('right') > 0) {
      ix = 1
    }

    if (ix === 1) {
      this.x ++
    }



    this.camx = this.x - 160

  }


  draw() {
    this.g.translate(this.camx, this.camy)
    this.qsky.draw(0, 0)


    this.g.translate(this.camx * 0.1, this.camy * 0.1)
    this.qsun.draw(80, 0)

    this.g.translate(this.camx, this.camy)
    this.qland.draw(0, 0)


    this.vegetation.forEach(([i, x, y]) => {
      let qv = this.qvegetation[i]
      qv.draw(x, y)
    })

    this.qrubber.draw(this.x, this.y)
  }
}

