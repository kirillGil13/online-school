import {CourseItemResponseType, ICourseItem, ICourseLessons} from './courseItem.type';
import { LessonsTypesEnum } from '@/entity/common/lessons.types';

export default class CourseItem implements ICourseItem {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
    currentLessonId: number;
    lessons: ICourseLessons[] = [];
    constructor(data: CourseItemResponseType, paramLessonId: string) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.isTestingRequire = data.isTestingRequire;
        this.createdAt = data.createdAt;
        this.currentLessonId = data.currentLessonId;
        for (let i = 0; i < data.lessons.length; i++) {
            this.lessons.push({
                id: data.lessons[i].id,
                title: data.lessons[i].title,
                available: data.lessons[i].available,
                lessonPassed: data.lessons[i].lessonPassed,
                type(): string {
                    let type = '';
                    if (data.lessons[i].lessonPassed) {
                        type = LessonsTypesEnum.DONE;
                    } else if (!data.lessons[i].lessonPassed && data.lessons[i].available) {
                        type = LessonsTypesEnum.UN_DONE;
                    } else type = LessonsTypesEnum.LOCKED;
                    if (data.lessons[i].available && data.lessons[i].id.toString() === paramLessonId) {
                        type = LessonsTypesEnum.IN_PROGRESS;
                    }
                    return type;
                },
            });
        }
    }
}
