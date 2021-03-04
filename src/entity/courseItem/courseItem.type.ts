import {CourseLevelsResponseType, ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

export interface ICourseItem {
    id: number;
    name: string;
    description: string;
    cost: number;
    account_id: number;
    lessons: ICourseLessons[];
    currentLessonId: number;
    level: ICourseLevels;
    resolveType(index: number, routeParam: string): string;
}
export interface ICourseLessons {
    id: number;
    name: string;
    status: string;
    number: number;
}

export type CourseItemResponseType = {
    id: number;
    name: string;
    description: string;
    cost: number;
    account_id: number;
    lessons: CourseLessonsResponseType[];
    currentLessonId: number;
    level: CourseLevelsResponseType;
}
export type CourseLessonsResponseType = {
    id: number;
    name: string;
    status: string;
    number: number;
}
