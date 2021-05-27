export interface ILeaderCourses {
    id: number;
    name: string;
    photoLink: string;
    account: ILeaderCoursesAccount;
    countLessons: number;
    rating: number;
    fullName: string;
    countDoneLessons: number;
    countViews: string;
    lessonsCount(): string;
    progress: number;
}
export interface ILeaderCoursesAccount {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
}
export type LeaderCoursesResponseType = {
    id: number;
    name: string;
    photo_link: string;
    account: LeaderCoursesAccountResponseType;
    count_done_lessons: number;
    count_lessons: number;
    count_views: number;
    rating: number;
}
export type LeaderCoursesAccountResponseType = {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
}

