import {CourseItemResponseType, ICourseItem, ICourseLessons, ICourseMaterials} from './courseItem.type';
import { LessonsTypesEnum } from '@/entity/common/lessons.types';

export default class CourseItem implements ICourseItem {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
    currentLessonId: number;
    lessons: ICourseLessons[] = [];
    materials: ICourseMaterials[] = [];
    constructor(data: CourseItemResponseType) {
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
            });
        }
        for (let i = 0; i < data.materials.length; i++) {
            this.materials.push(data.materials[i]);
        }
    }
    resolveType(index: number, routeParam: string): string {
        let type = '';
        if (this.lessons[index].lessonPassed) {
            type = LessonsTypesEnum.DONE;
        } else if (!this.lessons[index].lessonPassed && this.lessons[index].available) {
            type = LessonsTypesEnum.UN_DONE;
        } else type = LessonsTypesEnum.LOCKED;
        if (this.lessons[index].available && this.lessons[index].id.toString() === routeParam.toString()) {
            type = LessonsTypesEnum.IN_PROGRESS;
        }
        return type;
    }
}
