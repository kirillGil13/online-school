import { ILessonItem, LessonItemResponseType } from '@/entity/lessonItem/lessonItem.types';

export default class LessonItem implements ILessonItem {
    title: string;
    videoPath: string;
    videoUid: string;
    description: string;
    available: true;
    userViewingVideoDuration: number;
    constructor(data: LessonItemResponseType) {
        this.title = data.title;
        this.videoPath = data.videoPath;
        this.videoUid = data.videoUid;
        this.description = data.description;
        this.available = data.available;
        this.userViewingVideoDuration = data.userViewingVideoDuration;
    }
}
