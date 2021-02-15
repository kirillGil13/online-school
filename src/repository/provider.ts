import { IProvider } from './provider.types';
import { CandidatesRepository } from '@/repository/candidates';
import { PartnersRepository } from '@/repository/partners';
import {UserUpdateRepository} from '@/repository/userUpdate';
import {CoursesRepository} from '@/repository/courses';
import {CourseItemRepository} from '@/repository/courseItem';
import {LessonItemRepository} from '@/repository/lessonItem';
import {QuestionsRepository} from '@/repository/questions';
import {RightAnswersRepository} from '@/repository/rightAnswers/RightAnswers';

export const provider = (): IProvider => ({
    candidates: new CandidatesRepository(),
    partners: new PartnersRepository(),
    userUpdate: new UserUpdateRepository(),
    courses: new CoursesRepository(),
    courseItem: new CourseItemRepository(),
    lessonItem: new LessonItemRepository(),
    questions: new QuestionsRepository(),
    rightAnswers: new RightAnswersRepository(),
});

