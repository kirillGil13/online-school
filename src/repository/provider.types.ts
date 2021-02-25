import { ICandidatesRepository } from '@/repository/candidates';
import { IPartnersRepository } from '@/repository/partners';
import {IUserUpdateRepository} from '@/repository/userUpdate';
import {ICoursesRepository} from '@/repository/courses';
import {ICourseItemRepository} from '@/repository/courseItem';
import {ILessonItemRepository} from '@/repository/lessonItem';
import {IQuestionsItemRepository} from '@/repository/questions';
import {IRightAnswersRepository} from '@/repository/rightAnswers/RightAnswers.types';
import {IStatusesRepository} from '@/repository/statuses/Statuses.types';
import {IInfoPackagesRepository} from '@/repository/infoPackages/InfoPackages.types';

export interface IProvider {
    candidates: ICandidatesRepository;
    partners: IPartnersRepository;
    userUpdate: IUserUpdateRepository;
    courses: ICoursesRepository;
    courseItem: ICourseItemRepository;
    lessonItem: ILessonItemRepository;
    questions: IQuestionsItemRepository;
    rightAnswers: IRightAnswersRepository;
    statuses: IStatusesRepository;
    infoPackages: IInfoPackagesRepository;
}
