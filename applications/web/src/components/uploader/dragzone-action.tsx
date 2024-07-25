'use client'

import React, { FC } from 'react'
import { ImUpload } from 'react-icons/im'
import { cn } from '@/libs/cn/cn.lib'

interface IProps {
  isDragAccept: boolean
  isDragActive: boolean
  isDragReject: boolean
  count: number
  maxFiles: number
}

const DragZoneAction: FC<Readonly<IProps>> = ({
                                                isDragAccept,
                                                isDragActive,
                                                isDragReject,
                                                count,
                                                maxFiles,
                                              }) => {
  return (
    <ul className="text-center">
      <li className="flex justify-center items-center py-2">
        <ImUpload className="w-8 h-8 text-success" />
      </li>
      {(isDragActive && isDragReject) && (
        <li className="pb-2 text-warning">
          <em>Some files will be rejected</em>
        </li>
      )}
      {(isDragActive && isDragAccept && !isDragReject) && (
        <li className="pb-2 text-success">
          <em>Drop the files here ...</em>
        </li>
      )}
      {!isDragActive && (
        <li className="pb-2">
          <em>Drag`n drop some files here, or click to select files</em>
        </li>
      )}
      <li className={cn(
        'pb-2',
        { 'text-success': maxFiles - count > 0 },
        { 'text-danger': maxFiles - count <= 0 },
      )}>
        <em>({maxFiles - count} files are the maximum number of files you can drop here)</em>
      </li>
    </ul>
  )
}

export {
  DragZoneAction,
}