import {Component} from 'vue-property-decorator';
import {Form} from '@/form/form';
import {CandidateFormRequestType, ICandidateForm, ICandidateFormList} from '@/form/candidate/candidateForm.types';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {required, sameAs, email, requiredIf} from 'vuelidate/lib/validators';
import {IStatuses} from '@/entity/statuses/statuses.types';
import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';
/* eslint-disable */

/* tslint:disable */
@Component
export class CandidateForm extends Form implements ICandidateForm {
    public phoneMask = '';
    public product = 0;
    public status = 0;
    public isFiction = false;
    public accountId = 0;
    public productList: ICandidateFormList[] = [];
    public statusList: ICandidateFormList[] = [];

    public serverErrors: { [key: string]: string[] } = {};

    // @Validate(sameAs(() => true), (form: CandidateForm): string => 'Введите номер в формате ' + form.phoneMask)
    // public phoneValid = true;

    @Validate(required, 'Введите имя ')
    public name = '';

    @Validate(requiredIf('email'), 'Введите имя ')
    public phone = '';

    @Validate(requiredIf('phone'), 'Введите email')
    @Validate(email, 'Введите корректный Email')
    public email = '';

    getFormData(): CandidateFormRequestType {
        return {
            phoneNumber: this.phone,
            name: this.name,
            email: this.email,
            account_id: this.accountId,
            status_id: this.status,
            info_pack_id: this.product,
            is_fiction: this.isFiction
        };
    }

    setFormData(statuses: IStatuses[], infoPacks: IInfoPackage[], accountId: number): void {
        for (let i = 0; i < statuses.length; i++) {
            this.statusList.push({text: statuses[i].name, value: statuses[i].id});
        }
        for (let i = 0; i < infoPacks.length; i++) {
            this.productList.push({text: infoPacks[i].name, value: infoPacks[i].id})
        }
        this.status = this.statusList[0].value;
        this.product = this.productList[0].value;
        this.accountId = accountId;
    }

}
