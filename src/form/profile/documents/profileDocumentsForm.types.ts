import { RequestType } from '@/form/form.types';

export type ProfileDocumentsRequestType = RequestType & {
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
};
