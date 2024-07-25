export default function thumborLoader(props) {
  const { src, width, height, quality } = props
  const params = [`${width}x0`, `filters:quality(${quality || 75})`]

  return `https://images.iivineri.org${params.join('/')}${src}`
}