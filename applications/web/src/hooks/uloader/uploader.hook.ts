'use clint'

import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { createObjectURL, revokeObjectURL } from '@/utils/helper/url.helper'
import type { IImage } from '@/@types/interfaces/image'

const useUploaderHook = () => {
  const [images, setImages] = useState<IImage[]>([])
  const {
    acceptedFiles,
    getRootProps, getInputProps,
    isDragAccept, isDragActive, isDragReject,
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    maxFiles: 10,
    minSize: 1,
    maxSize: 1024 * 1024 * 20,
    multiple: true,
  })

  useEffect(() => {
    setImages(
      acceptedFiles.map(file => ({
        src: createObjectURL(file),
        uid: '1234',
        alt: file.name,
        width: 0,
        height: 0,
        file,
        onLoad,
        uploaded: false,
      })),
    )

  }, [acceptedFiles])

  const onDelete = (selectedFile: File) => {

  }

  const onUpload = (selectedFile: IImage): void => {

  }

  const onLoad = (preview: string) => {
    revokeObjectURL(preview)
  }

  return {
    getRootProps, getInputProps, onDelete, onLoad,
    images,
    isDragAccept, isDragActive, isDragReject,
  }
}

type OnDelete = (selectedFile: File) => void
type OnUpload = (selectedFile: File) => void
type OnLoad = (preview: string) => void

export {
  useUploaderHook,
  type OnDelete,
  type OnLoad,
  type OnUpload,
}
