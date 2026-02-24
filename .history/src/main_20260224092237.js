import { createApp } from "vue";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "@/assets/scss/style.scss";
import App from "./App.vue";
import router from "./router";

import BaseInput from '@/componets/form/BaseInput.vue'

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.mount("#app");
app.compo