import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

app.config.globalProperties.accessToken = "pk.eyJ1Ijoic3VuYmluZ3FpbmciLCJhIjoiY2w5Z3R2a2g2MDgzdDN1cDIxYWUwMjUzcSJ9.JWn1byZ7mTIBqVNZzpEwRA";
