/**
 * 게시판 Supabase 테이블 화이트리스트.
 * 공개 상세/추후 관리자 CRUD에서 동일하게 사용해 잘못된 테이블 접근을 막습니다.
 */
export const BOARD_TABLE_KEYS = Object.freeze(['notice', 'tender'])

/** 공지/입찰 UI·관리자 문구 (한 곳에서 관리) */
export const BOARD_UI = Object.freeze({
  notice: Object.freeze({
    key: 'notice',
    pageTitle: '공지사항',
    tableCaption: '공지사항 목록',
    adminListTitle: '공지사항 목록',
    adminRadioLabel: '공지사항 · notice',
    /** CSS 변형 접미사: tab-page--notice, inner--notice */
    variant: 'notice',
  }),
  tender: Object.freeze({
    key: 'tender',
    pageTitle: '입찰공고',
    tableCaption: '입찰공고 목록',
    adminListTitle: '입찰공고 목록',
    adminRadioLabel: '입찰공고 · tender',
    variant: 'tender',
  }),
})

/** @param {string} key @returns {typeof BOARD_UI.notice} */
export function getBoardUi(key) {
  return isBoardTableKey(key) ? BOARD_UI[key] : BOARD_UI.notice
}

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
