


export function lerp(t: number, src: number, target: number) {
  return (1 - t) * src + target * t
}
