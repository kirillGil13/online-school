import { RequestType } from '@/form/form.types';

export type CandidateFormRequestType = RequestType & {
    name: string;
    phoneNumber?: string;
    email?: string;
    callTime?: number;
    is_fiction: boolean;
    status_id: number;
    account_id: number;
    info_pack_id: number | null;
};
export interface ICandidateForm {
    name: string;
    phone: string;
    email: string;
    product: number | null;
    status: number;
    statusList: ICandidateFormList[];
    productList: ICandidateFormList[];
}
export interface ICandidateFormList {
    text: string;
    value: number | null;
}

export type CandidatePhoneRequestType = RequestType & {
    phone_number: string;
};
