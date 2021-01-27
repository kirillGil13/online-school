import { ICandidatesRepository } from '@/repository/candidates';
import { IPartnersRepository } from '@/repository/partners';
import {IUserUpdateRepository} from '@/repository/userUpdate';
import {ICoursesRepository} from '@/repository/courses';
import {ICourseItemRepository} from '@/repository/courseItem';
import {ILessonItemRepository} from '@/repository/lessonItem';
import {IQuestionsItemRepository} from '@/repository/questions';
import {IPresentationsRepository} from '@/repository/presentations';

export interface IProvider {
    candidates: ICandidatesRepository;
    partners: IPartnersRepository;
    userUpdate: IUserUpdateRepository;
    courses: ICoursesRepository;
    courseItem: ICourseItemRepository;
    lessonItem: ILessonItemRepository;
    questions: IQuestionsItemRepository;
    presentations: IPresentationsRepository;
}
