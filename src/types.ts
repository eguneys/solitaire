import { Play } from 'iksir'
import Quads from './quads'

export type Images = Array<HTMLImageElement>

export type Context = {
  g: Play,
  a: Images,
  qs: Quads
}

export type Maybe<A> = A | undefined
