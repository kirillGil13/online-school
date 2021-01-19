import {ProfileMainInfoFormRequestType} from '@/form/profile/mainInfo/ProfileMainInfoForm.types';
import {ProfileContactDataFormRequestType} from '@/form/profile/contactData/ProfileContactDataForm.types';

export interface IProfileEditForm {
    mainInfoRequest: ProfileMainInfoFormRequestType;
    contactDataRequest: ProfileContactDataFormRequestType;
    getFullRequest(): ProfileEditFormType;
}
export type ProfileEditFormType = {
    name: string;
    surname: string;
    login: string;
    email: string;
    vk: string;
    facebook: string;
    instagram: string;
    skype: string;
    description: string;
}