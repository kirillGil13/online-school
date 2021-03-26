import { Component } from 'vue-property-decorator';
import { required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {CallTimeFormRequestType} from '@/form/callTime/callTimeForm.types';

@Component
export class CallTimeForm extends Form {

    public callTime: number | null = 0;

    @Validate(required, 'Выберите дату')
    public callTimeFake = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): CallTimeFormRequestType {
        return {
            callTime: this.callTime,
        };
    }
}
