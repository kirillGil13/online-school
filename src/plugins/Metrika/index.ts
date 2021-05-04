import Vue from 'vue'
import VueYandexMetrika from 'vue-yandex-metrika'
import {router} from '@/router/router';

Vue.use(VueYandexMetrika, {
    id: 77651428,
    router: router,
    env: process.env.NODE_ENV,
    options: {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
    }
})
