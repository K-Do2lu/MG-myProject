/**
 * @typedef {{ path: string, name: string }} BoardAttachmentItem
 */

function parseAttachmentsJson(val) {
  if (val == null) return null
  if (Array.isArray(val)) return val
  if (typeof val === 'string') {
    try {
      const p = JSON.parse(val)
      return Array.isArray(p) ? p : null
    } catch {
      return null
    }
  }
  return null
}

/**
 * DB 행 → 첨부 목록 (attachments JSON + 구버전 단일 컬럼 호환)
 * @param {Record<string, unknown>} row
 * @returns {BoardAttachmentItem[]}
 */
export function normalizeAttachmentsFromRow(row) {
  if (!row || typeof row !== 'object') return []

  const arr = parseAttachmentsJson(row.attachments)
  if (arr && arr.length > 0) {
    return arr
      .filter((a) => a && typeof a === 'object' && a.path)
      .map((a, i) => ({
        path: String(a.path).trim(),
        name:
          (a.name != null && String(a.name).trim()) || `첨부파일_${i + 1}`,
      }))
      .filter((a) => a.path)
  }

  if (row.attachment_path != null && String(row.attachment_path).trim() !== '') {
    return [
      {
        path: String(row.attachment_path).trim(),
        name:
          row.attachment_name != null && String(row.attachment_name).trim()
            ? String(row.attachment_name).trim()
            : '첨부파일',
      },
    ]
  }

  return []
}
