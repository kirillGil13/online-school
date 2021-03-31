<template>
  <div class="course" :style="{width: $adaptive.isMobile ? '100%' : '', order: $adaptive.isMobile ? 2 : ''}">
    <v-responsive v-if="lessonLoaded" :aspect-ratio="16/9" content-class="course-container">
      <div v-if="lesson.status === lessonTypes.LOCKED"
           class="course-locked"
           :style="{backgroundImage: 'url(' + lesson.photoLink + ')'}">
        <div class="background d-flex flex-column align-center justify-center pa-3">
          <h1 class="text-center" v-if="!$adaptive.isMobile">Вы не можете просмотреть этот урок</h1>
          <h2 class="text-center" v-else>Вы не можете просмотреть этот урок</h2>
          <h3 class="mt-4 text-center">Выполните задания из предыдущего урока, чтобы получить доступ к этому</h3>
          <Button @submit="$emit('moveToPrevious', lesson.number)">Перейти к предыдущему</Button>
        </div>
      </div>
      <div v-else>
        <h1 v-if="!isPlaying" class="abs">{{ lesson.name }}</h1>
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
    <v-row :class="['course-video-row', $adaptive.isMobile ? 'justify-center' : '']" v-if="lessonLoaded">
      <Relation svg-name="Finger" :active="isLiked" :title="$adaptive.isMobile ? '' : 'Нравится'"
                @click="$emit('handleLike', true)"/>
      <Relation svg-class="svg-down" :active="isDisliked" svg-name="Finger" :title="$adaptive.isMobile ? '' : 'Не нравится'"
                @click="$emit('handleDisLike', false)"/>
      <Relation svg-name="Chosen" :active="isFavourite" :title="$adaptive.isMobile ? '' : 'В избранное'"
                @click="handleFavourite"/>
      <Relation svg-name="Message" :title="$adaptive.isMobile ? '' : 'Обсудить'" @click="discuss"/>
    </v-row>
    <v-col :class="['box-container', $adaptive.isMobile ? 'pa-3' : 'pa-5']" v-if="lessonLoaded">
      <h5>ОПИСАНИЕ</h5>
      <span class="desc">{{ lesson.description }}</span>
    </v-col>
    <v-col
        v-if="lessonLoaded && (questions !== null || result !== null) && lesson.homeworkId && lesson.status !== lessonTypes.LOCKED"
        :class="['box-container mt-4', $adaptive.isMobile ? 'pa-3' : 'pa-5']">
      <TestingComponent
          :form="testingForm"
          :result="result"
          :homework-is-done="lesson.homeworkIsDone"
          :last-lesson="lesson.number === lastLesson"
          @send="send()"
          @moveToNextLesson="$emit('moveToNextLesson', lesson.number)"
          @passTestAgain="passTestAgain()"
          @reviewLesson="reviewLesson()"
          @writeMaster="writeMaster()"
      />
    </v-col>
    <Discussion :comments="comments" :form="commentsForm" @postComment="postComment"
                @respond="respond" @handleLike="handleLike" @handleDislike="handleDislike"/>
    <v-col v-if="!commentsLoaded" class="mt-1 pa-0">
        <v-progress-linear
            :active="true"
            :indeterminate="true"
            color="primary accent-4"
        ></v-progress-linear>
    </v-col>
    <Modal :activator="activator" @activatorChange="activatorChange">
      <template v-slot:content>
        <v-col class="pa-6">
          <h1 class="mx-auto my-0 text-center">Поздравляем,<br> Вы прошли весь курс</h1>
          <Button small full-width class="secondary_blue mt-6" @submit="activator = false">Закрыть</Button>
        </v-col>
      </template>
    </Modal>
    <Alert :show="show" :type="isFavourite ? alertType.Success : alertType.Error"
           :text="isFavourite ? 'Курс успешно добавлен в избранное' : 'Курс успешно удален из избранного'"
           @show="showAlert"/>
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
import TestingFormComponent from '../../components/forms/testing/TestingFormComponent.vue'
import TestingComponent from '../../components/forms/testing/TestingResultComponents/TestingComponent.vue';
import {LessonsTypesEnum} from '../../../entity/common/lessons.types';
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import Alert from '../../components/common/Alert.vue';
import Modal from '../../components/common/Modal.vue';
import Discussion from '../../components/discussion/Discussion.vue';
import {CommentsStore} from '../../../store/modules/Comments';
import {IComments} from '../../../entity/comments/comments.types';
import {CommentsForm} from '../../../form/comments/commentsForm';
import {CommentTypesEnum} from '../../../entity/common/comment.types';

@Component({
  components: {
    Discussion,
    Modal,
    Alert,
    TestingComponent,
    TestingResultComponent,
    Lessons,
    Button,
    TestingFormComponent,
    Relation,
  },
})
export default class  Lesson extends Vue {
  @Prop() readonly isLiked!: boolean;
  @Prop() readonly isDisliked!: boolean;
  @Prop() readonly isFavourite!: boolean;
  @Prop({default: false}) readonly lastLesson!: number;
  interval = setInterval(() => {
    return '';
  }, 0);
  activator = false;
  alertType = AlertTypeEnum;
  show = false;
  lessonTypes = LessonsTypesEnum;
  testingForm = new TestingForm();
  commentsForm = new CommentsForm();
  isPlaying = false;
  play = false;

  @Watch('$route.params.lessonId')
  async onChangeRoute(): Promise<void> {
    CommentsStore.setCommentsToEmpty();
    await this.fetchData();
    this.interval = setInterval(() => CommentsStore.fetchAll(this.$route.params.lessonId), 20000);
  }

  @Watch('questionsLoaded')
  onChangeLoad(): void {
    if (this.questionsLoaded === true) {
      this.testingForm = new TestingForm(this.questions!.tests);
      this.testingForm.activeStep[0].active = true;
    }
  }

  @Watch('lessonLoaded')
  async onLessonLoaded(): Promise<void> {
    if (this.lessonLoaded === true) {
      this.passFiles();
    }
  }

  async fetchData(): Promise<void> {
    await LessonItemStore.fetchData(this.$route.params.lessonId.toString());
    await CommentsStore.fetchAll(this.$route.params.lessonId);
    this.commentsForm = new CommentsForm();
    this.commentsForm.lessonId = parseInt(this.$route.params.lessonId);
    if (this.lessonLoaded) {
      VideoOptionsStore.handleVideo({
        src: this.lesson!.m3u8FileLink,
        poster: this.lesson!.photoLink,
        currentTime: this.lesson!.timeCode
      });
      if (this.lesson!.homeworkIsDone) {
        await RightAnswersStore.fetchAll(this.lesson!.homeworkId);
      } else {
        await QuestionsStore.fetchAll(this.lesson!.homeworkId);
        this.testingForm = new TestingForm(this.questions!.tests);
        this.testingForm.activeStep[0].active = true;
      }
    }
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

  async created(): Promise<void> {
    if (this.$route.params.lessonId) {
      this.interval = setInterval(() => CommentsStore.fetchAll(this.$route.params.lessonId), 10000);
      await this.fetchData();
    }
  }

  async onPlayerTimeupdate(e: any): Promise<void> {
    if (parseInt(e.cache_.currentTime) % 5 === 0 && e.cache_.currentTime % 1 > 0.75 && parseInt(e.cache_.currentTime) !== 0) {
      await LessonItemStore.setTimeCode({
        lessonId: this.$route.params.lessonId,
        timeCode: {time_code: parseInt(e.cache_.currentTime)}//eslint-disable-line
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
      timeCode: {time_code: 0}//eslint-disable-line
    });
    await LessonItemStore.fetchData(this.$route.params.lessonId);
    (this.$refs.videoPlayer as any).player.currentTime(this.lesson!.timeCode);
    (this.$refs.videoPlayer as any).player.play();
  }

  async postComment(): Promise<void> {
    if (this.commentsForm.commentId) {
      if (await this.commentsForm.submit(CommentsStore.postAnswer)) {
        await CommentsStore.fetchAll(this.$route.params.lessonId);
        document.getElementById(`comment${this.commentsForm.commentId}`)!.scrollIntoView();
        this.commentsForm = new CommentsForm();
        this.commentsForm.lessonId = parseInt(this.$route.params.lessonId);
      }
    } else {
      if (await this.commentsForm.submit(CommentsStore.postComment)) {
        await CommentsStore.fetchAll(this.$route.params.lessonId);
        this.commentsForm = new CommentsForm();
        this.commentsForm.lessonId = parseInt(this.$route.params.lessonId);
      }
    }
  }

  async handleLike(data: any): Promise<void> {
    if (data.type === CommentTypesEnum.Comment) {
      if (this.comments.find(item => item.id === data.id)!.isLiked !== null) {
        await CommentsStore.deleteLikeDislikeComment(data.id.toString());
        if (!this.comments.find(item => item.id === data.id)!.isLiked) {
          await CommentsStore.setLikeDislikeComment({data: {is_like: data.like}, route: data.id.toString()});//eslint-disable-line
        }
        await CommentsStore.fetchAll(this.$route.params.lessonId);
      } else {
        await CommentsStore.setLikeDislikeComment({data: {is_like: data.like}, route: data.id.toString()});//eslint-disable-line
        await CommentsStore.fetchAll(this.$route.params.lessonId);
      }
    } else {
      if (this.comments.find(item => item.id === data.id)!.answers.find(item => item.id === data.answerId)!.isLiked !== null) {
        await CommentsStore.deleteLikeDislikeAnswer(data.answerId.toString());
        if (!this.comments.find(item => item.id === data.id)!.answers.find(item => item.id === data.answerId)!.isLiked) {
          await CommentsStore.setLikeDislikeAnswer({data: {is_like: data.like}, route: data.answerId.toString()});//eslint-disable-line
        }
        await CommentsStore.fetchAll(this.$route.params.lessonId);
      } else {
        await CommentsStore.setLikeDislikeAnswer({data: {is_like: data.like}, route: data.answerId.toString()});//eslint-disable-line
        await CommentsStore.fetchAll(this.$route.params.lessonId);
      }
    }
  }

  async handleDislike(data: any): Promise<void> {
    if (data.type === CommentTypesEnum.Comment) {
      if (this.comments.find(item => item.id === data.id)!.isLiked !== null) {
        await CommentsStore.deleteLikeDislikeComment(data.id.toString());
        if (this.comments.find(item => item.id === data.id)!.isLiked) {
          await CommentsStore.setLikeDislikeComment({data: {is_like: data.like}, route: data.id.toString()});//eslint-disable-line
        }
        await CommentsStore.fetchAll(this.$route.params.lessonId);
      } else {
        await CommentsStore.setLikeDislikeComment({data: {is_like: data.like}, route: data.id.toString()});//eslint-disable-line
        await CommentsStore.fetchAll(this.$route.params.lessonId);
      }
    } else {
      if (this.comments.find(item => item.id === data.id)!.answers.find(item => item.id === data.answerId)!.isLiked !== null) {
        await CommentsStore.deleteLikeDislikeAnswer(data.id.toString());
        if (this.comments.find(item => item.id === data.id)!.answers.find(item => item.id === data.answerId)!.isLiked) {
          await CommentsStore.setLikeDislikeAnswer({data: {is_like: data.like}, route: data.answerId.toString()});//eslint-disable-line
        }
        await CommentsStore.fetchAll(this.$route.params.lessonId);
      } else {
        await CommentsStore.setLikeDislikeAnswer({data: {is_like: data.like}, route: data.answerId.toString()});//eslint-disable-line
        await CommentsStore.fetchAll(this.$route.params.lessonId);
      }
    }
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

  showAlert(show: boolean): void {
    this.show = show;
  }

  handleFavourite(): void {
    this.$emit('handleFavourite');
    this.show = true;
  }

  activatorChange(act: boolean): void {
    this.activator = act;
  }

  discuss(): void {
    const item = document.getElementById('message')!;
    item.scrollIntoView();
    item.focus();
  }

  respond(data: any): void {
    this.commentsForm.commentId = data.id;
    if (!data.index) {
      this.commentsForm.message = this.comments.find(item => item.id === data.id)!.fullName + ', ';
      this.commentsForm.author = this.comments.find(item => item.id === data.id)!.fullName;
    } else {
      this.commentsForm.message = this.comments.find(item => item.id === data.id)!.answers[data.index].fullName + ', ';
      this.commentsForm.author = this.comments.find(item => item.id === data.id)!.answers[data.index].fullName;
    }
    document.getElementById('message')!.focus();
  }

  beforeDestroy(): void {
    clearInterval(this.interval);
    CommentsStore.setCommentsToEmpty();
  }


  async send(): Promise<void> {
    await RightAnswersStore.postAnswers({answers: this.testingForm.results, param: this.lesson!.homeworkId.toString()});
    this.$emit('send');
    await this.fetchData();
    if (this.lesson!.number === this.lastLesson && this.result!.isDone) {
      this.activator = true;
    }
  }
}
</script>

<style lang="scss">
.course {
  width: 64%;
  display: flex;
  flex-direction: column;

  .desc {
    color: #818c99;
  }

  .course-locked {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));

      h1 {
        font-size: 24px;
        color: #FFFFFF;
      }
      h2 {
        color: #ffffff;
      }

      h3 {
        font-size: 16px;
        color: #FFFFFF;
      }
    }
  }

  .abs {
    font-size: 24px;
    position: absolute;
    color: #ffffff;
    top: 36px;
    left: 36px;
    z-index: 99999999;
  }
}

.course-container {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;

  &.material {
    border-radius: 5px;
  }
}

.course-video-row {
  margin: 16px 0 16px 24px;
}

.materials {
  margin-top: 66px;
}
</style>
