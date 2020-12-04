import { CoursesListItemRequestType, ICoursesListItem } from './courses.types';

export default class CoursesListItem implements ICoursesListItem {
    id: number
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;

    constructor(data: CoursesListItemRequestType) {
        this.id = data.id;
        this.title = data.title;
        this.cover = data.cover;
        this.totalLesson = data.totalLesson;
        this.lessonPassed = data.lessonPassed;
        this.duration = data.duration;
        this.rating = data.rating;
    }
    get progress():number {
        return ( this.lessonPassed / this.totalLesson ) * 100;
    }
}