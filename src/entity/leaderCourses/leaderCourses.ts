import {ILeaderCourses, LeaderCoursesResponseType} from './leaderCourses.types';

export default class LeaderCourses implements ILeaderCourses {
    id: number;
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;
    constructor(data: LeaderCoursesResponseType) {
        this.id = data.id;
        this.title = data.title;
        this.cover = data.cover;
        this.totalLesson = data.totalLesson;
        this.lessonPassed = data.lessonPassed;
        this.duration = data.duration;
        this.rating = data.rating;
    }
    get progress(): number {
        return ( this.lessonPassed / this.totalLesson ) * 100;
    }
    fullDuration(): string {
        let h = 0;
        let m = 0;
        let s = 0;
        h = Math.floor(this.duration / 3600);
        m = Math.floor(this.duration % 3600 / 60);
        s = Math.floor(this.duration % 3600 % 60);
        let hDisplay = '';
        let mDisplay = m > 0 ? m + ':' : '';
        let sDisplay = s > 0 ? s.toString() : '';
        hDisplay = h > 0 ? h + ':' : '';
        mDisplay = m < 10 ? '0' + mDisplay : mDisplay;
        sDisplay = s < 10 ? '0' + sDisplay : sDisplay;
        return hDisplay + mDisplay + sDisplay;
    }
}