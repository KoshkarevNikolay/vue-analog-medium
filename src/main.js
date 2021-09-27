import Vue from 'vue'
import Buefy from 'buefy'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date'
import './plugins/buefy'

Vue.use(Buefy)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
