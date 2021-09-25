import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faCheck,
  faExclamationCircle,
  faEye,
  faEyeSlash,
  faSignLanguage,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons'

import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

library.add(
  faChevronLeft,
  faChevronRight,
  faCheck,
  faExclamationCircle,
  faEye,
  faEyeSlash,
  faSignLanguage, // хлопки sign-language
  faSignInAlt, // войти sign-in-alt
  faEdit, // Изменить far edit
  faTrashAlt, // Удалить far trash-alt
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas',
})

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
