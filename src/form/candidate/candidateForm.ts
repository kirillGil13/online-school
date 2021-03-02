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
    public callTimeFake = '';
    public callTime = 0;
    public productList: ICandidateFormList[] = [];
    public statusList: ICandidateFormList[] = [];

    public serverErrors: { [key: string]: string[] } = {};

    @Validate(requiredIf(function (vm): boolean {
        return vm.email === '';
    }), 'Введите телефон или email')
    public phone = '';

    @Validate(sameAs(() => true), (form: CandidateForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

    @Validate(required, 'Введите имя ')
    public name = '';

    @Validate(requiredIf(function (vm): boolean {
        return vm.phone.length <= 2;
    }), 'Введите телефон или email')
    @Validate(email, 'Введите корректный email')
    public email = '';

    getFormData(): CandidateFormRequestType {
        return {
            phoneNumber: this.phone.length === 2 ? undefined : this.phone,
            name: this.name,
            email: this.email === '' ? undefined : this.email,
            account_id: this.accountId,
            status_id: this.status,
            info_pack_id: this.product,
            is_fiction: this.isFiction,
            callTime: this.callTime === 0 ? undefined : this.callTime,
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
