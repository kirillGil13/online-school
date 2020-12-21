import { CoursesListItemResponseType, ICoursesListItem } from './courses.types';

export default class CoursesListItem implements ICoursesListItem {
    id: number
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;
    hDisplay!: string;
    mDisplay!: string;
    sDisplay!: string;

    constructor(data: CoursesListItemResponseType) {
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
        const h = Math.floor(this.duration / 3600);
        const m = Math.floor(this.duration % 3600 / 60);
        const s = Math.floor(this.duration % 3600 % 60);
        this.hDisplay = h > 0 ? h + ':' : '';
        this.mDisplay = m > 0 ? m + ':' : '';
        this.sDisplay = s > 0 ? s.toString() : '';
        this.mDisplay = m < 10 ? '0' + this.mDisplay : this.mDisplay;
        this.sDisplay = s < 10 ? '0' + this.sDisplay : this.sDisplay;
        return this.hDisplay + this.mDisplay + this.sDisplay;
    }
}