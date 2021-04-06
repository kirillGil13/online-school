import { Component } from 'vue-property-decorator';
import {maxLength, minLength, required, sameAs} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {VideoAccessFormRequestType} from '@/form/videoAccess/videoAccessForm.types';
/* eslint-disable */
/* tslint:disable */
@Component
export class VideoAccessForm extends Form {

    @Validate(maxLength(15), 'Номер не должен превышать 15 символов')
    @Validate(minLength(11), 'Номер должен быть не меньше 11 символов')
    public phone = '+';

    public phoneMask = '';
    public accountId = 0;
    public statusId = 1;
    public isFiction = false;
    public infoPackId = 0;

    @Validate(sameAs(() => true), (form: VideoAccessForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

    @Validate(required, 'Введите имя')
    public name = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): VideoAccessFormRequestType {
        return {
            phoneNumber: this.phone,
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
