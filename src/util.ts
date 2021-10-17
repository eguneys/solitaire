export function oninterval(val: number, prev: number, interval: number) {
  return Math.floor(prev / interval) !== Math.floor(val / interval)
}


export function lerp(t: number, src: number, target: number) {
  return (1 - t) * src + target * t
}

export function approach(val: number, target: number, max: number) {
  return val > target ? Math.max(val - max,target) : Math.min(val + max, target)
}
