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
    currentLessonId: number;
    level: ICourseLevels;
    constructor(data: CourseItemResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.cost = data.cost;
        this.account_id = data.account_id;//eslint-disable-line
        this.currentLessonId = data.currentLessonId;
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
        const type = '';
        // if (this.lessons[index].lessonPassed) {
        //     type = LessonsTypesEnum.DONE;
        // } else if (!this.lessons[index].lessonPassed && this.lessons[index].available) {
        //     type = LessonsTypesEnum.UN_DONE;
        // } else type = LessonsTypesEnum.LOCKED;
        // if (this.lessons[index].available && this.lessons[index].id.toString() === routeParam.toString()) {
        //     type = LessonsTypesEnum.IN_PROGRESS;
        // }
        return type;
    }
}
