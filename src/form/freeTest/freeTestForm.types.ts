import { RequestType } from '@/form/form.types';

export type FreeTestRequestType = RequestType & {
    answer_text: string;
};
