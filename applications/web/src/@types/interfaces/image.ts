export interface IImage {
  uid: string
  src: string
  alt: string
  width: number
  height: number
  file?: File
  onLoad?: OnImageLoad
}

type OnImageLoad = (preview: string) => void

