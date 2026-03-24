/**
 * 게시판 등록일 표시용
 * @param {string|undefined|null} iso
 * @param {{ separator?: string }} [opts] — 기본 `YYYY.MM.DD`, 관리자 표 등에서 `separator: '-'` → `YYYY-MM-DD`
 */
export function formatBoardDate(iso, opts = {}) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const sep = opts.separator ?? '.'
  return `${y}${sep}${m}${sep}${day}`
}
