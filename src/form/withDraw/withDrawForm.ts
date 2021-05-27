import { Component } from 'vue-property-decorator';
import {numeric, required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {WithDrawRequestType} from '@/form/withDraw/withDrawForm.types';
import {IProfileDocs, ProfileDocsStatusEnum} from '@/entity/profileDocs/profileDocs.types';

@Component
export class WithDrawForm extends Form {

    public person = '';

    public balance = 0;

    @Validate(required, 'Введите сумму')
    @Validate(numeric, 'Можно вводить только цифры')
    public sum = '';

    public serverErrors: { [key: string]: string[] } = {};

    getFormData(): WithDrawRequestType {
        return {
            amount: +this.sum
        };
    }
    setFormData(doc: IProfileDocs | null, balance: number): void {
        if (doc && doc.status === ProfileDocsStatusEnum.ACCEPTED) {
            this.person = doc.companyName;
        }
        this.balance = balance;
    }
}
