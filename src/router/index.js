import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import { ROUTES } from '@/constants/routes'

const guideModules = import.meta.glob('@/views/Guide/*.vue')

const guideChildren = Object.keys(guideModules)
  .filter((path) => !path.includes('guide.vue'))
  .map((path) => {
    const fileName = path.split('/').pop().replace('.vue', '')
    const name = fileName.toLowerCase()

    return {
      path: name,
      name: `Guide${fileName}`,
      component: guideModules[path],
    }
  })

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.GUIDE,
      name: 'Guide',
      component: () => import('@/views/Guide/guide.vue'),
      meta: { hideHeaderFooter: true },
      redirect: `${ROUTES.GUIDE}/color`,
      children: guideChildren,
    },
    { path: ROUTES.HOME, name: 'MainView', component: MainView },

    {
      path: ROUTES.COMPANY,
      name: 'SubViewCompany',
      component: () => import('@/views/MenuCompany/SubViewCompany.vue'),
    },
    {
      path: ROUTES.BUSINESS,
      name: 'ViewBusiness',
      component: () => import('@/views/MenuBusiness/SubViewBusiness.vue'),
    },
    {
      path: ROUTES.NOTICE,
      name: 'ViewNotice',
      component: () => import('@/views/MenuNotice/SubViewNotice.vue'),
    },
    {
      path: ROUTES.RECRUIT,
      name: 'ViewRecruit',
      component: () => import('@/views/MenuRecruit/SubViewRecruit.vue'),
    },

    {
      path: ROUTES.ADMIN,
      redirect: { path: ROUTES.ADMIN_BOARD, query: { board: 'notice' } },
    },
    {
      path: ROUTES.ADMIN_BOARD,
      name: 'AdminBoard',
      component: () => import('@/views/admin/AdminBoardHub.vue'),
      meta: { hideHeaderFooter: true, requireAuth: false },
    },
    {
      path: `${ROUTES.ADMIN_BOARD}/notice`,
      name: 'AdminBoardNotice',
      redirect: { path: ROUTES.ADMIN_BOARD, query: { board: 'notice' } },
    },
    {
      path: `${ROUTES.ADMIN_BOARD}/tender`,
      name: 'AdminBoardTender',
      redirect: { path: ROUTES.ADMIN_BOARD, query: { board: 'tender' } },
    },

    {
      path: ROUTES.FOOTER_PRIVACY,
      name: 'FooterSubPrivacy',
      component: () => import('@/views/FooterSubPrivacy.vue'),
    },
    {
      path: ROUTES.FOOTER_TERMS,
      name: 'FooterSubTerms',
      component: () => import('@/views/FooterSubTerms.vue'),
    },
    {
      path: ROUTES.FOOTER_EMAIL,
      name: 'FooterSubEmail',
      component: () => import('@/views/FooterSubEmail.vue'),
    },
  ],
})
