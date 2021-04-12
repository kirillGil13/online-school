import { RequestType } from '@/form/form.types';

export type ChangeEmailRequestType = RequestType & {
    email: string;
};
