import {Component} from 'vue-property-decorator';
import { Form } from '@/form/form';
import {Validate} from '@/plugins/Vuelidate/Decorators';
import {required, email} from 'vuelidate/lib/validators';
import {ProfileDocumentsRequestType} from '@/form/profile/documents/profileDocumentsForm.types';
import {IProfileDocs} from '@/entity/profileDocs/profileDocs.types';

@Component
export class ProfileDocumentsForm extends Form {
    public id = 0;

    public statusName = 'empty';

    public serverErrors: { [key: string]: string[] } = {};

    @Validate(required, 'Введите имя и фамилию')
    public name = '';

    @Validate(required, 'Введите email')
    @Validate(email, 'Введите корректный email')
    public email = '';

    @Validate(required, 'Введите номер')
    public resultPhone = '';

    public phone = '';

    @Validate(required, 'Введите название компании')
    public company = '';

    @Validate(required, 'Введите ИНН')
    public inn = '';

    @Validate(required, 'Введите КПП')
    public kpp = '';

    @Validate(required, 'Введите ОГРН')
    public ogrn = '';

    @Validate(required, 'Введите юридический адрес')
    public legalAddr = '';

    @Validate(required, 'Введите почтовый адрес')
    public postAddr = '';

    @Validate(required, 'Введите ФИО')
    public fullNameSignatory = '';

    @Validate(required, 'Введите должность')
    public positionSignatory = '';

    @Validate(required, 'Введите информацию об НДС')
    public nds = '';

    @Validate(required, 'Введите наименование банка')
    public bankName = '';

    @Validate(required, 'Введите корреспондентский счет')
    public corr = '';

    @Validate(required, 'Введите БИК')
    public bik = '';

    @Validate(required, 'Введите расчетный счет')
    public checkingAccount = '';


    setFormData(data: IProfileDocs): void {
        this.name = data.name;
        this.email = data.email;
        this.phone = data.phoneNumber;
        this.company = data.companyName;
        this.inn = data.inn;
        this.kpp = data.kpp;
        this.ogrn = data.ogrn;
        this.legalAddr = data.legalAddress;
        this.postAddr = data.mailingAddress;
        this.positionSignatory = data.signedPosition;
        this.nds = data.ndsInfo;
        this.bankName = data.bankName;
        this.bik = data.bik;
        this.corr = data.correspondentAccount;
        this.checkingAccount = data.settlementAccount;
        this.fullNameSignatory = data.signedName;
        this.statusName = data.status;
    }

    getFormData(): ProfileDocumentsRequestType {
        return {
            name: this.name,
            email: this.email,
            phone_number: this.resultPhone,
            company_name: this.company,
            inn: this.inn,
            kpp: this.kpp,
            ogrn: this.ogrn,
            legal_address: this.legalAddr,
            mailing_address: this.postAddr,
            signed_name: this.fullNameSignatory,
            signed_position: this.positionSignatory,
            nds_info: this.nds,
            bank_name: this.bankName,
            correspondent_account: this.corr,
            bik: this.bik,
            settlement_account: this.checkingAccount,
        };
    }
}
