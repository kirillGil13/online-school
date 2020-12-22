export interface ILeader {
    id: number;
    direction: string;
    rating: string;
    createdAt: string;
    updatedAt: string;
    userInfo: ILeaderItemUserInfo;
    courses: ILeaderItemCourses[];
    balance: string;
    totalCoursesViewsCount: number;
    fullName: string;
}
export interface ILeaderItemUserInfo {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}
export interface ILeaderItemCourses {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
}
export type LeaderResponseType = {
    id: number;
    direction: string;
    rating: string;
    createdAt: string;
    updatedAt: string;
    userInfo: LeaderItemUserInfoResponseType;
    courses: LeaderItemCoursesResponseType[];
    balance: string;
    totalCoursesViewsCount: number;
}
export type LeaderItemUserInfoResponseType = {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}
export type LeaderItemCoursesResponseType = {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
}