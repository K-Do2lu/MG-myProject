import { ref, watch, unref } from 'vue'
import { supabase } from '@/supabase'
import { assertBoardTableKey } from '@/constants/boardTables'
import { normalizeAttachmentsFromRow } from '@/utils/boardAttachments'

function formatBoardDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

function mapRow(row) {
  if (!row) return null
  const attachments = normalizeAttachmentsFromRow(row)
  const first = attachments[0]
  return {
    id: row.id,
    title: row.title ?? '',
    content: row.content ?? '',
    date: formatBoardDate(row.created_at),
    dateIso: row.created_at ?? '',
    views: row.view_count ?? 0,
    isImportant: Boolean(row.is_hot),
    /** 실제 Storage 경로가 있을 때만 (has_file 만 true인 구데이터는 아이콘 숨김) */
    hasAttachment: attachments.length > 0,
    /** 다건 첨부 (단건은 길이 1) */
    attachments,
    /** 하위 호환 · 첫 첨부 */
    attachmentPath: first?.path ?? '',
    attachmentName: first?.name ?? '',
    /** 관리자·확장용 원본 (필요 시만 사용) */
    raw: row,
  }
}

/**
 * 단건 게시글 로드 (공지/입찰 공통). 관리자 페이지에서도 동일 테이블 키로 재사용 가능.
 *
 * @param {'notice'|'tender'} tableKey
 * @param {import('vue').Ref<unknown>} idRef — toRef(props, 'postId') 등
 */
export function useBoardPostDetail(tableKey, idRef) {
  const post = ref(null)
  const loading = ref(false)
  const error = ref(null)

  function resolveId() {
    const v = unref(idRef)
    if (v == null || v === '') return null
    const n = Number(v)
    return Number.isFinite(n) ? n : v
  }

  async function load() {
    let table
    try {
      table = assertBoardTableKey(tableKey)
    } catch (e) {
      error.value = e.message
      post.value = null
      return
    }

    const id = resolveId()
    if (id == null) {
      post.value = null
      error.value = null
      loading.value = false
      return
    }

    loading.value = true
    error.value = null

    const { data, error: sbError } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .maybeSingle()

    loading.value = false

    if (sbError) {
      error.value = sbError.message
      post.value = null
      return
    }
    if (!data) {
      error.value = '게시글을 찾을 수 없습니다.'
      post.value = null
      return
    }

    post.value = mapRow(data)
    error.value = null
  }

  watch(
    () => [tableKey, unref(idRef)],
    () => load(),
    { immediate: true }
  )

  return { post, loading, error, load }
}
