import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

// icons import
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { OiThreeBars, BiArrowUp, IoTennisballSharp, RiUser3Fill, HiLogout, IoClose, RiDeleteBack2Fill, MdModeeditoutlineOutlined, MdDeleteforeverRound, BiArrowReturnLeft  } from "oh-vue-icons/icons";


import App from './App.vue'
import router from './router'

import './assets/styles.scss'
import './registerServiceWorker'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVfm())

// icons
addIcons(OiThreeBars, BiArrowUp, IoTennisballSharp, RiUser3Fill, HiLogout, IoClose, RiDeleteBack2Fill, MdModeeditoutlineOutlined, MdDeleteforeverRound, BiArrowReturnLeft);
app.component("v-icon", OhVueIcon);

app.mount('#app')
