import { ticks } from './shared'


export default class Input {



  _btn: Map<string, number> = new Map()

  constructor() {

    document.addEventListener('keydown', e => {
      switch(e.key) {
        case 'ArrowUp':
          this._press('up');
          break;
        case 'ArrowDown':
          this._press('down');
          break;
        case 'ArrowLeft':
          this._press('left');
          break;
        case 'ArrowRight':
          this._press('right');
          break;
        case 'x':
          this._press('x');
          break;
        case 'c':
          this._press('c');
          break;
      }
    });

    document.addEventListener('keyup', e => {
      switch(e.key) {
        case 'ArrowUp':
          this._release('up');
          break;
        case 'ArrowDown':
          this._release('down');
          break;
        case 'ArrowLeft':
          this._release('left');
          break;
        case 'ArrowRight':
          this._release('right');
          break;
        case 'c':
          this._release('c');
          break;
        case 'x':
          this._release('x');
          break;      
      }
    });

  }


  _press(key: string) {
    if (!this._btn.has(key) || this._btn.get(key) === 0) {
      this._btn.set(key, ticks.one)
    }
  }

  _release(key: string) {
    this._btn.set(key, -ticks.sixth)
  }

  btn = (key: string) => {
    return this._btn.get(key)  || 0
  }

  update = (dt: number) => {
    for (let [key, t] of this._btn) {
      let sign: number = Math.sign(t);
      if (t !== 0) {
        t += dt;
        if (Math.sign(t) !== sign) {
          t = 0;
        }
      }
      this._btn.set(key, t);
    }
  }

}
