import { ClientLibrary, ReactiveFormConfig } from '@rxweb/reactive-forms';
import Vue from 'vue';

ReactiveFormConfig.clientLib = ClientLibrary.Vue;
Vue.config.productionTip = false;

ReactiveFormConfig.set({
    validationMessage: {
        required: 'Это поле обязательно',
        alpha: 'Только буквы разрешены',
        minLength: 'Введите корректный номер',
        maxLength: 'Введите корректный номер',
        pattern: 'Поле должно содержать только цифры',
        digit: 'Поле должно содержать только цифры',
        startsWith: 'Введите номер без кода страны',
    },
});
