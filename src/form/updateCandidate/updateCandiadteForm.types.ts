import { RequestType } from '@/form/form.types';

export type UpdateCandidateFormRequestType = RequestType & {
    name: string;
    phoneNumber: string | null;
    email: string | null;
    callTime: number | null;
    is_fiction: boolean;
    status_id: number;
    account_id: number;
    info_pack_id: number | null;
};
export interface IUpdateCandidateForm {
    candidateId: number;
    name: string;
    phone: string | null;
    email: string;
    product: number | null;
    status: number;
    statusList: IUpdateCandidateFormList[];
    productList: IUpdateCandidateFormList[];
}
export interface IUpdateCandidateFormList {
    text: string;
    value: number | null;
}

