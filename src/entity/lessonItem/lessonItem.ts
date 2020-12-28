import {ILessonItem, LessonItemResponseType} from "@/entity/lessonItem/lessonItem.types";

export default class LessonItem implements ILessonItem {
    title: string;
    videoLink: string;
    description: string;
    available: true;
    userViewingVideoDuration: number;
    constructor(data: LessonItemResponseType) {
        this.title = data.title;
        this.videoLink = data.videoLink;
        this.description = data.description;
        this.available = data.available;
        this.userViewingVideoDuration = data.userViewingVideoDuration;
    }
}