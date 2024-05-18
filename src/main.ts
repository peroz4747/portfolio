import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupCalendar } from 'v-calendar'

import App from './App.vue'

const app = createApp(App)

app.use(setupCalendar, {})

app.use(createPinia())

app.mount('#app')
