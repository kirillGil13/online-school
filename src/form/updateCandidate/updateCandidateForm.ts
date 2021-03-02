import {Component} from 'vue-property-decorator';
import {Form} from '@/form/form';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {required, sameAs, email} from 'vuelidate/lib/validators';
import {IStatuses} from '@/entity/statuses/statuses.types';
import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';
import {
    IUpdateCandidateForm,
    UpdateCandidateFormRequestType
} from '@/form/updateCandidate/updateCandiadteForm.types';
import {ICandidateItem} from '@/entity/candidateItem/candidateItem.types';
import {ISelectList} from '@/entity/select/select.types';
/* eslint-disable */

/* tslint:disable */
@Component
export class UpdateCandidateForm extends Form implements IUpdateCandidateForm {
    public candidateId = 0;
    public phoneMask = '';
    public product = 0;
    public phone = '';
    public status = 0;
    public isFiction = false;
    public accountId = 0;
    public productList: ISelectList[] = [];
    public statusList: ISelectList[] = [];

    public serverErrors: { [key: string]: string[] } = {};

    @Validate(sameAs(() => true), (form: UpdateCandidateForm): string => 'Введите номер в формате ' + form.phoneMask)
    public phoneValid = true;

    @Validate(required, 'Введите имя ')
    public name = '';

    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный Email')
    public email = '';

    getFormData(): UpdateCandidateFormRequestType {
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

    setFormData(data: ICandidateItem, statuses: IStatuses[], infoPacks: IInfoPackage[], accountId: number): void {
        for (let i = 0; i < statuses.length; i++) {
            this.statusList.push({text: statuses[i].name, value: statuses[i].id});
        }
        for (let i = 0; i < infoPacks.length; i++) {
            this.productList.push({text: infoPacks[i].name, value: infoPacks[i].id})
        }
        this.status = data.status.id;
        this.product = data.infoPack.id;
        this.accountId = accountId;
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phoneNumber;
        this.candidateId = data.id;
    }

}
