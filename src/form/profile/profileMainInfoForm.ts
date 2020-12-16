import { maxLength, required } from '@rxweb/reactive-forms';

import { ProfileMainInfo } from './profileMainInfoForm.types';

export class ProfileMainInfoForm implements ProfileMainInfo {
    @required()
    @maxLength({
        value: 30,
        message: 'Длинна имени не должна превышать 30 символов',
    })
    name: string;
    @required()
    @maxLength({
        value: 30,
        message: 'Длинна фамилии не должна превышать 30 символов',
    })
    surname: string;
    oneLinksId: string | number;
    referLink: string;
    @maxLength({
        value: 50,
        message: 'Длинна описания не должна превышать 50 символов',
    })
    bio: string;
    constructor({
        name,
        surname,
        oneLinksId,
        referLink,
        bio,
    }: ProfileMainInfo) {
        this.name = name;
        this.surname = surname;
        this.oneLinksId = oneLinksId;
        this.referLink = referLink;
        this.bio = bio;
    }
}
