import {IProfileDocs, ProfileDocsResponseType} from '@/entity/profileDocs/profileDocs.types';

export default class ProfileDocs implements IProfileDocs {
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    inn: string;
    kpp: string;
    ogrn: string;
    legalAddress: string;
    mailingAddress: string;
    signedPosition: string;
    ndsInfo: string;
    bankName: string;
    bik: string;
    correspondentAccount: string;
    settlementAccount: string;
    signedName: string;
    status: string;
    rejectReason: string;

    constructor(data: ProfileDocsResponseType) {
        this.name = data.name;
        this.email = data.email;
        this.phoneNumber = data.phone_number;
        this.companyName = data.company_name;
        this.inn = data.inn;
        this.kpp = data.kpp;
        this.ogrn = data.ogrn;
        this.legalAddress = data.legal_address;
        this.mailingAddress = data.mailing_address;
        this.signedPosition = data.signed_position;
        this.ndsInfo = data.nds_info;
        this.bankName = data.bank_name;
        this.bik = data.bik;
        this.correspondentAccount = data.correspondent_account;
        this.settlementAccount = data.settlement_account;
        this.signedName = data.signed_name;
        this.status = data.status;
        this.rejectReason = data.reject_reason;
    }
}
