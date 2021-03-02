import { RequestType } from '@/form/form.types';

export type CallTimeFormRequestType = RequestType & {
    callTime: number;
};