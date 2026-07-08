import styles from './ComponentsGrid.module.css'
import type { ComponentViewerProps } from '../ComponentViewer'

type CatalogDoc = { id: string } & Omit<ComponentViewerProps, 'id'>

interface ComponentsGridProps {
  catalog: CatalogDoc[]
  onSelect: (id: string) => void
}

const CAT_CLASS: Record<string, string> = {
  Atomic:  'catAtomic',
  Layout:  'catLayout',
  Pattern: 'catPattern',
}

export function ComponentsGrid({ catalog, onSelect }: ComponentsGridProps) {
  return (
    <div className={styles.grid}>
      {catalog.map(doc => (
        <button key={doc.id} onClick={() => onSelect(doc.id)} className={styles.card}>

          {/* ── Preview area ─────────────────────────────── */}
          <div className={styles.previewWrap}>
            <div className={styles.previewScale}>
              {doc.overviewBlocks[0]?.content}
            </div>
            <div className={styles.previewFade} aria-hidden />
          </div>

          {/* ── Info area ────────────────────────────────── */}
          <div className={styles.info}>
            <span className={`${styles.cat} ${styles[CAT_CLASS[doc.category]]}`}>
              {doc.category}
            </span>
            <h3 className={styles.name}>{doc.name}</h3>
            <p className={styles.desc}>{doc.description}</p>
          </div>

        </button>
      ))}
    </div>
  )
}
