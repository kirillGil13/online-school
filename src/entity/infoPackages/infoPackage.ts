import {IInfoPackage, InfoPackageResponseType} from '@/entity/infoPackages/infoPackage.types';

export default class InfoPackage implements IInfoPackage {
    id: number;
    name: string;
    coverLink: string;
    sharedLink: string;
    countViews: number;
    countCandidates: number;
    constructor(data: InfoPackageResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.coverLink = data.coverLink;
        this.sharedLink = data.sharedLink;
        this.countViews = data.countViews;
        this.countCandidates = data.countCandidates;
    }
}