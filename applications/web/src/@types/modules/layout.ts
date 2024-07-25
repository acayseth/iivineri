import { type ReactNode } from 'react'

export module MLayoyt {
  export interface IProps {
    children: ReactNode
    params: Param
  }

  interface Param {
    locale: string
  }
}
