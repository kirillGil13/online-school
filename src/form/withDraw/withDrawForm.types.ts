import { RequestType } from '@/form/form.types';

export type WithDrawRequestType = RequestType & {
    amount: number;
};
