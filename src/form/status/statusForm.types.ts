import { RequestType } from '@/form/form.types';

export type StatusFormRequestType = RequestType & {
    name: string;
    photo_link: string;
};