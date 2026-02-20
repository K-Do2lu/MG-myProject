import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";

// 1. Guide 폴더 내의 모든 .vue 파일을 동적으로 가져옵니다.
// (단, 메인 가이드 틀인 guide.vue는 제외하기 위해 필터링)
const guideModules = import.meta.glob("@/views/Guide/*.vue");

const guideChildren = Object.keys(guideModules)
  .filter((path) => !path.includes('guide.vue')) // 메인 틀 파일은 제외
  .map((path) => {
    const fileName = path.split('/').pop().replace('.vue', '');
    const name = fileName.toLowerCase();
    
    return {
      path: name, // 주소: /guide/button, /guide/color 등
      name: `Guide${fileName}`,
      component: guideModules[path]
    };
  });

export default createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: "/guide", 
      name: 'Guide', 
      component: () => import("@/views/Guide/guide.vue"), // 메인 레이아웃
      meta: { hideHeaderFooter: true },
      redirect: '/guide/color', // /guide 접속 시 자동으로 color 가이드로 이동
      children: guideChildren // 2. 여기에 자동 생성된 자식 라우트 주입
    },
    { path: "/", name: 'MainView', component: MainView },
    { path: "/sub1", name: 'SubViewCompany', component: () => import("@/views/MenuCompany/SubViewCompany.vue") },
    { path: "/sub2", name: 'SubViewBusiness', component: () => import("@/views/MenuBusiness/SubViewBusiness.vue") },
    { path: "/sub3", name: 'SubViewNotice', component: () => import("@/views/MenuNotice/SubViewNotice.vue") },
    { path: "/sub4", name: 'SubViewRecruit', component: () => import("@/views/MenuRecruit/SubViewRecruit.vue") },
  ],
});