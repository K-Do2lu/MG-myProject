import { ROUTES } from '@/constants/routes'

/**
 * 헤더 GNB — 제목·경로만 이 파일에서 관리
 * (하위 메뉴는 동일 섹션으로 이동; 탭 전환은 각 서브 페이지에서 처리)
 */
export const MAIN_NAV_ITEMS = Object.freeze([
  {
    title: 'COMPANY',
    link: ROUTES.COMPANY,
    subs: Object.freeze([
      { name: '회사개요', link: ROUTES.COMPANY },
      { name: 'CEO인사말', link: ROUTES.COMPANY },
      { name: '연혁', link: ROUTES.COMPANY },
      { name: '오시는 길', link: ROUTES.COMPANY },
      { name: '협력사 소개', link: ROUTES.COMPANY },
    ]),
  },
  {
    title: 'BUSINESS',
    link: ROUTES.BUSINESS,
    subs: Object.freeze([{ name: '사업영역', link: ROUTES.BUSINESS }]),
  },
  {
    title: 'NOTICE',
    link: ROUTES.NOTICE,
    subs: Object.freeze([
      { name: '공지사항', link: ROUTES.NOTICE },
      { name: '입찰공고', link: ROUTES.NOTICE },
      { name: '일정관리', link: ROUTES.NOTICE },
    ]),
  },
  {
    title: 'RECRUIT',
    link: ROUTES.RECRUIT,
    subs: Object.freeze([
      { name: '채용공고', link: ROUTES.RECRUIT },
      { name: '인재상', link: ROUTES.RECRUIT },
      { name: '자료실', link: ROUTES.RECRUIT },
    ]),
  },
])
