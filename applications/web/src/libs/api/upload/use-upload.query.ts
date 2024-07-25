'use client'

import { useMutation } from '@tanstack/react-query'
import { axios } from '@/libs/axios/axios.lib'
import { AxiosProgressEvent } from 'axios'

type OnUploadProgressProps = (event: AxiosProgressEvent) => void

export const useUploadQuery = () => useMutation({
  mutationKey: ['upload/image'],
  mutationFn: async (file: File, onUploadProgress?: OnUploadProgressProps) => await axios.post(`upload`, file, {
    headers: {
      'content-type': 'multipart/form-data',
    },
    onUploadProgress,
  }),
})