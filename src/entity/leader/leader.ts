import { ILeader, ILeaderCourses, ILeaderUserInfo, LeaderResponseType } from './leader.types';

export default class Leader implements ILeader {
    id: number;
    direction: string;
    rating: string;
    createdAt: string;
    updatedAt: string;
    userInfo: ILeaderUserInfo;
    courses: ILeaderCourses[] = [];
    balance: string;
    totalCoursesViewsCount: number;
    constructor(data: LeaderResponseType) {
        this.id = data.id;
        this.direction = data.direction;
        this.rating = data.rating;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.userInfo = data.userInfo;
        for (let i = 0; i < data.courses.length; i++) {
            this.courses.push(data.courses[i]);
        }
        this.balance = data.balance;
        this.totalCoursesViewsCount = data.totalCoursesViewsCount;
    }
    get fullName(): string {
        return this.userInfo.name + ' ' + this.userInfo.surname;
    }
}
