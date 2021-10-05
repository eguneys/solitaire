
function image(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    let res = new Image()
    res.onload = () => resolve(res)
    res.onerror = e => reject(e)
    res.src = src
    return res
  })
}

export default function Assets(srcs: Array<string>) {
  return Promise
    .all(srcs.map(_ => image(_)))
}
