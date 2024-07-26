'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const useThemeSwitcherHook = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
    }
  }, [mounted])

  const toggleTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  }

  return {
    mounted,
    theme,
    toggleTheme,
  }
}

export { useThemeSwitcherHook }
