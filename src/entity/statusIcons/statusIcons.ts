import {IStatusIcons, StatusIconsResponseType} from '@/entity/statusIcons/statusIcons.types';

export default class StatusIcons implements IStatusIcons{
    shortLink: string;
    fullLink: string;

    constructor(data: StatusIconsResponseType) {
        this.shortLink = data.shortLink;
        this.fullLink = data.fullLink;
    }
}