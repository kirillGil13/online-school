import Vue from "vue";
import App from "./UI/App.vue";
import {router} from "./router/router";
import store from "./store";
import "@/UI/assets/scss/main.scss";
import { ClientLibrary, ReactiveFormConfig } from '@rxweb/reactive-forms';

ReactiveFormConfig.clientLib = ClientLibrary.Vue;
Vue.config.productionTip = false;

ReactiveFormConfig.set({
    validationMessage: {
      required: "Это поле обязательно",
      alpha: "Только буквы разрешены",
      minLength: "Введите корректный номер",
      maxLength: "Введите корректный номер",
      pattern: "Поле должно содержать только цифры",
      digit: "Поле должно содержать только цифры",
      startsWith: "Введите номер без кода страны",
    }
  });

new Vue({
  render: h => h(App),
    router,
    store
}).$mount("#app");
