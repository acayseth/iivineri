import { type ClassValue, default as moduleClsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function clsx<T extends string | undefined>(...inputs: ClassValue[]): T {
  const classes = inputs
    .filter(v => v !== '')
    .filter(v => v !== ' ')
    .filter(v => typeof v !== 'undefined')

  if (!classes.length) {
    return undefined as T
  }

  return moduleClsx(...classes) as T
}

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx<string>(inputs))
}

export {
  cn,
}
