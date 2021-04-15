export interface IInfoPackage {
    id: number;
    name: string;
    coverLink: string;
    sharedLink: string;
    countViews: string;
    countCandidates: number;
}
export type InfoPackageResponseType = {
    id: number;
    name: string;
    coverLink: string;
    sharedLink: string;
    countViews: number;
    countCandidates: number;
}
