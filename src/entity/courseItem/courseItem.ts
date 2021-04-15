import {CourseItemResponseType, ICourseItem, ICourseItemAuthor, ICourseLessons} from './courseItem.type';
import { LessonsTypesEnum } from '@/entity/common/lessons.types';
import {ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

export default class CourseItem implements ICourseItem {
    id: number;
    name: string;
    description: string;
    cost: number;
    author: ICourseItemAuthor;
    accountId: number;
    isLiked: boolean;
    isDisliked: boolean;
    isFavourite: boolean;
    photoLink: string;
    lessons: ICourseLessons[] = [];
    level: ICourseLevels;
    countLikes: number;
    countDislikes: number;
    constructor(data: CourseItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.description = this.resolveDescription(data.description);
        this.cost = data.cost;
        this.author = data.author;
        this.author.description = this.resolveDescription(data.author.description)
        this.accountId = data.account_id;//eslint-disable-line
        this.level = data.level;
        this.isLiked = data.is_liked;
        this.isDisliked = data.is_disliked;
        this.isFavourite = data.is_favourite;
        this.photoLink = data.photo_link;
        this.countLikes = data.count_likes,
        this.countDislikes = data.count_dislikes
        for (let i = 0; i < data.lessons.length; i++) {
            this.lessons.push({
                id: data.lessons[i].id,
                name: data.lessons[i].name,
                status: data.lessons[i].status,
                number: data.lessons[i].number,
            });
        }
    }
    resolveType(index: number, routeParam?: string): string {
        let type = '';
        switch (this.lessons[index].status) {
            case LessonsTypesEnum.DONE: type = LessonsTypesEnum.DONE; break;
            case LessonsTypesEnum.UN_DONE: type = LessonsTypesEnum.UN_DONE; break;
            case LessonsTypesEnum.LOCKED: type = LessonsTypesEnum.LOCKED; break;
        }
        if (routeParam) {
            if (type !== LessonsTypesEnum.LOCKED && this.lessons[index].id.toString() === routeParam.toString()) {
                type = LessonsTypesEnum.IN_PROGRESS;
            }
        }
        return type;
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
