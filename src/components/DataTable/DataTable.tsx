import { useState } from 'react'
import type { ReactNode } from 'react'
import { Skeleton } from '../Skeleton'
import { EmptyState } from '../EmptyState'
import styles from './DataTable.module.css'

export type DataRow = Record<string, unknown>

export interface DataColumn {
  key: string
  header: string
  align?: 'left' | 'right' | 'center'
  width?: string
  render?: (row: DataRow) => ReactNode
}

export interface DataTableProps {
  columns: DataColumn[]
  rows: DataRow[]
  sortable?: boolean
  onRowClick?: (row: DataRow) => void
  loading?: boolean
  emptyTitle?: string
  emptyDescription?: string
  className?: string
}

type SortState = { key: string; dir: 'asc' | 'desc' } | null

/**
 * DataTable — light data table with real <table> semantics, optional sorting
 * (aria-sort), row hover/click, loading skeletons, and a built-in empty state.
 * Collapses to stacked cards on mobile.
 */
export function DataTable({
  columns,
  rows,
  sortable,
  onRowClick,
  loading,
  emptyTitle = 'Nothing here yet',
  emptyDescription,
  className,
}: DataTableProps) {
  const [sort, setSort] = useState<SortState>(null)

  const sorted = (() => {
    if (!sort) return rows
    const { key, dir } = sort
    return [...rows].sort((a, b) => {
      const av = a[key]
      const bv = b[key]
      if (typeof av === 'number' && typeof bv === 'number') return dir === 'asc' ? av - bv : bv - av
      const as = String(av ?? '')
      const bs = String(bv ?? '')
      return dir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
    })
  })()

  const toggleSort = (key: string) => {
    setSort((s) => (s?.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))
  }

  if (loading) {
    return (
      <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
        <Skeleton variant="rect" width="100%" height={44} />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rect" width="100%" height={40} />
        ))}
      </div>
    )
  }

  if (rows.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} className={className} />
  }

  return (
    <div className={[styles.wrap, className].filter(Boolean).join(' ')}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sort?.key === col.key
              const ariaSort = isSorted ? (sort!.dir === 'asc' ? 'ascending' : 'descending') : undefined
              return (
                <th
                  key={col.key}
                  scope="col"
                  style={{ width: col.width, textAlign: col.align }}
                  aria-sort={ariaSort}
                  className={styles.th}
                >
                  {sortable ? (
                    <button type="button" className={styles.sortBtn} onClick={() => toggleSort(col.key)}>
                      {col.header}
                      <span className={styles.sortIcon} aria-hidden="true">
                        {isSorted ? (sort!.dir === 'asc' ? '↑' : '↓') : '↕'}
                      </span>
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={i}
              className={onRowClick ? styles.rowClickable : ''}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={onRowClick ? (e) => { if (e.key === 'Enter') onRowClick(row) } : undefined}
            >
              {columns.map((col) => (
                <td key={col.key} style={{ textAlign: col.align }} className={styles.td} data-label={col.header}>
                  {col.render ? col.render(row) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
