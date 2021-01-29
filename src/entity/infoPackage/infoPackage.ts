import {IInfoPackage, InfoPackageResponseType} from '@/entity/infoPackage/infoPackage.types';

export default class InfoPackage implements IInfoPackage {
    id: number;
    title: string;
    cover: string;
    openCount: number;
    registerCount: number;
    link: string;
    constructor(data: InfoPackageResponseType) {
        this.id = data.id;
        this.title = data.title;
        this.cover = data.cover;
        this.openCount = data.openCount;
        this.registerCount = data.registerCount;
        this.link = data.link
    }
}