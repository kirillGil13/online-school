import { RequestType } from '@/form/form.types';

export type CodeRequestType = RequestType & {
    phone_number: string;
    code: string;
};