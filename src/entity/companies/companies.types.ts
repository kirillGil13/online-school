import {ILeader} from '@/entity/leader';
import {ICoursesListItem} from '@/entity/courses/courses.types';

export interface ICompaniesListItem {
    id: number;
    name: string;
    avatar: string;
    description: string;
    leaders: ILeader[];
    courses: ICoursesListItem[];
}

export type CompaniesResponseType = {
    id: number;
    name: string;
    avatar: string;
    description: string;
    leaders: ILeader[];
    courses: ICoursesListItem[];
}
