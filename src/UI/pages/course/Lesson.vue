<template>
  <div class="course" :style="{ width: $adaptive.isMobile ? '100%' : '', order: $adaptive.isMobile ? 2 : '' }">
    <v-responsive v-if="lessonLoaded && user.isSubscriptionActual" :aspect-ratio="16 / 9" class="rounded-block" content-class="course-container rounded-block">
      <div
          v-if="lesson.status === lessonTypes.LOCKED"
          class="course-locked rounded-block"
          :style="{ backgroundImage: 'url(' + lesson.photoLink + ')' }"
      >
        <div class="background rounded-block d-flex flex-column align-center justify-center pa-3">
          <h1 class="text-center" v-if="!$adaptive.isMobile">Вы не можете просмотреть этот урок</h1>
          <h2 class="text-center" v-else>Вы не можете просмотреть этот урок</h2>
          <h3 class="mt-4 text-center">
            Просмотрите предыдущий урок полностью, чтобы получить доступ к этому
          </h3>
          <Button @submit="$emit('moveToPrevious', lesson.number)">Перейти к предыдущему</Button>
        </div>
      </div>
      <div v-else>
        <h1 v-if="!isPlaying && !$adaptive.isMobile" class="abs">{{ lesson.name }}</h1>
        <video-player
            ref="videoPlayer"
            class="video-player vjs-custom-skin"
            :playsinline="true"
            :options="options"
            @timeupdate="onPlayerTimeupdate($event)"
            @ready="playerReadied"
            @play="onPlayerPlay"
            @pause="onPlayerPause"
            @loadeddata="onPlayerLoadeddata"
        />
      </div>
    </v-responsive>
    <v-responsive v-else-if="lessonLoaded && !user.isSubscriptionActual" :aspect-ratio="16 / 9"
                  content-class="course-container" @click="activatorSub = true">
      <v-img
          :aspect-ratio="16 / 9"
          width="100%"
          height="100%"
          class="course-cover rounded-block"
          :src="lesson.photoLink"
      >
        <div class="play-button"></div>
      </v-img>
    </v-responsive>
    <v-row :class="['course-video-row', $adaptive.isMobile ? 'justify-center' : '']" v-if="lessonLoaded">
      <Relation
          svg-name="Finger"
          class="mb-4"
          :class="isLiked && 'like-active'"
          :title="$adaptive.isMobile ? '' : 'Нравится'"
          @click="user.isSubscriptionActual ? $emit('handleLike', false) : activatorSub = true"
      />
      <Relation
          svg-class="svg-down"
          class="mb-4"
          :class="isDisliked && 'dislike-active'"
          svg-name="Finger"
          :title="$adaptive.isMobile ? '' : 'Не нравится'"
          @click="user.isSubscriptionActual ? $emit('handleDisLike', false) : activatorSub = true"
      />
      <Relation
          svg-name="Chosen"
          class="mb-4"
          :active="isFavourite"
          :title="$adaptive.isMobile ? '' : 'В избранное'"
          @click="handleFavourite"
      />
      <Relation
          svg-name="Message"
          class="mb-4"
          :title="$adaptive.isMobile ? '' : 'Обсудить'"
          @click="user.isSubscriptionActual ? discuss : ''"
      />
    </v-row>
    <v-row no-gutters>
      <template v-if="toggleOpenLikeDislikeForm" class="mb-4">
        <ReviewsFormLikesDislikes
            :form="formReview"
            :course="course"
            @setReview="$emit('setReview')"
            @cancelDislike="$emit('cancelDislike')"
            @setMark="$emit('setMark')"
        />
      </template>
    </v-row>
    <v-col v-if="!user.isSubscriptionActual" class="sub-card box-container d-flex flex-column justify-center align-center mb-4 "
           :class="[$adaptive.isMobile ? 'pa-4' : 'pa-6']">
      <Subscription/>
      <Button class="with_icon subs_button" @submit="activatorSub = true">
        <svg-icon name="Subs_Play_Btn" class="mr-2 svg-16"></svg-icon>
        Смотреть по подписке
      </Button>
    </v-col>
    <v-col :class="['box-container', $adaptive.isMobile ? 'pa-3' : 'pa-5']" v-if="lessonLoaded">
      <div class="desc__container">
        <div class="desc__container--title">Автор курса</div>
        <div class="desc__container--author d-flex flex-column">
          <div class="author--title d-flex justify-space-between align-center">
            <div @click="$emit('proceed', course.author.id)" :style="{cursor: 'pointer'}">
               <v-avatar class="mr-3" :color="course.author.photoLink ? '#F0F2F6' :randomColor(course.author.id % 10)">
                  <template v-slot:default v-if="course.author.photoLink">
                      <v-img :src="course.author.photoLink" alt="" />
                  </template>
                  <template v-else v-slot:default>
                      <span style="color: #fff" class="font-weight-bold">{{(course.author.name[0] + course.author.lastName[0]).toUpperCase()}}</span>
                  </template>
              </v-avatar>
              {{ course.author.name }}
              {{ course.author.lastName }}
            </div>

            <Socials :vk="course.author.vk_link" :facebook-link="course.author.facebook_link"
                     :instagram-link="course.author.instagram_link" :telegram="course.author.telegram"
                     :site-link="course.author.site_link"/>
          </div>
        </div>
      </div>
      <h5 style="color: #5f739c; font-weight: 600; font-size: 12px">ОПИСАНИЕ</h5>
      <div class="desc wrap-text" v-html="lesson.description"></div>
    </v-col>
    <v-col
        v-if="
                lessonLoaded &&
                (questions !== null || result !== null || resultFree !== null) &&
                lesson.homeworkId &&
                lesson.status !== lessonTypes.LOCKED
            "
        :class="['box-container mt-4', $adaptive.isMobile ? 'pa-3' : 'pa-5']"
    >
      <TestingComponent
          :form="testingForm"
          :result="result"
          :homework-is-done="lesson.homeworkIsDone"
          :last-lesson="lesson.number === lastLesson"
          :type="lesson.homeworkType"
          :free-form="freeTestForm"
          @send="send()"
          @moveToNextLesson="$emit('moveToNextLesson', lesson.number)"
          @passTestAgain="passTestAgain()"
          @reviewLesson="reviewLesson()"
          @writeMaster="writeMaster()"
          @sendFreeTest="sendFreeTest"
          @showForm="showForm"
      />
    </v-col>
    <Discussion
        :comments="comments"
        :selected-id="selectedId"
        :form="commentsForm"
        @postComment="postComment"
        @respond="respond"
        @handleLike="handleLike"
        :selects="selectsComments"
        @extraAction="extraAction"
        @extraActionAnswer="extraActionAnswer"
        @changeComment="changeComment"
        @changeAnswer="changeAnswer"
        @select="select"
        :selectsDiscussion="selectsDiscussion"
        :change-form="commentsChangeForm"
    />
    <v-col v-if="!commentsLoaded" class="mt-1 pa-0">
      <v-progress-linear :active="true" :indeterminate="true" color="primary accent-4"></v-progress-linear>
    </v-col>
    <Modal :activator="activator" @activatorChange="activatorChange">
      <template v-slot:content>
        <v-col class="pa-6">
          <h1 class="mx-auto my-0 text-center">
            Поздравляем,<br/>
            Вы прошли весь курс
          </h1>
          <Button small full-width class="secondary_blue mt-6" @submit="activator = false">Закрыть</Button>
        </v-col>
      </template>
    </Modal>
    <Modal :activator="activatorSub" :max-width="1000" @activatorChange="activatorSubChange" color="#F2F2F2">
      <template v-slot:content>
        <SubscribeFormalization/>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {TestingForm} from '@/form/testing/testingForm';
import {LessonItemStore} from '@/store/modules/LessonItem';
import {ILessonItem} from '@/entity/lessonItem/lessonItem.types';
import Lessons from '../../components/lessons/Lessons.vue';
import Button from '../../components/common/Button.vue';
import Relation from '../../components/common/Relation.vue';
import {QuestionsStore} from '@/store/modules/Questions';
import {ITesting} from '@/entity/testing/testing.types';
import {RightAnswersStore} from '@/store/modules/RightAnswers';
import {ITestingResult} from '@/entity/testingResult/testingResult.types';
import {VideoOptionsStore} from '../../../store/modules/VideoOptions';
import TestingResultComponent from '../../components/forms/testing/TestingResultComponents/TestingResultComponent.vue';
import TestingFormComponent from '../../components/forms/testing/TestingFormComponent.vue';
import TestingComponent from '../../components/forms/testing/TestingResultComponents/TestingComponent.vue';
import {LessonsTypesEnum} from '../../../entity/common/lessons.types';
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import Alert from '../../components/common/Alert.vue';
import Modal from '../../components/common/Modal.vue';
import Discussion from '../../components/discussion/Discussion.vue';
import {CommentsStore} from '../../../store/modules/Comments';
import {CommentsOrderByeNameEnum, CommentsSortNameEnum, IComments} from '../../../entity/comments/comments.types';
import {CommentsForm} from '../../../form/comments/commentsForm';
import {CommentTypesEnum} from '../../../entity/common/comment.types';
import {IDefaultCourseItem} from '@/entity/courseItem/courseItemDefault';
import {CourseItemStore} from '@/store/modules/CourseItem';
import ReviewsFormComponent from '../../components/forms/reviewForms/ReviewsFormComponent.vue';
import {ReviewsForm} from '@/form/reviews/reviewsForm';
import {ICourseItem} from '@/entity/courseItem/courseItem.type';
import {ISelect} from '../../../entity/select/select.types';
import {SelectsStore} from '../../../store/modules/Selects';
import {CommentsAnswersStore} from '../../../store/modules/CommentsAnswers';
import {CommentsChangeForm} from '../../../form/commentsChange/commentsChangeForm';
import {HomeworkTypesEnum} from '../../../entity/common/homeworkType.types';
import {FreeTestForm} from '../../../form/freeTest/freeTestForm';
import {ITestingFree} from '../../../entity/testingFree/testingFree.types';
import ReviewsFormLikesDislikes from '../../components/forms/reviewForms/ReviewsFormLikesDislikes.vue';
import Socials from '../../components/socials/Socials.vue';
import {IUser} from '../../../entity/user';
import {AuthStore} from '../../../store/modules/Auth';
import SubscribeFormalization from '../../components/subscribeFormalization/SubscribeFormalization.vue';
import Subscription from '../../components/subscription/Subscription.vue';

@Component({
  components: {
    Subscription,
    SubscribeFormalization,
    Socials,
    Discussion,
    Modal,
    Alert,
    TestingComponent,
    TestingResultComponent,
    Lessons,
    Button,
    TestingFormComponent,
    Relation,
    ReviewsFormComponent,
    ReviewsFormLikesDislikes
  },
})
export default class Lesson extends Vue {
  @Prop() readonly isLiked!: boolean;
  @Prop() readonly isDisliked!: boolean;
  @Prop() readonly isFavourite!: boolean;
  @Prop({default: false}) readonly lastLesson!: number;
  @Prop() readonly isSetReview!: boolean;
  @Prop() readonly formReview!: ReviewsForm;
  @Prop() readonly course!: ICourseItem;
  @Prop() readonly toggleOpenLikeDislikeForm!: boolean;
  //@ts-ignore
  selectedId = 0;
  sort = '';
  orderBy = '';
  skip = 0;
  limit = 100;
  interval!: NodeJS.Timeout;
  activator = false;
  activatorSub = false;
  alertType = AlertTypeEnum;
  lessonTypes = LessonsTypesEnum;
  testingForm = new TestingForm();
  commentsForm = new CommentsForm();
  isPlaying = false;
  play = false;
  commentsChangeForm = new CommentsChangeForm();
  freeTestForm = new FreeTestForm();

  @Watch('$route.params.lessonId')
  async onChangeRoute(): Promise<void> {
    if (this.$route.params.lessonId !== undefined) {
      CommentsStore.setCommentsToEmpty();
      await this.fetchData();
      this.startTimer();
    } else this.stopTimer();
  }

  @Watch('questionsLoaded')
  onChangeLoad(): void {
    if (this.questionsLoaded === true) {
      if (this.questions!.homeworkType === HomeworkTypesEnum.Test) {
        this.testingForm = new TestingForm(this.questions!.tests);
        this.testingForm.activeStep[0].active = true;
      }
    }
  }

  @Watch('lessonLoaded')
  async onLessonLoaded(): Promise<void> {
    if (this.lessonLoaded === true) {
      this.passFiles();
    }
  }

  get user(): IUser | null {
    return AuthStore.user;
  }

  get lesson(): ILessonItem | null {
    return LessonItemStore.lessonItem;
  }

  get questions(): ITesting | null {
    return QuestionsStore.questions;
  }

  get questionsLoaded(): boolean {
    return QuestionsStore.questionsLoaded;
  }

  get lessonLoaded(): boolean {
    return LessonItemStore.lessonLoaded;
  }

  get options(): any {
    return VideoOptionsStore.options;
  }

  get result(): ITestingResult | null {
    return RightAnswersStore.rightAnswers;
  }

  get comments(): IComments[] {
    return CommentsStore.comments;
  }

  get commentsLoaded(): boolean {
    return CommentsStore.commentsLoaded;
  }

  get defaultCourse(): IDefaultCourseItem {
    return CourseItemStore.courseItemDefault;
  }

  startTimer(): void {
    // this.interval = setTimeout(() => {
    //   console.log(this.skip);
    //     CommentsStore.fetchAll({ route: this.$route.params.lessonId, pagination: {skip: this.skip, limit: this.limit} });
    // }, 10000);
  }

  get resultFree(): ITestingFree | null {
    return RightAnswersStore.answerFree;
  }

  stopTimer(): void {
    clearTimeout(this.interval);
  }


  passFiles(): void {
    this.$emit('passFile', this.lesson!.files);
  }

  playerReadied(player: any): void {
    this.isPlaying = false;
    player.currentTime(this.lesson!.timeCode);
  }

  onPlayerPlay(): void {
    this.isPlaying = true;
  }

  onPlayerPause(): void {
    this.isPlaying = false;
  }

  onPlayerLoadeddata(): void {
    console.log('player loadedData');
  }

  handleFavourite(): void {
    this.$emit('handleFavourite');
  }

  activatorChange(act: boolean): void {
    this.activator = act;
  }

  activatorSubChange(act: boolean): void {
    this.activatorSub = act;
  }

  respond(data: any): void {
    this.commentsForm.commentId = data.id;
    if (!data.index) {
      this.commentsForm.message = this.comments.find((item) => item.id === data.id)!.fullName + ', ';
      this.commentsForm.author = this.comments.find((item) => item.id === data.id)!.fullName;
    } else {
      this.commentsForm.message =
          this.comments.find((item) => item.id === data.id)!.answers[data.index].fullName + ', ';
      this.commentsForm.author = this.comments.find((item) => item.id === data.id)!.answers[data.index].fullName;
    }
    document.getElementById('message')!.focus();
  }

  beforeDestroy(): void {
    this.stopTimer();
    CommentsStore.setCommentsToEmpty();
  }

  fetchComments = (): void => {
    const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
    const sort = this.sortComments;
    if (bottomOfWindow && this.comments.length % 100 === 0) {
      const skip = this.comments.length;
      setTimeout(e => {
        CommentsStore.fetchAll({
          route: this.$route.params.lessonId.toString(),
          pagination: {skip: skip, limit: 100, sort: sort, orderBy: this.orderBy},
          scroll: true
        });
      }, 300);
    }
  };

  randomColor(i: number) {
      const COLORS = [
      '#56CCF2',
      '#BB6BD9',
      '#6FCF97',
      '#F2C94C',
      '#967CBA',
      '#FF9960',
      '#566FF2',
      '#FF5733',
      '#FF89C9',
      '#56F2DF',
      '#F38460',
      '#939ED6',
      '#F271A0',
      '#2ABF93',
      '#FF9C9C',
      '#6EC1F0',
      '#3B4244'
      ];
      return COLORS[i || 0];
  }
  
  get sortComments(): string {
    return this.sort;
  }

  get selectsComments(): ISelect[] {
    return SelectsStore.selectsComments;
  }

  get selectsDiscussion(): ISelect[] {
    return SelectsStore.selectsDiscussion;
  }

  discuss(): void {
    const item = document.getElementById('message')!;
    item.scrollIntoView();
    item.focus();
  }

  showForm(): void {
    this.freeTestForm.passed = false;
  }

  mounted(): void {
    window.addEventListener('scroll', this.fetchComments);
  }

  async select(data: any): Promise<void> {
    this.selectedId = data.statusId;
    if (data.statusId === 1 || data.statusId === 2) {
      this.sort = CommentsSortNameEnum.CREATEDAT;
      if (data.statusId === 1) {
        this.orderBy = CommentsOrderByeNameEnum.DESC;
      } else this.orderBy = CommentsOrderByeNameEnum.ASC;
    } else this.sort = CommentsSortNameEnum.RATING;
    await CommentsStore.fetchAll({
      route: this.$route.params.lessonId,
      pagination: {limit: 100, sort: this.sort, orderBy: this.orderBy}
    });
  }

  async fetchData(): Promise<void> {
    this.sort = CommentsSortNameEnum.RATING;
    await LessonItemStore.fetchData(this.$route.params.lessonId.toString());
    await CommentsStore.fetchAll({
      route: this.$route.params.lessonId,
      pagination: {limit: 100, sort: this.sort}
    });
    this.commentsForm = new CommentsForm();
    this.commentsForm.lessonId = parseInt(this.$route.params.lessonId);
    if (this.lessonLoaded && this.user!.isSubscriptionActual) {
      VideoOptionsStore.handleVideo({
        src: this.lesson!.m3u8FileLink,
        poster: this.lesson!.photoLink,
        currentTime: this.lesson!.timeCode,
      });

      if (this.lesson!.homeworkId) {
        if (this.lesson!.homeworkIsDone) {
          if (this.lesson!.homeworkType === HomeworkTypesEnum.Test) {
            await RightAnswersStore.fetchAll(this.lesson!.homeworkId);
          } else {
            await QuestionsStore.fetchAll(this.lesson!.homeworkId);
            await RightAnswersStore.fetchFreeResult(this.lesson!.homeworkId);
            this.freeTestForm.setFormData(
                this.lesson!.homeworkId,
                this.questions!.question!,
                true,
                this.resultFree!.answer
            );
          }
        } else {
          await QuestionsStore.fetchAll(this.lesson!.homeworkId);
          if (this.questions!.homeworkType === HomeworkTypesEnum.Test) {
            this.testingForm = new TestingForm(this.questions!.tests);
            this.testingForm.activeStep[0].active = true;
          } else {
            this.freeTestForm.setFormData(this.lesson!.homeworkId!, this.questions!.question!, false, '');
          }
        }
      }
    }
  }

  async extraAction(id: number, index: number): Promise<void> {
    if (index === 1) {
      if (await CommentsStore.deleteComment(id.toString())) {
        await CommentsStore.fetchAll({
          route: this.$route.params.lessonId,
          pagination: {limit: 100, sort: this.sort, orderBy: this.orderBy}
        });
      }
    } else {
      this.commentsChangeForm.setFormData(this.comments!.find((item) => item.id === id)!.message);
      this.commentsChangeForm.commentId = id;
      this.commentsChangeForm.showChangeComment = true;
    }
  }

  async extraActionAnswer(answerId: number, commentId: number, index: number): Promise<void> {
    if (index === 1) {
      if (await CommentsAnswersStore.deleteAnswer(answerId.toString())) {
        await CommentsStore.fetchAll({
          route: this.$route.params.lessonId,
          pagination: {limit: 100, sort: this.sort, orderBy: this.orderBy}
        });
      }
    } else {
      this.commentsChangeForm.setFormData(
          this.comments!.find((item) => item.id === commentId)!.answers.find((item) => item.id === answerId)!
              .message
      );
      this.commentsChangeForm.answerId = answerId;
      this.commentsChangeForm.showChangeAnswer = true;
    }
  }

  async changeComment(id: number): Promise<void> {
    if (await this.commentsChangeForm.submit(CommentsStore.patchComment, id.toString())) {
      this.comments.find((item) => item.id === id)!.message = this.commentsChangeForm.message;
      this.commentsChangeForm.showChangeComment = false;
    }
  }

  async changeAnswer(data: any): Promise<void> {
    if (await this.commentsChangeForm.submit(CommentsAnswersStore.patchAnswer, data.answer.toString())) {
      this.comments!.find((item) => item.id === data.comment)!.answers.find(
          (item) => item.id === data.answer
      )!.message = this.commentsChangeForm.message;
      this.commentsChangeForm.showChangeAnswer = false;
    }
  }

  async created(): Promise<void> {
    if (this.$route.params.lessonId) {
      this.startTimer();
      await this.fetchData();
    }
  }

  async onPlayerTimeupdate(e: any): Promise<void> {
    if (
        parseInt(e.cache_.currentTime) % 5 === 0 &&
        e.cache_.currentTime % 1 > 0.75 &&
        parseInt(e.cache_.currentTime) !== 0
    ) {
      await LessonItemStore.setTimeCode({
        lessonId: this.$route.params.lessonId,
        timeCode: {time_code: parseInt(e.cache_.currentTime)}, //eslint-disable-line
      });
    }
  }

  async passTestAgain(): Promise<void> {
    await QuestionsStore.fetchAll(this.lesson!.homeworkId);
    this.testingForm = new TestingForm(this.questions!.tests);
    this.testingForm.activeStep[0].active = true;
    this.$set(this.lesson!, 'homeworkIsDone', false);
    this.$set(this.lesson!, 'homeworkId', this.questions!.id);
  }

  async reviewLesson(): Promise<void> {
    await LessonItemStore.setTimeCode({
      lessonId: this.$route.params.lessonId,
      timeCode: {time_code: 0}, //eslint-disable-line
    });
    await LessonItemStore.fetchData(this.$route.params.lessonId);
    (this.$refs.videoPlayer as any).player.currentTime(this.lesson!.timeCode);
    (this.$refs.videoPlayer as any).player.play();
  }

  async postComment(): Promise<void> {
    if (this.commentsForm.commentId) {
      if (await this.commentsForm.submit(CommentsAnswersStore.postAnswer)) {
        await CommentsStore.fetchAll({
          route: this.$route.params.lessonId,
          pagination: {limit: 100, sort: this.sort, orderBy: this.orderBy}
        });
        document.getElementById(`comment${this.commentsForm.commentId}`)!.scrollIntoView();
        this.commentsForm = new CommentsForm();
        this.commentsForm.lessonId = parseInt(this.$route.params.lessonId);
      }
    } else {
      if (await this.commentsForm.submit(CommentsStore.postComment)) {
        await CommentsStore.fetchAll({
          route: this.$route.params.lessonId,
          pagination: {limit: 100, sort: this.sort, orderBy: this.orderBy}
        });
        this.commentsForm = new CommentsForm();
        this.commentsForm.lessonId = parseInt(this.$route.params.lessonId);
        // if (this.lessonLoaded) {
        //   VideoOptionsStore.handleVideo({
        //     src: this.lesson!.m3u8FileLink,
        //     poster: this.lesson!.photoLink,
        //     currentTime: this.lesson!.timeCode,
        //   });
        //   if (this.lesson!.homeworkIsDone) {
        //     await RightAnswersStore.fetchAll(this.lesson!.homeworkId);
        //   } else if (this.lesson!.homeworkId) {
        //     await QuestionsStore.fetchAll(this.lesson!.homeworkId);
        //     this.testingForm = new TestingForm(this.questions!.tests);
        //     this.testingForm.activeStep[0].active = true;
        //   }
        // }
      }
    }
  }

  async handleLike(data: any): Promise<void> {
    if (data.type === CommentTypesEnum.Comment) {
      if (this.comments.find((item) => item.id === data.id)!.isLiked !== null) {
        await CommentsStore.deleteLikeDislikeComment(data.id.toString());
        if (this.comments.find((item) => item.id === data.id)!.isLiked && data.kind === 'dislike') {
          await CommentsStore.setLikeDislikeComment({
            data: {is_like: data.like},
            route: data.id.toString(),
          }); //eslint-disable-line
        }
        if (!this.comments.find((item) => item.id === data.id)!.isLiked && data.kind === 'like') {
          await CommentsStore.setLikeDislikeComment({
            data: {is_like: data.like},
            route: data.id.toString(),
          }); //eslint-disable-line
        }
        await CommentsStore.fetchAll({
          route: this.$route.params.lessonId,
          pagination: {limit: 100, sort: this.sort, orderBy: this.orderBy}
        });
      } else {
        await CommentsStore.setLikeDislikeComment({data: {is_like: data.like}, route: data.id.toString()}); //eslint-disable-line
        await CommentsStore.fetchAll({
          route: this.$route.params.lessonId,
          pagination: {limit: 100, sort: this.sort, orderBy: this.orderBy}
        });
      }
    } else {
      if (
          this.comments.find((item) => item.id === data.id)!.answers.find((item) => item.id === data.answerId)!.isLiked !== null
      ) {
        await CommentsAnswersStore.deleteLikeDislikeAnswer(data.answerId.toString());
        if (
            !this.comments
                .find((item) => item.id === data.id)!
                .answers.find((item) => item.id === data.answerId)!.isLiked &&
            data.kind === 'like'
        ) {
          await CommentsAnswersStore.setLikeDislikeAnswer({
            data: {is_like: data.like}, //eslint-disable-line
            route: data.answerId.toString(),
          });
        }
        if (
            this.comments
                .find((item) => item.id === data.id)!
                .answers.find((item) => item.id === data.answerId)!.isLiked &&
            data.kind === 'dislike'
        ) {
          await CommentsAnswersStore.setLikeDislikeAnswer({
            data: {is_like: data.like}, //eslint-disable-line
            route: data.answerId.toString(),
          });
        }
        await CommentsStore.fetchAll({
          route: this.$route.params.lessonId,
          pagination: {limit: 100, sort: this.sort, orderBy: this.orderBy}
        });
      } else {
        await CommentsAnswersStore.setLikeDislikeAnswer({
          data: {is_like: data.like},
          route: data.answerId.toString(),
        }); //eslint-disable-line
        await CommentsStore.fetchAll({
          route: this.$route.params.lessonId,
          pagination: {limit: 100, sort: this.sort, orderBy: this.orderBy}
        });
      }
    }
  }

  async send(): Promise<void> {
    await RightAnswersStore.postAnswers({
      answers: this.testingForm.results,
      param: this.lesson!.homeworkId.toString(),
    });
    this.$emit('send');
    await this.fetchData();
    if (this.lesson!.number === this.lastLesson && this.result!.isDone) {
      this.activator = true;
    }
  }

  async sendFreeTest(): Promise<void> {
    await RightAnswersStore.postFreeAnswer({
      data: this.freeTestForm.getFormData(),
      route: this.lesson!.homeworkId.toString(),
    });
    await this.fetchData();
  }
}
</script>

<style lang="scss">
.course-video-row {
  margin: 16px 0 0 24px;
}

.materials {
  margin-top: 66px;
}

.like-active {
  .icon-container {
    background: rgba(39, 174, 96, 0.12);

    svg path {
      fill: #27ae60;
    }
  }
}

.dislike-active {
  .icon-container {
    background: rgba(230, 70, 70, 0.12);

    svg path {
      fill: #e64646;
    }
  }
}

.text-area {
  width: 100%;
  resize: none;
  border: 1px solid #f2f2f2 !important;
}
</style>
