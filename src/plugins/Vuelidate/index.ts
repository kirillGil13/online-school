import Vue from 'vue';

import Vuelidate from 'vuelidate';
import VuelidateErrorExtractor from 'vuelidate-error-extractor';

Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
    i18n: false,
});
