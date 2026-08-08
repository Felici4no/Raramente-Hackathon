import { useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { EntityRef } from '@/types/entities'
import { resolveEntity } from '@/services/entityResolver'
import { useEntityDrawer } from '@/context/EntityDrawerContext'
import { EntityPreviewCard } from './EntityPreviewCard'
import styles from './EntityLink.module.css'

interface EntityLinkProps {
  entity: EntityRef
  children?: ReactNode
  className?: string
  showGlyph?: boolean
}

const supportsHover = typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches

/**
 * The one way an entity mention should ever be rendered in QuaTiRare.
 * Resolves to its canonical page (or an external page, or the Entity
 * Drawer) via entityResolver — components never build these routes
 * themselves. Reads as editorial text, not a UI button.
 */
export function EntityLink({ entity, children, className }: EntityLinkProps) {
  const destination = resolveEntity(entity)
  const { openEntity } = useEntityDrawer()
  const [previewOpen, setPreviewOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  function handleEnter() {
    if (!supportsHover) return
    timerRef.current = setTimeout(() => setPreviewOpen(true), 350)
  }
  function handleLeave() {
    clearTimeout(timerRef.current)
    setPreviewOpen(false)
  }
  function handleKeyPreview(open: boolean) {
    setPreviewOpen(open)
  }

  const label = children ?? entity.label
  const inner = (
    <>
      <span className={styles.text}>{label}</span>
      {previewOpen && (
        <span className={styles.previewAnchor}>
          <EntityPreviewCard entity={entity} active={previewOpen} />
        </span>
      )}
    </>
  )

  const sharedProps = {
    className: `${styles.link} ${className ?? ''}`,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onFocus: () => handleKeyPreview(true),
    onBlur: () => handleKeyPreview(false),
  }

  if (destination.kind === 'internal') {
    return (
      <Link to={destination.path} {...sharedProps}>
        {inner}
      </Link>
    )
  }

  if (destination.kind === 'external') {
    return (
      <a href={destination.url} target="_blank" rel="noreferrer noopener" {...sharedProps}>
        {inner}
      </a>
    )
  }

  return (
    <button type="button" {...sharedProps} onClick={() => openEntity(entity)}>
      {inner}
    </button>
  )
}
