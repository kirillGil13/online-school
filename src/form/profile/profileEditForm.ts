import {IProfileEditForm, ProfileEditFormType} from '@/form/profile/profileEditForm.types';
import {ProfileMainInfoFormRequestType} from '@/form/profile/mainInfo/ProfileMainInfoForm.types';
import {ProfileContactDataFormRequestType} from '@/form/profile/contactData/ProfileContactDataForm.types';

export default class ProfileEditForm implements IProfileEditForm {
    mainInfoRequest: ProfileMainInfoFormRequestType;
    contactDataRequest: ProfileContactDataFormRequestType;

    constructor(main: ProfileMainInfoFormRequestType, contact: ProfileContactDataFormRequestType) {
        this.mainInfoRequest = main;
        this.contactDataRequest = contact;
    }

    getFullRequest(): ProfileEditFormType {
        return {...this.mainInfoRequest, ...this.contactDataRequest};
    }
}