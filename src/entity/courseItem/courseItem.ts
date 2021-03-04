import {CourseItemResponseType, ICourseItem, ICourseLessons} from './courseItem.type';
import { LessonsTypesEnum } from '@/entity/common/lessons.types';
import {ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

export default class CourseItem implements ICourseItem {
    id: number;
    name: string;
    description: string;
    cost: number;
    account_id: number;
    lessons: ICourseLessons[] = [];
    level: ICourseLevels;
    constructor(data: CourseItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.cost = data.cost;
        this.account_id = data.account_id;//eslint-disable-line
        this.level = data.level;
        for (let i = 0; i < data.lessons.length; i++) {
            this.lessons.push({
                id: data.lessons[i].id,
                name: data.lessons[i].name,
                status: data.lessons[i].status,
                number: data.lessons[i].number,
            });
        }
    }
    resolveType(index: number, routeParam: string): string {
        let type = '';
        switch (this.lessons[index].status) {
            case LessonsTypesEnum.DONE: type = LessonsTypesEnum.DONE;
            case LessonsTypesEnum.UN_DONE: type = LessonsTypesEnum.UN_DONE;
            case LessonsTypesEnum.LOCKED: type = LessonsTypesEnum.LOCKED;
        }
        if (type !== LessonsTypesEnum.LOCKED && this.lessons[index].id.toString() === routeParam.toString()) {
            type = LessonsTypesEnum.IN_PROGRESS;
        }
        return type;
    }
}
