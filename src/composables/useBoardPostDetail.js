import { ref, watch, unref } from 'vue'
import { supabase } from '@/supabase'
import { assertBoardTableKey } from '@/constants/boardTables'
import { normalizeAttachmentsFromRow } from '@/utils/boardAttachments'
import { formatBoardDate } from '@/utils/formatBoardDate'

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

    const baseCount = Number(data.view_count) || 0
    const idNum = typeof id === 'number' ? id : Number(id)
    const pId = Number.isFinite(idNum) ? idNum : id

    // 1) Supabase SQL로 만든 RPC 우선 (원자적 증가, anon 에 UPDATE 없이도 가능)
    const { data: rpcViews, error: rpcError } = await supabase.rpc(
      'increment_board_view_count',
      { p_board: table, p_id: pId }
    )

    if (!rpcError && rpcViews != null && Number.isFinite(Number(rpcViews))) {
      post.value = mapRow({ ...data, view_count: Number(rpcViews) })
    } else {
      // 2) RPC 미생성·오류 시 기존 방식 (테이블 UPDATE 필요)
      if (import.meta.env.DEV && rpcError) {
        console.warn('[board] increment_board_view_count RPC 실패, update 시도:', rpcError.message)
      }
      const { error: incError } = await supabase
        .from(table)
        .update({ view_count: baseCount + 1 })
        .eq('id', id)

      if (incError) {
        if (import.meta.env.DEV) {
          console.warn('[board] view_count 증가 실패:', incError.message)
        }
        post.value = mapRow(data)
      } else {
        post.value = mapRow({ ...data, view_count: baseCount + 1 })
      }
    }
    error.value = null
  }

  watch(
    () => [tableKey, unref(idRef)],
    () => load(),
    { immediate: true }
  )

  return { post, loading, error, load }
}
