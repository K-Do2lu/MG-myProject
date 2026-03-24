import JSZip from 'jszip'
import { getBoardAttachmentPublicUrl } from '@/utils/boardStorage'

/**
 * @typedef {{ path: string, name: string }} AttachmentItem
 */

/**
 * 공개 URL에서 파일을 받아 브라우저 다운로드 (파일명 지정)
 * @param {string} url
 * @param {string} filename
 */
export async function downloadUrlAsFile(url, filename) {
  if (!url) throw new Error('다운로드 URL이 없습니다.')
  const res = await fetch(url, { mode: 'cors' })
  if (!res.ok) throw new Error(`다운로드 실패 (${res.status})`)
  const blob = await res.blob()
  const objectUrl = URL.createObjectURL(blob)
  try {
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = filename || 'download'
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

/**
 * ZIP 안에서 겹치는 파일명 처리
 * @param {Set<string>} used
 * @param {string} baseName
 */
function uniqueEntryName(used, baseName) {
  const name = baseName && String(baseName).trim() ? String(baseName).trim() : 'file'
  if (!used.has(name)) {
    used.add(name)
    return name
  }
  const dot = name.lastIndexOf('.')
  const stem = dot > 0 ? name.slice(0, dot) : name
  const ext = dot > 0 ? name.slice(dot) : ''
  let i = 2
  let candidate = `${stem}_${i}${ext}`
  while (used.has(candidate)) {
    i += 1
    candidate = `${stem}_${i}${ext}`
  }
  used.add(candidate)
  return candidate
}

/**
 * 첨부 전체: 1개면 그대로 저장, 2개 이상이면 ZIP
 * @param {AttachmentItem[]} items
 * @param {string} [zipBaseName] ZIP 파일명 (확장자 제외)
 */
export async function downloadAllAttachments(items, zipBaseName = '첨부파일') {
  const list = (items || []).filter((x) => x?.path)
  if (list.length === 0) throw new Error('다운로드할 첨부가 없습니다.')

  if (list.length === 1) {
    const one = list[0]
    const url = getBoardAttachmentPublicUrl(one.path)
    await downloadUrlAsFile(url, one.name || '첨부파일')
    return
  }

  const zip = new JSZip()
  const used = new Set()
  for (const item of list) {
    const url = getBoardAttachmentPublicUrl(item.path)
    const res = await fetch(url, { mode: 'cors' })
    if (!res.ok) throw new Error(`파일을 가져오지 못했습니다: ${item.name || item.path}`)
    const blob = await res.blob()
    const entryName = uniqueEntryName(used, item.name || 'file')
    zip.file(entryName, blob)
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  const safeZip = String(zipBaseName).replace(/[/\\?%*:|"<>]/g, '_').slice(0, 80) || '첨부파일'
  const objectUrl = URL.createObjectURL(blob)
  try {
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = `${safeZip}.zip`
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}
