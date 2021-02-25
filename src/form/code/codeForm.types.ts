import { RequestType } from '@/form/form.types';

export type CodeRequestType = RequestType & {
    phone: string;
    code: string;
};