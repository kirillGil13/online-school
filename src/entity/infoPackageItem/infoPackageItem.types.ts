export interface IInfoPackageItem {
    id: number;
    mainVideo: IInfoPackageItemVideo;
    videos: IInfoPackageItemVideo[];
}
export interface IInfoPackageItemVideo {
    id: number;
    name: string;
    coverLink: string;
    videoLink: string;
}

export type InfoPackageItemResponseType = {
    id: number;
    mainVideo: InfoPackageItemVideoResponseType;
    videos: InfoPackageItemVideoResponseType[];
}

export type InfoPackageItemVideoResponseType = {
    id: number;
    name: string;
    coverLink: string;
    videoLink: string;
}

export type InfoPackageItemRequestType = {
    account_id: string;
}