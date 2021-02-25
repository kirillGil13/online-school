import { RequestType } from '@/form/form.types';

export type LoginRequestType = RequestType & {
    username: string;
    password: string;
};
