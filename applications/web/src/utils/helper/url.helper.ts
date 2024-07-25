const createObjectURL = (file: File) => URL.createObjectURL(file)
const revokeObjectURL = (preview: string) => URL.revokeObjectURL(preview as string)

export {
  createObjectURL,
  revokeObjectURL,
}

