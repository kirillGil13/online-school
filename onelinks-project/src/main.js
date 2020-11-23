import Vue from 'vue'
import App from './App.vue'
import './assets/style.css'
import router from './router'
import Clipboard from 'v-clipboard'


 
Vue.use(Clipboard)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
