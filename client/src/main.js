import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import App from './App.vue'
import router from './router'

import './assets/styles.scss'
import './registerServiceWorker'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueToast)
app.mount('#app')
