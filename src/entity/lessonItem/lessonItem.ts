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
    duration: number;
    homeworkIsDone: boolean;
    files: ILessonItemFiles[] = [];
    constructor(data: LessonItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.number = data.number;
        this.status = data.status;
        this.description = this.resolveDescription(data.description);
        this.m3u8FileLink = data.m3u8FileLink;
        this.photoLink = data.photoLink;
        this.homeworkId = data.homeworkId;
        this.timeCode = data.timeCode;
        this.duration = data.duration;
        this.homeworkIsDone = data.homeworkIsDone;
        for (let i = 0; i < data.files.length; i++) {
            this.files.push(data.files[i]);
        }
    }

    urlRegex = /([^\s]+\.(com|ru|net|рф|info|org|me|by|biz|pro|travel|tel|name|art|dev|online)[\S]*)/g;
    httpRegex = /https?:\/\//;

    resolveDescription(s: string): string {
        return s.replace(this.urlRegex, (url) => {
            const startsWithHttp = url.startsWith('http');
            if (this.httpRegex.test(url) && !startsWithHttp) return url;
            const url2 = startsWithHttp ? url : `https://${url}`;
            return `<a class="desc_link" target="_blank" href="${url2}">${url}</a>`;
        });
    }
}
