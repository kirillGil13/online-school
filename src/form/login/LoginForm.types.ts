import { RequestType } from '@/form/form.types';

export type LoginRequestType = RequestType & {
    phone: string;
    code?: string;
};
