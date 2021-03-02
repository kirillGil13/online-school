import { RequestType } from '@/form/form.types';
import {ISelectList} from '@/entity/select/select.types';

export type UpdateCandidateFormRequestType = RequestType & {
    name: string;
    phoneNumber?: string;
    email?: string;
    is_fiction: boolean;
    status_id: number;
    account_id: number;
    info_pack_id: number;
};
export interface IUpdateCandidateForm {
    candidateId: number;
    name: string;
    phone: string;
    email: string;
    product: number;
    status: number;
    statusList: ISelectList[];
    productList: ISelectList[];
}

