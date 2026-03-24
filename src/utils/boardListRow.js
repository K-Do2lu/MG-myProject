import { formatBoardDate } from '@/utils/formatBoardDate'
import { normalizeAttachmentsFromRow } from '@/utils/boardAttachments'

/**
 * Supabase 게시글 행 → 공개 목록 테이블용 행
 * @param {Record<string, unknown>} row
 */
export function mapSupabaseRowToBoardListRow(row) {
  return {
    id: row.id,
    title: row.title,
    date: formatBoardDate(row.created_at),
    /** <time datetime> 용 ISO (표시용 점 구분과 분리) */
    dateIso: row.created_at ?? '',
    views: row.view_count ?? 0,
    isImportant: Boolean(row.is_hot),
    hasAttachment: normalizeAttachmentsFromRow(row).length > 0,
  }
}
