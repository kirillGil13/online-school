import {RequestType} from '@/form/form.types';

export interface IProfilePicture {
    shortLink: string;
    fullLink: string;
}
export type ProfilePictureResponseType = {
    shortLink: string;
    fullLink: string;
}
export type ProfilePictureRequestType = RequestType & {
    file: string;
}