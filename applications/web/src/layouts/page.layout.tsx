'use client'

import React, { type FC, type ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

const PageLayout: FC<Readonly<IProps>> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1024px] lg:px-0">
      <div className="px-4">
        {children}
      </div>
    </div>
  )
}

export { PageLayout }
