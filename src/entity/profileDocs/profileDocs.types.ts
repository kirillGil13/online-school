export interface IProfileDocs {
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
}

export type ProfileDocsResponseType = {
    name: string;
    email: string;
    phone_number: string;
    company_name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    legal_address: string;
    mailing_address: string;
    signed_position: string;
    nds_info: string;
    bank_name: string;
    bik: string;
    correspondent_account: string;
    settlement_account: string;
    signed_name: string;
    status: string;
    reject_reason: string;
}

export enum ProfileDocsStatusEnum {
    EMPTY='empty',
    MODERATED='moderated',
    ACCEPTED='accepted',
    REJECTED='rejected',
}
