import type { ReactNode } from 'react'
import '../features/counsel/theme.css'
import './globals.css'

export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="zh"><body>{children}</body></html>
}
