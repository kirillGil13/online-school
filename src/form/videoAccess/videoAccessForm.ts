import { Component } from 'vue-property-decorator';
import {required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {VideoAccessFormRequestType} from '@/form/videoAccess/videoAccessForm.types';
/* eslint-disable */
/* tslint:disable */
@Component
export class VideoAccessForm extends Form {

    public phone = '';

    @Validate(required, 'Введите номер')
    public resultPhone = '';

    public accountId = 0;
    public statusId = 1;
    public isFiction = false;
    public infoPackId = 0;

    @Validate(required, 'Введите имя')
    public name = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): VideoAccessFormRequestType {
        return {
            phoneNumber: this.resultPhone,
            name: this.name,
            account_id: this.accountId,
            status_id: this.statusId,
            is_fiction: this.isFiction,
            info_pack_id: this.infoPackId
        };
    }
    setFormData(accountId: number, infoPackId: number): void {
        this.accountId = accountId;
        this.infoPackId = infoPackId;
    }
}
