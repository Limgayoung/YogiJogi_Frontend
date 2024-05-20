import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useKakao } from 'vue3-kakao-maps/@utils';
import App from './App.vue';
import router from './router';
import vuetify from './util/vuetify';
import axios from '@/util/axios';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PrimVue from 'primevue/config';

// import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primevue/resources/primevue.min.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(PrimVue);
app.provide('$axios', axios);
// app.use(BootstrapVue3);
useKakao('24552d4b51f7bb99fa0203e1a2e75d09', ['clusterer', 'services', 'drawing']); // 각 라이브러리는 ',(콤마)'로 구분합니다.
app.mount('#app');
