import { RequestType } from '@/form/form.types';

export type ProfileContactDataRequestType = RequestType & {
    vk: string;
    facebook: string;
    instagram: string;
    telegram: string;
};
