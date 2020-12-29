import {IPartners, PartnersResponseType} from "@/entity/partners/partners.types";

export default class PartnersItem implements IPartners {
    id: number;
    phone: string;
    name: string;
    avatar: string;
    startPartnerDate: string;
    infoPackageTitle: string;

    constructor(data: PartnersResponseType) {
        this.id = data.id;
        this.phone = data.phone;
        this.name = data.name;
        this.avatar = data.avatar;
        this.startPartnerDate = data.startPartnerDate;
        this.infoPackageTitle = data.infoPackageTitle;
    }

}