'use client'

import React, { type FC, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface IProps {
  children: ReactNode;
}

const ReactQueryProvider: FC<Readonly<IProps>> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
      )}
    </QueryClientProvider>
  )
}

export {
  ReactQueryProvider,
}