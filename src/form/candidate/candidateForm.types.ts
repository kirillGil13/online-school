import { RequestType } from '@/form/form.types';

export type CandidateFormRequestType = RequestType & {
    name: string;
    phoneNumber: string;
    email?: string;
    is_fiction: boolean;
    status_id: number;
    account_id: number;
    info_pack_id: number;
};
export interface ICandidateForm {
    name: string;
    phone: string;
    email: string;
    product: number;
    status: number;
    statusList: ICandidateFormList[];
    productList: ICandidateFormList[];
}
export interface ICandidateFormList {
    text: string;
    value: number;
}
