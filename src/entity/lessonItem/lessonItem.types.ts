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
    files: ILessonItemFiles[];
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
    time_code: number;
    files: LessonItemFilesResponseType[];
}
export type LessonItemFilesResponseType = {
    name: string;
    fileLink: string;
}