export interface IDefaultCourseItem{
    id: string | number;
    author: string;
    socials: ICoursSocials[];
    authorDescription: string,
}

export interface ICoursSocials {
    id: string,
    name: string
}