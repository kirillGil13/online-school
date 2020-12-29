import { Moment } from 'moment';

export interface IPartner {
    id: number;
    phone: string;
    name: string;
    avatar: string;
    subscribe: boolean;
    startPartnerDate: Moment;
    infoPackageTitle: string;
    totalPartners: number;
}
export type PartnerResponseType = {
    id: number;
    phone: string;
    name: string;
    avatar: string;
    startPartnerDate: string;
    infoPackageTitle: string;
    totalPartners: number;
};
