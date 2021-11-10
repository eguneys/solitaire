import { Play, Quad } from 'iksir'
import Quads from './quads'
import Input from './input'
import _Text from './text'

export type Images = Array<HTMLImageElement>

export type Context = {
  input: Input,
  g: Play,
  a: Images,
  qs: Quads,
  text: _Text
}

export interface IDrawer {
  translate(x: number, y: number): void;
  rect(quad: Quad, x: number, y: number,
    w: number, h: number): void;
  draw(quad: Quad, x: number, y: number,
    r: number, sx: number, sy: number): void;
}

export type Maybe<A> = A | undefined
