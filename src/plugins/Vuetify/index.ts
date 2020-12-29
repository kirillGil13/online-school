import Vue from 'vue';
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify';
import ru from 'vuetify/src/locale/ru'

Vue.use(Vuetify);

export const vuetify = new Vuetify({
    lang: {
        locales: { ru },
        current: 'ru',
    },
});
