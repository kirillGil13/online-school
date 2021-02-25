import { RequestType } from '@/form/form.types';

export type RegisterRequestType = RequestType & {
    phoneNumber: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    photoLink: string;
};