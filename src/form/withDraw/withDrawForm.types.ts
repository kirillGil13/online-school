import { RequestType } from '@/form/form.types';

export type WithDrawRequestType = RequestType & {
    sum: number;
};
