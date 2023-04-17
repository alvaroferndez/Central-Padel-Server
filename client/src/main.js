import { createApp } from 'vue'
import { createPinia } from 'pinia'

// icons import
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { OiThreeBars, BiArrowUp, IoTennisballSharp, RiUser3Fill } from "oh-vue-icons/icons";

import App from './App.vue'
import router from './router'

import './assets/styles.scss'
import './registerServiceWorker'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// icons
addIcons(OiThreeBars, BiArrowUp, IoTennisballSharp, RiUser3Fill);
app.component("v-icon", OhVueIcon);

app.mount('#app')
