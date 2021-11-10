export default class Text {

  readonly $wrap: HTMLElement
  readonly $el: HTMLElement
  bounds!: ClientRect 
  wx: number = 0
  wy: number = 0

  constructor(readonly $app: HTMLElement) {
    this.$wrap = document.createElement('div')
    this.$wrap.classList.add('sh-wrap')
    $app.appendChild(this.$wrap)


    this.$el = document.createElement('div')
    this.$el.classList.add('text')
    this.$wrap.appendChild(this.$el)


    this.updateBounds()
    new ResizeObserver(this.onResize).observe(this.$wrap)
  }


  onResize = () => {
    this.updateBounds()
  }

  updateBounds = () => {
    this.bounds = this.$wrap.getBoundingClientRect()

    this.update()
  }

  print(msg: string, wx: number, wy: number) {
    this.$el.textContent = msg
    this.wx = wx
    this.wy = wy
    this.update()
  }

  update() {
    let x = (this.wx / 320) * this.bounds.width,
      y = (this.wy / 160) * this.bounds.height

    this.$el.style.transform = `translate(${x}px, ${y}px)`;
  }

}

