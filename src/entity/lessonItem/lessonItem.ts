import {ILessonItem, ILessonItemFiles, LessonItemResponseType} from '@/entity/lessonItem/lessonItem.types';

export default class LessonItem implements ILessonItem {
    id: number;
    name: string;
    number: number;
    status: string;
    m3u8FileLink: string;
    description: string;
    photoLink: string;
    homeworkId: number;
    timeCode: number;
    files: ILessonItemFiles[] = [];
    constructor(data: LessonItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.number = data.number;
        this.status = data.status;
        this.description = data.description;
        this.m3u8FileLink = data.m3u8FileLink;
        this.photoLink = data.photoLink;
        this.homeworkId = data.homeworkId;
        this.timeCode = data.time_code;
        for (let i = 0; i < data.files.length; i++) {
            this.files.push(data.files[i]);
        }
    }
}
