import Vue from 'vue';
import { VueReCaptcha } from 'vue-recaptcha-v3';

// For more options see below
Vue.use(VueReCaptcha, {
    siteKey: '6LcOMJgaAAAAAG1RW35e2F66V4ZuY2cBiahSJ3hu',
    loaderOptions: {
        autoHideBadge: true

    }
});
