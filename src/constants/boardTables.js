/**
 * 게시판 Supabase 테이블 화이트리스트.
 * 공개 상세/추후 관리자 CRUD에서 동일하게 사용해 잘못된 테이블 접근을 막습니다.
 */
export const BOARD_TABLE_KEYS = Object.freeze(['notice', 'tender'])

/** @param {string} key */
export function isBoardTableKey(key) {
  return BOARD_TABLE_KEYS.includes(key)
}

/** @param {string} key @returns {'notice'|'tender'} */
export function assertBoardTableKey(key) {
  if (!isBoardTableKey(key)) {
    throw new Error(`[board] 허용되지 않은 테이블: ${key}`)
  }
  return key
}
