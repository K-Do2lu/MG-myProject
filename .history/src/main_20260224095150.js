import { createApp } from "vue";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "@/assets/scss/style.scss";
import App from "./App.vue";
import router from "./router";

// 전역 등록록
import BaseInput from '@/components/form/BaseInput.vue'
import BaseInput from '@/components/form/BaseSelect.vue'

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.mount("#app");
app.component ('BaseInput', BaseInput)