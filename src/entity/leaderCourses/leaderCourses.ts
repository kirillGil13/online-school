import {ILeaderCourses, ILeaderCoursesAccount, LeaderCoursesResponseType} from './leaderCourses.types';

export default class LeaderCourses implements ILeaderCourses {
    id: number;
    name: string;
    photoLink: string;
    account: ILeaderCoursesAccount;
    countLessons: number;
    rating: number;
    countDoneLessons: number;
    countViews: number;
    constructor(data: LeaderCoursesResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.photoLink = data.photo_link;
        this.account = data.account;
        this.countLessons = data.count_lessons;
        this.rating = data.rating;
        this.countDoneLessons = data.count_done_lessons;
        this.countViews = data.count_views;
    }
    get fullName(): string {
        return this.account.name + ' ' + this.account.lastName;
    }

    lessonsCount(): string {
        return this.countLessons + ' ' + this.declination(this.countLessons, ['урок', 'урока', 'уроков'])
    }

    declination(number: number, titles: string[]): string {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    get progress(): number {
        return (this.countDoneLessons / this.countLessons) * 100;
    }
}
