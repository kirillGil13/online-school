import {ILeaderCourses, LeaderCoursesResponseType} from "@/entity/leaderCourses/leaderCourses.types";

export default class LeaderCourses implements ILeaderCourses {
    id: number;
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;
    constructor(course: LeaderCoursesResponseType) {
        this.id = course.id;
        this.title = course.title;
        this.cover = course.cover;
        this.totalLesson = course.totalLesson;
        this.lessonPassed = course.lessonPassed;
        this.duration = course.duration;
        this.rating = course.rating;
    }
    get progress(): number {
        return ( this.lessonPassed / this.totalLesson ) * 100;
    }
    fullDuration(): string {
        const h = Math.floor(this.duration / 3600);
        const m = Math.floor(this.duration % 3600 / 60);
        const s = Math.floor(this.duration % 3600 % 60);
        const hDisplay = h > 0 ? h + ':' : '';
        let mDisplay = m > 0 ? m + ':' : '';
        let sDisplay = s > 0 ? s.toString() : '';
        mDisplay = m < 10 ? '0' + mDisplay : mDisplay;
        sDisplay = s < 10 ? '0' + sDisplay : sDisplay;
        return hDisplay + mDisplay + sDisplay;
    }
}