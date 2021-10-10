import PlayV from './play'

export function solid(room: PlayV, x: number, y: number, i: number) {
  room.solid(x, y, i)
}


export function spawn(room: PlayV, x: number, y: number, i: number) {
  room.spawn(x, y, i)
}


export const tiles = [ 
  solid,
  spawn
]
