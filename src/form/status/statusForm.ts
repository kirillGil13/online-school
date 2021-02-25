import { Component } from 'vue-property-decorator';
import { required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {StatusFormRequestType} from '@/form/status/statusForm.types';
/* eslint-disable */
/* tslint:disable */
@Component
export class StatusForm extends Form {

    @Validate(required, 'Выберите иконку')
    public photoLink = '';

    @Validate(required, 'Введите название')
    public name = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): StatusFormRequestType {
        return {
            name: this.name,
            photo_link: this.photoLink,
        };
    }
}
