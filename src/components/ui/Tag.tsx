import type { ReactNode } from 'react'
import styles from './Tag.module.css'

export type TagTone = 'neutral' | 'blue' | 'green' | 'amber' | 'terracotta'

interface TagProps {
  children: ReactNode
  tone?: TagTone
  size?: 'sm' | 'md'
}

export function Tag({ children, tone = 'neutral', size = 'md' }: TagProps) {
  return (
    <span className={`${styles.tag} ${styles[tone]} ${styles[size]}`}>
      {children}
    </span>
  )
}
