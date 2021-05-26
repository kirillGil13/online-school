import Vue, { VNode } from 'vue';
import App from './UI/App.vue';
import { router } from './router/router';
import store from './store';
import '@/UI/assets/scss/common/element-variables.scss';
import '@/UI/assets/scss/main.scss';
import '@/UI/components/svg';
import { vuetify, prepareRepository } from '@/plugins';
import currencyFilter from '@/entity/filters/currency.filter';

Vue.config.productionTip = false;
Vue.filter('currency', currencyFilter);
prepareRepository(store);
Vue.config.ignoredElements = ['stream'];
export const eventBus = new Vue()


// @ts-ignore
new Vue({
    render: (h): VNode => h(App),
    router,
    store,
    vuetify,
}).$mount('#app');
