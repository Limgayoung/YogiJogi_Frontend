import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './util/vuetify'
import axios from '@/util/axios'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.provide('$axios', axios);
app.mount('#app')
