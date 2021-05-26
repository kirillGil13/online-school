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
    countViews: string;
    totalDuration: string;
    rating: number;
    isPurchased: boolean;
    canBeAddedToTeam: boolean;

    constructor(data: CourseItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description ? this.resolveDescription(data.description) : '';
        this.cost = data.cost;
        this.author = data.author;
        this.author.description = data.author.description ? this.resolveDescription(data.author.description) : '';
        this.accountId = data.account_id;//eslint-disable-line
        this.level = data.level;
        this.isLiked = data.is_liked;
        this.isDisliked = data.is_disliked;
        this.isFavourite = data.is_favourite;
        this.photoLink = data.photo_link;
        this.countLikes = data.count_likes;
        this.countDislikes = data.count_dislikes;
        this.countViews = data.count_views.toLocaleString();
        this.rating = data.rating;
        this.totalDuration = this.fullDuration(data.total_duration);
        this.isPurchased = data.is_purchased;
        this.canBeAddedToTeam = data.can_be_added_to_team;
        for (let i = 0; i < data.lessons.length; i++) {
            this.lessons.push({
                id: data.lessons[i].id,
                name: data.lessons[i].name,
                status: data.lessons[i].status,
                number: data.lessons[i].number,
                duration: this.fullDuration(data.lessons[i].duration)
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

    // eslint-disable-next-line @typescript-eslint/camelcase
    fullDuration(total_duration: number): string {
        let h = 0;
        let m = 0;
        let s = 0;
        // eslint-disable-next-line @typescript-eslint/camelcase
        m = Math.floor(total_duration / 60);
        // eslint-disable-next-line @typescript-eslint/camelcase
        s = Math.floor(total_duration % 60);
        h = Math.floor(m / 60);
        m = m % 60;
        let hDisplay = '';
        let mDisplay = '';
        if (m < 10 && m > 0) {
            mDisplay = '0' + m + ':';
        } else if (m >= 10) {
            mDisplay = m + ':';
        } else mDisplay = '0:';
        let sDisplay = s > 0 ? s.toString() : '';
        hDisplay = h > 0 ? h + ':' : '';
        if (h === 0)
            hDisplay = '0:';
        sDisplay = s < 10 ? '0' + sDisplay : sDisplay;
        return hDisplay + mDisplay + sDisplay;
    }


}
