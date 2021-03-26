import { RequestType } from '@/form/form.types';

export type RecoverCheckRequestType = RequestType & {
    accountId: number;
    code: string;
};
