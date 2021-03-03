import {ILeaderCourses, ILeaderCoursesAccount, LeaderCoursesResponseType} from './leaderCourses.types';

export default class LeaderCourses implements ILeaderCourses {
    id: number;
    name: string;
    photoLink: string;
    account: ILeaderCoursesAccount;
    countLessons: number;
    rating: number;
    constructor(data: LeaderCoursesResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.photoLink = data.photo_link;
        this.account = data.account;
        this.countLessons = data.count_lessons;
        this.rating = data.rating;
    }
    get fullName(): string {
        return this.account.name + ' ' + this.account.lastName;
    }
}