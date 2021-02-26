import {
    IInfoPackageItem,
    IInfoPackageItemVideo,
    InfoPackageItemResponseType
} from '@/entity/infoPackageItem/infoPackageItem.types';

export default class InfoPackageItem implements IInfoPackageItem{
    id: number;
    mainVideo: IInfoPackageItemVideo;
    videos: IInfoPackageItemVideo[] = [];

    constructor(data: InfoPackageItemResponseType) {
        this.id = data.id;
        this.mainVideo = data.mainVideo;
        for (let i = 0; i < data.videos.length; i++) {
            this.videos.push(data.videos[i]);
        }
    }
}