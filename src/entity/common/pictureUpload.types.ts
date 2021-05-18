import {RequestType} from '@/form/form.types';

export interface IPictureUpload {
    shortLink: string;
    fullLink: string;
}
export type PictureUploadResponseType = {
    shortLink: string;
    fullLink: string;
}
export type PictureUploadRequestType = RequestType & {
    file: string;
}