/**
 * 앱 전역 UI·레이아웃 설정 (환경과 무관한 상수)
 * 빌드 타임 env는 import.meta.env / supabase.js 에서만 사용
 */
export const APP_CONFIG = Object.freeze({
  /** 공지·입찰 목록 테이블 */
  boardList: Object.freeze({
    pageSize: 7,
    /** 모바일 단일 열 레이아웃 전환 (px) */
    mobileMaxWidthPx: 500,
    searchPlaceholder: '검색어를 입력해주세요.',
    emptyText: '데이터가 없습니다.',
    loadingText: '불러오는 중…',
    totalCountLabel: '총',
    totalCountUnit: '건',
  }),
  /** 본문 영역 id (스킵 링크 타깃) */
  mainContentId: 'container',
})
