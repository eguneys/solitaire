
const colors = [
  '#ffa300',
  '#fff1e8'
]

const rgbtostring = (color: Array<number>) => {
  const atohex = (a: number) => (a.toString(16).length === 1 ? '0':'')+a.toString(16);
      return `#` + color.slice(0,3).map(_ => atohex(_)).join('').toLowerCase();
    };

export default class Maps {


  res: Array<Array<[number, number]>> = colors.map(_ => [])

  constructor(image: HTMLImageElement) {
    let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d')!

    canvas.width = image.width
    canvas.height = image.height

    ctx.drawImage(image, 0, 0, image.width, image.height)


    let { data } = ctx.getImageData(0, 0, image.width, image.height)

    for (let y = 0; y < image.height; y+=4) {
      for (let x = 0; x < image.width; x+=4) {
        let idx = (image.width * y + x) << 2;

        let color = [data[idx],
          data[idx+1],
          data[idx+2],
          data[idx+3]];

        let idx_color = colors.indexOf(rgbtostring(color));
        if (idx_color !== -1) {
          this.res[idx_color].push([x/4, y/4]);
        }
      }
    }
  }
}
