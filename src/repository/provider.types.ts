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
import {IStatusIconsRepository} from '@/repository/statusIcons/StatusIconsRepository.types';
import {ICandidateItemRepository} from '@/repository/candidateItem/CandidateItemRepository.types';
import {IVideoAccessRepository} from '@/repository/videoAccess/VideoAccessRepository.types';
import {IProfilePictureRepository} from '@/repository/profilePicture/ProfilePicture.types';
import {ILeadersRepository} from '@/repository/leaders/LeadersRepository.types';
import {ILeaderCoursesRepository} from '@/repository/leaderCourses/LeaderCoursesRepository.types';
import {ICourseLevelsRepository} from '@/repository/courseLevels/CourseLevels.types';
import {IRelationRepository} from '@/repository/relation/RelationRepository.types';

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
    statusIcons: IStatusIconsRepository;
    candidateItem: ICandidateItemRepository;
    videoAccess: IVideoAccessRepository;
    profilePicture: IProfilePictureRepository;
    leaders: ILeadersRepository;
    leaderCourses: ILeaderCoursesRepository;
    courseLevels: ICourseLevelsRepository;
    relation: IRelationRepository,
}
