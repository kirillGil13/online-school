import { RequestType } from '@/form/form.types';

export type ProfileContactDataRequestType = RequestType & {
    email: string;
    vk: string;
    facebook: string;
    instagram: string;
    skype: string;
};