import { Play, Quad } from 'iksir'
import { lerp } from './util'
import { Vec2, Rectangle } from './matrix'

export default class Camera {


  pos: Vec2 = [0, 0]
  target: Vec2 = [0, 0]
  deadzone: Rectangle = [(320 - 60) / 2, (180 - 40) / 2, 60, 40]

  lasttarget: Vec2 = [0, 0]
  bounds?: Rectangle

  constructor(readonly g: Play) {
  }

  follow(xy: Vec2) {
    this.target = xy
    this.lasttarget = this.target
  }
  
  local(xw: number, yw: number) {
    return [xw - this.pos[0] + 160,
      yw - this.pos[1] + 90]
  }

  world(x: number, y: number) {
    return [x + this.pos[0] - 160,
      y + this.pos[1] - 90]
  }

  update(dt: number) {

    let { deadzone,
      bounds,
      target,
      pos,
      lasttarget } = this


    let dx1 = deadzone[0],
      dy1 = deadzone[1],
      dx2 = deadzone[0] + deadzone[2],
      dy2 = deadzone[1] + deadzone[3];

    let [scroll_x,
      scroll_y] = [0, 0];

    let [target_x,
      target_y] = this.local(...target),
      [x, y] = this.local(...pos);

    if (target_x < x + (dx1 + dx2 - x)) {
      let d = target_x - dx1;
      if (d < 0) {
        scroll_x = d;
      }
    }

    if (target_x > x - (dx1 + dx2 - x)) {
      let d = target_x - dx2;
      if (d > 0) {
        scroll_x = d;
      }
    }

    if (target_y < y + (dy1 + dy2 - y)) {
      let d = target_y - dy1;
      if (d < 0) {
        scroll_y = d;
      }
    }

    if (target_y > y - (dy1 + dy2 - y)) {
      let d = target_y - dy2;
      if (d > 0) {
        scroll_y = d;
      }
    }

    scroll_x += target[0] - lasttarget[0];
    scroll_y += target[1] - lasttarget[1];

    lasttarget[0] = target[0];
    lasttarget[1] = target[1];

    //pos[0] = lerp(0.5, pos[0], pos[0] + scroll_x);
    //pos[1] = lerp(0.5, pos[1], pos[1] + scroll_y);


    pos[0] = lerp(Math.pow(0.01, dt), pos[0], pos[0] + scroll_x)
    pos[1] = lerp(Math.pow(0.01, dt), pos[1], pos[1] + scroll_y)

    if (bounds) {
      pos[0] = Math.min(Math.max(pos[0], bounds[0] + 160), bounds[0] + bounds[2] - 160);
      pos[1] = Math.min(Math.max(pos[1], bounds[1] + 90), bounds[1] + bounds[3] - 90);
    }
  }


  draw(quad: Quad, xw: number, yw: number, r: number, sx: number, sy: number) {

    let [x, y] = this.local(xw, yw)
    this.g.draw(quad, x, y, r, sx, sy)
  }


  rect(quad: Quad, xw: number, yw: number,
    sx: number, sy: number) {

    [[xw, yw, 1, sy],
      [xw + sx - 1, yw, 1, sy],
      [xw, yw, sx, 1],
      [xw, yw + sy - 1, sx, 1]]
      .forEach(([x, y, w, h]) =>
        this.draw(quad, x, y, 0, w, h)
      )
  }

  debugdraw(quad: Quad) {
    let [x, y] = this.world(this.deadzone[0], this.deadzone[1])
    this.rect(quad, x, y, this.deadzone[2], this.deadzone[3])
  }
}
