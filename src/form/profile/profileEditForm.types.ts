import {ProfileMainInfoRequestType} from '@/form/profile/mainInfo/ProfileMainInfoForm.types';
import {ProfileContactDataRequestType} from '@/form/profile/contactData/ProfileContactDataForm.types';

export interface IProfileEditForm {
    mainInfoRequest: ProfileMainInfoRequestType;
    contactDataRequest: ProfileContactDataRequestType;
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