import {CourseItemResponseType, ICourseItem, ICourseLessons} from './courseItem.type';
import { LessonsTypesEnum } from '@/entity/common/lessons.types';
import {ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

export default class CourseItem implements ICourseItem {
    id: number;
    name: string;
    description: string;
    cost: number;
    account_id: number;
    isLiked: boolean;
    isDisliked: boolean;
    isFavourite: boolean;
    photoLink: string;
    lessons: ICourseLessons[] = [];
    level: ICourseLevels;
    constructor(data: CourseItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.cost = data.cost;
        this.account_id = data.account_id;//eslint-disable-line
        this.level = data.level;
        this.isLiked = data.is_liked;
        this.isDisliked = data.is_disliked;
        this.isFavourite = data.is_favourite;
        this.photoLink = data.photo_link;
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
}
