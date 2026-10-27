'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { HostConfig } from './types'

const HostContext = createContext<HostConfig>({})
export function CounselHostProvider({ children, ...config }: HostConfig & { children: ReactNode }) {
  return <HostContext.Provider value={config}>{children}</HostContext.Provider>
}
export const useCounselHost = () => useContext(HostContext)
