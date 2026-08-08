import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Panel.module.css'

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padded?: boolean
  raised?: boolean
}

export function Panel({ children, padded = true, raised = false, className = '', ...rest }: PanelProps) {
  const classes = [styles.panel, padded ? styles.padded : '', raised ? styles.raised : '', className]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
