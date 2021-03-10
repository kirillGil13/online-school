import { RequestType } from '@/form/form.types';

export type UpdateCandidateFormRequestType = RequestType & {
    name: string;
    phoneNumber?: string;
    email?: string;
    is_fiction: boolean;
    status_id: number;
    account_id: number;
    info_pack_id: number | null;
};
export interface IUpdateCandidateForm {
    candidateId: number;
    name: string;
    phone: string;
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

