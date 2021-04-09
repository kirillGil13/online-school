import Vue from 'vue';
import VuePhoneNumberInput from 'vue-phone-number-input';

import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export const translations = {
    countrySelectorLabel: 'Код страны',
    countrySelectorError: '',
    phoneNumberLabel: '',
    example: 'Пример :'
}

Vue.component('vue-phone-number-input', VuePhoneNumberInput);
