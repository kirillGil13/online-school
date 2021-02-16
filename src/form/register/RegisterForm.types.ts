import { RequestType } from '@/form/form.types';

export type RegisterRequestType = RequestType & {
    phone: string;
    code: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    confirm_password: string;
    avatar: string;
};