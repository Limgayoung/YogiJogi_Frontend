import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useKakao } from 'vue3-kakao-maps/@utils';

import App from './App.vue'
import router from './router'
import vuetify from './util/vuetify'
import axios from '@/util/axios'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.provide('$axios', axios);
useKakao('24552d4b51f7bb99fa0203e1a2e75d09', ['clusterer', 'services', 'drawing']); // 각 라이브러리는 ',(콤마)'로 구분합니다.

app.mount('#app')
