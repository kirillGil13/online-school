import { RequestType } from '@/form/form.types';

export type CandidateFormRequestType = RequestType & {
    name: string;
    phone: string;
    email?: string;
    product: string;
    status: string;
};
export interface ICandidateForm {
    name: string;
    phone: string;
    email: string;
    product: string;
    status: string;
    statusList: string[];
    productList: string[];
}
