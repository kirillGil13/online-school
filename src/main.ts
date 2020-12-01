import Vue from "vue";
import App from "./UI/App.vue";
import Element from 'element-ui'
import '@/UI/assets/scss/common/element-variables.scss'
import SvgIcon from 'vue-svgicon'
import router from "./router/router";
import store from "./store";
import "@/UI/assets/scss/main.scss";
import '@/UI/components/svg'

Vue.config.productionTip = false;

Vue.use(Element)

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

new Vue({
  render: h => h(App),
    router,
    store
}).$mount("#app");
