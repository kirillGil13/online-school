import { RequestType } from '@/form/form.types';

export type RecoverSendCodeRequestType = RequestType & {
    email: string;
};
