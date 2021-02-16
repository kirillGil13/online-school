import {IProfileEditForm, ProfileEditFormType} from '@/form/profile/profileEditForm.types';
import {ProfileMainInfoRequestType} from '@/form/profile/mainInfo/ProfileMainInfoForm.types';
import {ProfileContactDataRequestType} from '@/form/profile/contactData/ProfileContactDataForm.types';

export default class ProfileEditForm implements IProfileEditForm {
    mainInfoRequest: ProfileMainInfoRequestType;
    contactDataRequest: ProfileContactDataRequestType;

    constructor(main: ProfileMainInfoRequestType, contact: ProfileContactDataRequestType) {
        this.mainInfoRequest = main;
        this.contactDataRequest = contact;
    }

    getFullRequest(): ProfileEditFormType {
        return {...this.mainInfoRequest, ...this.contactDataRequest};
    }
}