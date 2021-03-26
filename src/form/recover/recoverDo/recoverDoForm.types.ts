import { RequestType } from '@/form/form.types';

export type RecoverDoRequestType = RequestType & {
    accountId: number;
    code: string;
    newPassword: string;
};
