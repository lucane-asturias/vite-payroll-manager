import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import VeeValidatePlugin from './utils/validation'
import { auth } from './utils/firebase'
import i18n from './utils/i18n'
import ProgressBar from './utils/progress-bar'
import 'nprogress/nprogress.css'

import './tailwind.css'
import "semantic-ui-css/semantic.min.css"

ProgressBar(router)

let app
// wait firebase to initialize authenticate the user 
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(i18n)
    // The use method allow to register a plug-in
    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin)

    app.mount('#app')
  }
})