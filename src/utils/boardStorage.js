import { supabase } from '@/supabase'

/** Supabase Storage 버킷명 (.env에서 변경 가능) */
export function getBoardStorageBucket() {
  return import.meta.env.VITE_SUPABASE_BOARD_BUCKET || 'board-attachments'
}

/**
 * Storage 객체 경로 → 공개 URL (버킷이 public read 정책일 때)
 * @param {string | null | undefined} storagePath
 */
export function getBoardAttachmentPublicUrl(storagePath) {
  if (!storagePath || typeof storagePath !== 'string') return ''
  const { data } = supabase.storage.from(getBoardStorageBucket()).getPublicUrl(storagePath)
  return data?.publicUrl ?? ''
}

/**
 * 파일명만 안전하게 정리 (경로 제거, 특수문자 축소) — UI·로그용
 * @param {string} name
 */
export function sanitizeAttachmentFilename(name) {
  if (!name || typeof name !== 'string') return 'file'
  const base = name.replace(/^.*[/\\]/, '').trim() || 'file'
  return base.replace(/[^\w.\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF\-+]/g, '_').slice(0, 180)
}

/**
 * Supabase Storage 객체 키는 비ASCII·일부 특수문자에서 Invalid key 가 날 수 있어
 * 경로는 UUID + 영문 확장자만 사용한다. 원본 이름은 DB attachment_name 에 저장.
 * @param {string} filename
 */
function getAsciiStorageExtension(filename) {
  const base = String(filename || '').replace(/^.*[/\\]/, '')
  const dot = base.lastIndexOf('.')
  if (dot <= 0 || dot === base.length - 1) return ''
  const ext = base
    .slice(dot + 1)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
  if (!ext || ext.length > 16) return ''
  return `.${ext}`
}

/**
 * 게시판 첨부 업로드
 * @param {'notice'|'tender'} tableKey
 * @param {File} file
 * @returns {Promise<{ path: string, error: Error | null }>}
 */
export async function uploadBoardAttachment(tableKey, file) {
  const bucket = getBoardStorageBucket()
  const ext = getAsciiStorageExtension(file.name) || '.bin'
  const path = `${tableKey}/${crypto.randomUUID()}${ext}`

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || 'application/octet-stream',
  })

  return { path, error: error ?? null }
}

/**
 * Storage 객체 여러 개 삭제 (게시글 삭제 시 정리용)
 * @param {string[]} paths
 */
export async function removeBoardStorageObjects(paths) {
  const list = (paths || []).filter((p) => p && typeof p === 'string')
  if (!list.length) return { error: null }
  const { error } = await supabase.storage.from(getBoardStorageBucket()).remove(list)
  return { error }
}

/**
 * 업로드 실패 시 사용자 안내 (특히 Bucket not found)
 * @param {{ message?: string } | Error | null} error
 * @param {string} bucketName
 */
export function formatStorageUploadError(error, bucketName) {
  const msg = error?.message || ''
  if (/bucket not found/i.test(msg)) {
    return `[${bucketName}] 버킷이 Storage에 없습니다. Supabase Dashboard → Storage → New bucket에서 버킷 이름에 ${bucketName} 를 그대로 입력해 만든 뒤 다시 등록하세요. 사이트에서 파일을 바로 받으려면 Public bucket으로 만드세요.`
  }
  if (/invalid key/i.test(msg)) {
    return 'Storage에 허용되지 않는 파일 경로입니다. 최신 코드는 한글 파일명도 지원합니다 — 페이지를 새로고침한 뒤 다시 등록해 보세요.'
  }
  return msg || '파일 업로드에 실패했습니다.'
}
