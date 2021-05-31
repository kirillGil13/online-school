import { CourseLevelsResponseType, ICourseLevels } from '@/entity/courseLevels/courseLevels.types';

export interface ICourseItem {
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
    lessons: ICourseLessons[];
    level: ICourseLevels;
    countLikes: number;
    countDislikes: number;
    countViews: string;
    totalDuration: string;
    rating: number;
    isPurchased: boolean;
    canBeAddedToTeam: boolean;
    courseAvailable: boolean;
    resolveType(index: number, routeParam: string): string;
    resolveDescription(s: string): string;
}

export interface ICourseItemAuthor {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    photoLink: string;
    isLeader: boolean;
    description: string;
    is_email_confirmed: boolean;
    telegram: string;
    vk_link: string;
    instagram_link: string;
    facebook_link: string;
    site_link: string;
}

export interface ICourseLessons {
    id: number;
    name: string;
    status: string;
    number: number;
    duration: string;
}

export type CourseItemResponseType = {
    id: number;
    name: string;
    description: string;
    cost: number;
    author: CourseItemAuthorResponseType;
    account_id: number;
    is_liked: boolean;
    is_disliked: boolean;
    is_favourite: boolean;
    photo_link: string;
    lessons: CourseLessonsResponseType[];
    level: CourseLevelsResponseType;
    count_likes: number;
    count_views: number;
    count_dislikes: number;
    total_duration: number;
    rating: number;
    is_purchased: boolean;
    can_be_added_to_team: boolean;
}
export type CourseLessonsResponseType = {
    id: number;
    name: string;
    status: string;
    number: number;
    duration: number;
}

export type CourseItemAuthorResponseType = {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    photoLink: string;
    isLeader: boolean;
    description: string;
    is_email_confirmed: boolean;
    telegram: string;
    vk_link: string;
    instagram_link: string;
    facebook_link: string;
    site_link: string;
}
