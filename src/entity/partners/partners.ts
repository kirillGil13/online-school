import { IPartner, PartnerResponseType } from '@/entity/partners';
import moment, { Moment } from 'moment';

export class Partner implements IPartner {
    id: number;
    phone: string;
    name: string;
    avatar: string;
    startPartnerDate: Moment;
    infoPackageTitle: string;
    subscribe: boolean;
    totalPartners: number;

    constructor(data: PartnerResponseType) {
        this.id = data.id;
        this.phone = data.phone;
        this.name = data.name;
        this.avatar = data.avatar;
        this.subscribe = false;
        this.startPartnerDate = moment(data.startPartnerDate);
        this.infoPackageTitle = data.infoPackageTitle;
        this.totalPartners = data.totalPartners;
    }
}
