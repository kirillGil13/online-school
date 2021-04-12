import {IInfoPackage, InfoPackageResponseType} from '@/entity/infoPackages/infoPackage.types';

export default class InfoPackage implements IInfoPackage {
    id: number;
    name: string;
    coverLink: string;
    sharedLink: string;
    countViews: string;
    countCandidates: number;
    constructor(data: InfoPackageResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.coverLink = data.coverLink;
        this.sharedLink = data.sharedLink;
        this.countViews = data.countViews.toLocaleString();
        this.countCandidates = data.countCandidates;
    }
}
