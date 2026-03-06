'use client'

import type Lenis from 'lenis'
import { createContext, PropsWithChildren, useContext } from 'react'
import { useLenis as useReactLenis } from 'lenis/react'

const LenisInstanceContext = createContext<Lenis | undefined>(undefined)

export function LenisProvider({ children }: PropsWithChildren) {
  const lenis = useReactLenis()

  return (
    <LenisInstanceContext.Provider value={lenis}>
      {children}
    </LenisInstanceContext.Provider>
  )
}

export function useLenis() {
  return useContext(LenisInstanceContext)
}
