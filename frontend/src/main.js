import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import store from "./store/index";

import './css/style.scss'

createApp(App).use(store).use(router).mount("#app");