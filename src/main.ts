import Vue from "vue";
import App from "./UI/App.vue";
import '@/UI/assets/scss/common/element-variables.scss'
import {router} from "./router/router";
import store from "./store";
import "@/UI/assets/scss/main.scss";
import "@/plugins";
import '@/UI/components/svg';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
    router,
    store
}).$mount("#app");
