import { RequestType } from '@/form/form.types';

export type CommentsChangeRequestType = RequestType & {
    message: string;
};
