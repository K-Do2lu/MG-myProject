// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import MainView from "@/views/MainView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: MainView }],
});
// main.js
import router from "@/router";
createApp(App).use(router).mount("#app");
