export interface ILessonItem {
    id: number;
    name: string;
    number: number;
    status: string;
    m3u8FileLink: string;
    description: string;
    photoLink: string;
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
    files: LessonItemFilesResponseType[];
}
export type LessonItemFilesResponseType = {
    name: string;
    fileLink: string;
}