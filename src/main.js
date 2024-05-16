

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useKakao } from 'vue3-kakao-maps/@utils';

import App from './App.vue'
import router from './router'
import vuetify from './util/vuetify'
import axios from '@/util/axios'

const app = createApp(App)

useKakao('709439cbc1ec01c73f7bca6aa652b003');
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.provide('$axios', axios);
app.mount('#app')
