export interface ILeader {
    id: number;
    direction: string;
    rating: string;
    createdAt: string;
    updatedAt: string;
    userInfo: ILeaderUserInfo;
    courses: ILeaderCourses[];
    balance: string;
    totalCoursesViewsCount: number;
    fullName: string;
}
export interface ILeaderUserInfo {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}
export interface ILeaderCourses {
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
    userInfo: LeaderUserInfoResponseType;
    courses: LeaderCoursesResponseType[];
    balance: string;
    totalCoursesViewsCount: number;
}
export type LeaderUserInfoResponseType = {
    id: number;
    name: string;
    surname: string;
    avatar: string;
}
export type LeaderCoursesResponseType = {
    id: number;
    title: string;
    description: string;
    isTestingRequire: boolean;
    createdAt: string;
}