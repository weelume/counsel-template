'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export const ease = [0.22, 1, 0.36, 1] as const
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay, ease }}>{children}</motion.div>
}

/** 标题按字或词错峰，保留完整的辅助技术名称，避免读屏逐字朗读。 */
export function TextReveal({ text, className, characters = false }: { text: string; className?: string; characters?: boolean }) {
  const reduced = useReducedMotion()
  const pieces = characters ? Array.from(text) : text.split(' ')
  const parent: Variants = { hidden: {}, visible: { transition: { staggerChildren: characters ? 0.025 : 0.055 } } }
  return <motion.span className={className} aria-label={text} initial={reduced ? false : 'hidden'} whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={parent}>
    <span aria-hidden="true">{pieces.map((piece, index) => <motion.span className="counsel-word" key={index} variants={{ hidden: { opacity: 0, y: '65%' }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>{piece === ' ' ? '\u00a0' : piece}{!characters && index !== pieces.length - 1 ? '\u00a0' : ''}</motion.span>)}</span>
  </motion.span>
}
