import { Component } from 'vue-property-decorator';
import { required, sameAs, email } from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {VideoAccessFormRequestType} from '@/form/videoAccess/videoAccessForm.types';
/* eslint-disable */
/* tslint:disable */
@Component
export class VideoAccessForm extends Form {
    public phone = '';
    public phoneMask = '';
    public accountId = 0;
    public statusId = 1;
    public isFiction = false;
    public infoPackId = 0;

    @Validate(sameAs(() => true), (form: VideoAccessForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

    @Validate(required, 'Введите имя')
    public name = '';

    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный email')
    public email = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): VideoAccessFormRequestType {
        return {
            phoneNumber: this.phone,
            name: this.name,
            email: this.email,
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