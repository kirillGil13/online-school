import { IProvider } from './provider.types';
import { CandidatesRepository } from '@/repository/candidates';
import { PartnersRepository } from '@/repository/partners';
import {UserUpdateRepository} from '@/repository/userUpdate';
import {CoursesRepository} from '@/repository/courses';
import {CourseItemRepository} from '@/repository/courseItem';
import {LessonItemRepository} from '@/repository/lessonItem';
import {QuestionsRepository} from '@/repository/questions';
import {RightAnswersRepository} from '@/repository/rightAnswers/RightAnswers';
import {StatusesRepository} from '@/repository/statuses/Statuses';
import {InfoPackagesRepository} from '@/repository/infoPackages/InfoPackages';
import {StatusIconsRepository} from '@/repository/statusIcons/StatusIconsRepository';
import {CandidateItemRepository} from '@/repository/candidateItem/CandidateItemRepository';
import {VideoAccessRepository} from '@/repository/videoAccess/VideoAccessRepository';

export const provider = (): IProvider => ({
    candidates: new CandidatesRepository(),
    partners: new PartnersRepository(),
    userUpdate: new UserUpdateRepository(),
    courses: new CoursesRepository(),
    courseItem: new CourseItemRepository(),
    lessonItem: new LessonItemRepository(),
    questions: new QuestionsRepository(),
    rightAnswers: new RightAnswersRepository(),
    statuses: new StatusesRepository(),
    infoPackages: new InfoPackagesRepository(),
    statusIcons: new StatusIconsRepository(),
    candidateItem: new CandidateItemRepository(),
    videoAccess: new VideoAccessRepository(),
});

