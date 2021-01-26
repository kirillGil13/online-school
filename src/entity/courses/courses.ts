import { CoursesListItemResponseType, ICoursesListItem } from './courses.types';

export default class CoursesListItem implements ICoursesListItem {
    id: number
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;

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
        let h = 0;
        let m = 0;
        let s = 0;
        m = Math.floor(this.duration / 60);
        s = Math.floor(this.duration % 60);
        h = Math.floor(m / 60);
        m = m % 60;
        let hDisplay = '';
        let mDisplay = '';
        if (m < 10 && m > 0) {
            mDisplay = '0' + m + ':';
        } else if (m >= 10) {
            mDisplay = m + ':';
        } else mDisplay = '0:';
        let sDisplay = s > 0 ? s.toString() : '';
        hDisplay = h > 0 ? h + ':' : '';
        if (h === 0)
            hDisplay = '0:';
        sDisplay = s < 10 ? '0' + sDisplay : sDisplay;
        return hDisplay + mDisplay + sDisplay;
    }
}