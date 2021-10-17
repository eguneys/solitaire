import { Play, Quad } from 'iksir'
import Quads from './quads'
import Maps from './maps'
import Input from './input'

export type Images = Array<HTMLImageElement>

export type Context = {
  input: Input,
  g: Play,
  a: Images,
  qs: Quads,
  ms: Maps
}

export interface IDrawer {
  rect(quad: Quad, x: number, y: number,
    w: number, h: number): void;
  draw(quad: Quad, x: number, y: number,
    r: number, sx: number, sy: number): void;
}

export type Maybe<A> = A | undefined
