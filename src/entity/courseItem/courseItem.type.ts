import {CourseLevelsResponseType, ICourseLevels} from '@/entity/courseLevels/courseLevels.types';

export interface ICourseItem {
    id: number;
    name: string;
    description: string;
    cost: number;
    account_id: number;
    isLiked: boolean;
    isDisliked: boolean;
    isFavourite: boolean;
    photoLink: string;
    lessons: ICourseLessons[];
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
    is_liked: boolean;
    is_disliked: boolean;
    is_favourite: boolean;
    photo_link: string;
    lessons: CourseLessonsResponseType[];
    level: CourseLevelsResponseType;
}
export type CourseLessonsResponseType = {
    id: number;
    name: string;
    status: string;
    number: number;
}
