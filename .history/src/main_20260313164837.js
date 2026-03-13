import { createApp } from "vue";
import { getImg } from '@/utils/imageLoader'
import ElementPlus from 'element-plus';
import ko from 'element-plus/dist/locale/ko.mjs'
import 'element-plus/dist/index.css';
import "@/assets/scss/style.scss";
import App from "./App.vue";
import router from "./router";

// 전역 등록
import BaseInput from '@/components/form/BaseInput.vue'
import BaseSelect from '@/components/form/BaseSelect.vue'
import BaseSelectFooter from '@/components/form/BaseSelectFooter.vue'
import BaseTable from '@/components/common/BaseTable.vue'
import BaseTab from '@/components/common/BaseTab.vue'
import BaseTabPanel from '@/components/common/BaseTabPanel.vue'
import BaseTopButton from '@/components/common/BaseTopButton.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'
import BaseBadge from '@/components/common/BaseBadge.vue'

const app = createApp(App);

app.use(ElementPlus, { locale: ko })
app.use(router);
app.mount("#app");
app.component ('BaseInput', BaseInput)
app.component ('BaseSelect', BaseSelect)
app.component ('BaseSelectFooter', BaseSelectFooter)
app.component ('BaseTable', BaseTable)
app.component ('BaseTab', BaseTab)
app.component ('BaseTabPanel', BaseTabPanel)
app.component ('BaseTopButton', BaseTopButton)
app.component ('BaseBadge', BaseBadge)
app.config.globalProperties.$getImg = getImg