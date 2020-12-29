export interface ILeaderCourses {
    id: number;
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;
}
export type LeaderCoursesResponseType = {
    id: number;
    title: string;
    cover: string;
    totalLesson: number;
    lessonPassed: number;
    duration: number;
    rating: number;
}