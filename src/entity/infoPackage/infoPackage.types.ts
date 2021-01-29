export interface IInfoPackage {
    id: number;
    title: string;
    cover: string;
    openCount: number;
    registerCount: number;
    link: string;
}
export type InfoPackageResponseType = {
    id: number;
    title: string;
    cover: string;
    openCount: number;
    registerCount: number;
    link: string;
}