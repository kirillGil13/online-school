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
import {PictureUploadRepository} from '@/repository/pictureUpload/PictureUpload';
import {LeadersRepository} from '@/repository/leaders/LeadersRepository';
import {LeaderCoursesRepository} from '@/repository/leaderCourses/LeaderCoursesRepository';
import {CourseLevelsRepository} from '@/repository/courseLevels/CourseLevels';
import {RelationRepository} from '@/repository/relation/RelationRepository';
import {CoursesFavouriteRepository} from '@/repository/corsesFavourite/CoursesFavouriteRepository';
import {MyStatisticRepository} from '@/repository/myStatistic/MyStatisticRepository';
import {MailRepository} from '@/repository/mail/MailRepository';
import {CommentsRepository} from '@/repository/comments/CommentsRepository';
import {LeaderItemRepository} from '@/repository/leaderItem/LeaderItemRepository';
import {RecoverRepository} from '@/repository/recover/RecoverRepository';
import {DialogsRepository} from '@/repository/dialogs/DialogsRepository';
import {MessagesRepository} from '@/repository/messages/MessagesRepository';
import {ConfirmEmailRepository} from '@/repository/confirmEmail/ConfirmEmailRepository';
import {ChangeEmailRepository} from '@/repository/changeEmail/ChangeEmailRepository';
import { ReviewsRepository } from './reviews/ReviewsRepository';
import {CommentsAnswersRepository} from '@/repository/commentsAnswers/CommentsAnswersRepository';
import {SubscriptionRepository} from '@/repository/subscription/SubscriptionRespository';
import {PurchaseRepository} from '@/repository/purchase/PurchaseRepository';
<<<<<<< HEAD
import { TodoRepository } from './todo/TodoRepository';
=======
import {ProfileDocsRepository} from '@/repository/profileDocs/ProfileDocsRepository';
import WithdrawRepository from '@/repository/withdraw/WithdrawRepository';
>>>>>>> dev

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
    pictureUpload: new PictureUploadRepository(),
    leaders: new LeadersRepository(),
    leaderCourses: new LeaderCoursesRepository(),
    courseLevels: new CourseLevelsRepository(),
    relation: new RelationRepository(),
    coursesFavourite: new CoursesFavouriteRepository(),
    myStatistic: new MyStatisticRepository(),
    mail: new MailRepository(),
    comments: new CommentsRepository(),
    leaderItem: new LeaderItemRepository(),
    recover: new RecoverRepository(),
    dialogs: new DialogsRepository(),
    messages: new MessagesRepository(),
    confirmEmail: new ConfirmEmailRepository(),
    changeEmail: new ChangeEmailRepository(),
    reviews: new ReviewsRepository(),
    commentsAnswers: new CommentsAnswersRepository(),
    subscriptions: new SubscriptionRepository(),
    purchase: new PurchaseRepository(),
<<<<<<< HEAD
    todo: new TodoRepository()
=======
    profileDocs: new ProfileDocsRepository(),
    withdraw: new WithdrawRepository(),
>>>>>>> dev
});

