export interface ILeaderCourses {
    id: number;
    name: string;
    photoLink: string;
    account: ILeaderCoursesAccount;
    countLessons: number;
    rating: number;
    fullName: string;
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
    count_lessons: number;
    rating: number;
}
export type LeaderCoursesAccountResponseType = {
    id: number;
    name: string;
    lastName: string;
    photoLink: string;
}