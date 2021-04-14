export interface ILessonItem {
    id: number;
    name: string;
    number: number;
    status: string;
    m3u8FileLink: string;
    description: string;
    photoLink: string;
    homeworkId: number;
    timeCode: number;
    duration: number;
    homeworkIsDone: boolean;
    homeworkType: string;
    files: ILessonItemFiles[];
    resolveDescription(s: string): string;
}
export interface ILessonItemFiles {
    name: string;
    fileLink: string;
}
export type LessonItemResponseType = {
    id: number;
    name: string;
    number: number;
    status: string;
    m3u8FileLink: string;
    description: string;
    photoLink: string;
    homeworkId: number;
    timeCode: number;
    duration: number;
    homeworkIsDone: boolean;
    homeworkType: string;
    files: LessonItemFilesResponseType[];
}
export type LessonItemFilesResponseType = {
    name: string;
    fileLink: string;
}
export type LessonItemTimeCodeRequestType = {
    time_code: number;
}
