import Vue, { VNode } from 'vue';
import App from './UI/App.vue';
import { router } from './router/router';
import store from './store';
import '@/UI/assets/scss/common/element-variables.scss';
import '@/UI/assets/scss/main.scss';
import '@/UI/components/svg';
import { vuetify, prepareServices } from '@/plugins';

Vue.config.productionTip = false;
prepareServices(store);

new Vue({
    render: (h): VNode => h(App),
    router,
    store,
    vuetify,
}).$mount('#app');
