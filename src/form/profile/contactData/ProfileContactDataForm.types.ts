import { RequestType } from '@/form/form.types';

export type ProfileContactDataFormRequestType = RequestType & {
    email: string;
    vk: string;
    facebook: string;
    instagram: string;
    skype: string;
};