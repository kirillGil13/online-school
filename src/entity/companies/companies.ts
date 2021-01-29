import {CompaniesResponseType, ICompaniesListItem} from '@/entity/companies/companies.types';
import {ILeader} from '@/entity/leader';
import {ICoursesListItem} from '@/entity/courses/courses.types';

export class Company implements ICompaniesListItem {
    id: number;
    name: string;
    avatar: string;
    description: string;
    courses: ICoursesListItem[];
    leaders: ILeader[];
    constructor(data: CompaniesResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.avatar = data.avatar;
        this.description = data.description;
        this.courses = data.courses;
        this.leaders = data.leaders;
    }
}
