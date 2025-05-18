import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './styles/base.css'
import App from './App.vue'
import router from './router'

// Font Awesome
import './plugins/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
