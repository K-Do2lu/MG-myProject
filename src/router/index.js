// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";

// 컴포넌트 가져오기(Lazy Loading 방식)
const SubViewCompany = () => import("@/views/MenuCompany/SubViewCompany.vue");
const SubViewBusiness = () => import("@/views/MenuBusiness/SubViewBusiness.vue");
const SubViewNotice = () => import("@/views/MenuNotice/SubViewNotice.vue");
const SubViewRecruit = () => import("@/views/MenuRecruit/SubViewRecruit.vue");

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: MainView },
    { path: "/sub1", component: SubViewCompany,},
    { path: "/sub2", component: SubViewBusiness },
    { path: "/sub3", component: SubViewNotice },
    { path: "/sub4", component: SubViewRecruit },

  ],
});
