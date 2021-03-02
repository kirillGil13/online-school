import { RequestType } from '@/form/form.types';

export type VideoAccessFormRequestType = RequestType & {
    name: string;
    phoneNumber: string;
    account_id: number;
    status_id: number;
    is_fiction: boolean;
    info_pack_id: number;
};