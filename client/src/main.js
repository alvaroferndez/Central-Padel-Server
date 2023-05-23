import { createApp } from 'vue'
import { createPinia } from 'pinia'

// icons import
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { OiThreeBars, BiArrowUp, IoTennisballSharp, RiUser3Fill, HiLogout, IoClose, RiDeleteBack2Fill, MdModeeditoutlineOutlined  } from "oh-vue-icons/icons";
import Paginate from 'vue3-paginate';


import App from './App.vue'
import router from './router'

import './assets/styles.scss'
import './registerServiceWorker'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Paginate)

// icons
addIcons(OiThreeBars, BiArrowUp, IoTennisballSharp, RiUser3Fill, HiLogout, IoClose, RiDeleteBack2Fill, MdModeeditoutlineOutlined);
app.component("v-icon", OhVueIcon);

app.mount('#app')
