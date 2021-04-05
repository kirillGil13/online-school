import {Component} from 'vue-property-decorator';
import {Form} from '@/form/form';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {required, sameAs, email, requiredIf} from 'vuelidate/lib/validators';
import {IStatuses} from '@/entity/statuses/statuses.types';
import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';
import {
    IUpdateCandidateForm, IUpdateCandidateFormList,
    UpdateCandidateFormRequestType
} from '@/form/updateCandidate/updateCandiadteForm.types';
import {ICandidateItem} from '@/entity/candidateItem/candidateItem.types';
/* eslint-disable */

/* tslint:disable */
@Component
export class UpdateCandidateForm extends Form implements IUpdateCandidateForm {
    public candidateId = 0;
    public phoneMask = '';
    public product: number | null = 0;
    public statusId = 0;
    public isFiction = false;
    public accountId = 0;
    public productList: IUpdateCandidateFormList[] = [];
    public statusList: IUpdateCandidateFormList[] = [];
    public callTime: number | null = 0;
    public callTimeFake = '';

    constructor() {
        super();
    }

    public serverErrors: { [key: string]: string[] } = {};

    @Validate(requiredIf(function (vm): boolean {
        return vm.email === '';
    }), 'Введите телефон или email')
    public phone = '';

    @Validate(sameAs(() => true), (form: UpdateCandidateForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

    @Validate(required, 'Введите имя ')
    public name = '';

    @Validate(requiredIf(function (vm): boolean {
        return vm.phone.length <= 2;
    }), 'Введите телефон или email')
    @Validate(email, 'Введите корректный Email')
    public email = '';

    getFormData(): UpdateCandidateFormRequestType {
        return {
            phoneNumber: this.phone.length === 2 ? null : this.phone,
            name: this.name,
            email: this.email === '' ? null : this.email,
            account_id: this.accountId,
            status_id: this.statusId,
            info_pack_id: this.product,
            is_fiction: this.isFiction,
            callTime: this.callTime === 0 ? null : this.callTime
        };
    }

    setFormData(data: ICandidateItem, statuses: IStatuses[], infoPacks: IInfoPackage[], accountId: number): void {
        for (let i = 0; i < statuses.length; i++) {
            this.statusList.push({text: statuses[i].name, value: statuses[i].id});
        }
        for (let i = 0; i < infoPacks.length; i++) {
            if (i === 0) {
                this.productList.push({text: 'Не важно', value: null});
            }
            this.productList.push({text: infoPacks[i].name, value: infoPacks[i].id})
        }
        this.statusId = data.status.id;
        this.product = data.infoPack ? data.infoPack.id : null;
        this.accountId = accountId;
        this.name = data.name;
        this.email = data.email ? data.email : '';
        this.phone = data.phoneNumber ? data.phoneNumber : '';
        this.callTime = data.callTime;
        this.candidateId = data.id;
    }

}
