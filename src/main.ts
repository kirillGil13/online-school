import Vue from "vue";
import App from "./UI/App.vue";
import router from "./router/router";
import store from "./store";
import "@/UI/assets/scss/main.scss";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
    router,
    store
}).$mount("#app");
