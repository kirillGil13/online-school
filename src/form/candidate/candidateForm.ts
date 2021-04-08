import {Component} from 'vue-property-decorator';
import {Form} from '@/form/form';
import {CandidateFormRequestType, ICandidateForm, ICandidateFormList} from '@/form/candidate/candidateForm.types';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {required, sameAs, email, requiredIf, maxLength, numeric, minLength} from 'vuelidate/lib/validators';
import {IStatuses} from '@/entity/statuses/statuses.types';
import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';
/* eslint-disable */

/* tslint:disable */
@Component
export class CandidateForm extends Form implements ICandidateForm {
    public product: number | null = 0;
    public statusId = 0;
    public isFiction = true;
    public accountId = 0;
    public callTimeFake = '';
    public callTime = 0;
    public productList: ICandidateFormList[] = [];
    public statusList: ICandidateFormList[] = [];
    public region = '';

    public serverErrors: { [key: string]: string[] } = {};

    @Validate(requiredIf(function (vm): boolean {
        return vm.email === '';
    }), 'Введите телефон или email')
    @Validate(numeric, 'Поле должно содержать только цифры')
    @Validate(minLength(5), 'Номер должен быть не меньше 5 символов')
    @Validate(maxLength(12), 'Номер должен быть не больше 12 символов')
    public phone = '';

    @Validate(required, 'Введите имя ')
    public name = '';

    @Validate(requiredIf(function (vm): boolean {
        return vm.phone === '';
    }), 'Введите телефон или email')
    @Validate(email, 'Введите корректный email')
    public email = '';

    getFormData(): CandidateFormRequestType {
        return {
            phoneNumber: this.phone === '' ? undefined : this.region + this.phone,
            name: this.name,
            email: this.email === '' ? undefined : this.email,
            account_id: this.accountId,
            status_id: this.statusId,
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
            if (i === 0) {
                this.productList.push({text: 'Не важно', value: null});
            }
            this.productList.push({text: infoPacks[i].name, value: infoPacks[i].id})
        }
        this.statusId = this.statusList[0].value!;
        this.product = this.productList[0].value!;
        this.accountId = accountId;
    }

}
