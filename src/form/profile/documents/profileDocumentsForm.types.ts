import { RequestType } from '@/form/form.types';

export type ProfileDocumentsRequestType = RequestType & {
    name: string;
    email: string;
    phone: string;
    company: string;
    inn: string;
    kpp: string;
    ogrn: string;
    legalAddr: string;
    postAddr: string;
    fullNameSignatory: string;
    positionSignatory: string;
    nds: string;
    bankName: string;
    bik: string;
    corr: string;
    checkingAccount: string;
};
