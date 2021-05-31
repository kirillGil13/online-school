import { Component } from 'vue-property-decorator';
import {numeric, required} from 'vuelidate/lib/validators';
import { Form } from '@/form/form';
import { Validate } from '@/plugins/Vuelidate/Decorators';
import {WithDrawRequestType} from '@/form/withDraw/withDrawForm.types';
import {IProfileDocs, ProfileDocsStatusEnum} from '@/entity/profileDocs/profileDocs.types';
import {less} from '@/constants/validators';

@Component
export class WithDrawForm extends Form {
    public person = '';
    public balance = '';

    @Validate(required, 'Введите сумму')
    @Validate(numeric, 'Можно вводить только цифры')
    @Validate(less('balance'), 'Введите сумму, не превышающую остатка на балансе')
    public sum = '';

    public serverErrors: { [key: string]: string[] } = {};

    clearData(): void {
        this.sum = '';
    }

    getFormData(): WithDrawRequestType {
        return {
            amount: +this.sum
        };
    }
    setFormData(doc: IProfileDocs | null, balance: string): void {
        if (doc && doc.status === ProfileDocsStatusEnum.ACCEPTED) {
            this.person = doc.companyName;
        }
        this.balance = balance;
    }
}
