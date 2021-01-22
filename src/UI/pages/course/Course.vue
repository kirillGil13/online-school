<template>
  <v-col>
      <Header :isBordered="true" :route="route" :title="course.title"></Header>
      <v-row class="mt-6">
        <div class="course" >
            <v-responsive :aspect-ratio="16/9" content-class="course-container">
              <h1 v-if="!isPlaying" class="abs">{{lesson.title}}</h1>
              <video-player :class="[!isPlaying ? 'shadow' : '']" :options="playerOptions" :playsinline="true" ref="videoPlayer" @play="onPlayerPlay()">
              </video-player>
            </v-responsive>
            <v-row class="course-video-row">
              <Relation svg-name="Finger" title="Нравится"/>
              <Relation svg-class="svg-down" svg-name="Finger" title="Не нравится"/>
              <Relation svg-name="Chosen" title="В избранное"/>
            </v-row>
            <v-col class="box-container pa-6">
              <h5>ОПИСАНИЕ</h5>
              <span class="desc">{{ course.description }}</span>
            </v-col>
            <!--<TestingComponent
                :form="testingForm"
                :result="testingResult"
                @moveToNextLesson="moveToNextLesson()"
                @passTestAgain="passTestAgain()"
                @reviewLesson="reviewLesson()"
                @writeMaster="writeMaster()"
            />-->
          </div>
        <div class="lessons">
            <Lessons ref="lessons" :course="course" @moveToLesson="moveToLesson"/>



          <v-col class="box-container pa-6 materials">
              <h5>МАТЕРИАЛЫ К УРОКУ</h5>
              <v-row class="course-container material align-center mb-5 mt-4 pa-3">
                <svg-icon class="svg-wh" name="Doc_PDF"></svg-icon>
                Презентация продуктов FIniko
              </v-row>
              <v-row class="course-container material align-center pa-3">
                <svg-icon class="svg-wh" name="Doc_PDF"></svg-icon>
                Презентация продуктов FIniko
              </v-row>
            </v-col>
        </div>
      </v-row>
  </v-col>
</template>
<script lang="ts">
import Header from '../../components/common/Header.vue';
import Button from '../../components/common/Button.vue';
import TestingComponent from '../../components/testing/TestingComponent.vue';
import {Component, Vue, Watch} from 'vue-property-decorator';
import {HeaderRouteType} from '@/entity/common/header.types';
import Relation from '../../components/common/Relation.vue';
import {ITesting} from '@/entity/testing/testing.types';
import {ICourseItem} from '@/entity/courseItem/courseItem.type';
import {ILessonItem} from '@/entity/lessonItem/lessonItem.types';
import Lessons from '@/UI/components/lessons/Lessons.vue';
import {RouterNameEnum} from '@/router/router.types';
import {CourseItemStore} from '@/store/modules/CourseItem';
import {LessonItemStore} from '@/store/modules/LessonItem';
import {QuestionsStore} from '@/store/modules/Questions';
import {TestingForm} from '@/form/testing/testingForm';
import TestingResult from '@/entity/testingResult/testingResult';
import {TestingResultResponseType} from '@/entity/testingResult/testingResult.types';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

@Component({
  components: {
    Lessons,
    Header,
    Button,
    TestingComponent,
    Relation,
    videoPlayer
  },
})
export default class Course extends Vue {
  testingForm: TestingForm;
  testingResult: TestingResult;
  rightAnswers: TestingResultResponseType = { totalRightAnswers: 3, };
  isPlaying = false;
  route: HeaderRouteType = {
    name: 'Training',
    label: 'Вернуться к списку курсов',
  };
  playerOptions: Record<string, any> = {
    muted: true,
    language: 'ru',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [{
      type: 'video/mp4',
      src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
    }],
    aspectRatio: '16:9',
  }

  constructor() {
    super();
    this.testingForm = new TestingForm(this.questions);
    this.testingResult = new TestingResult(this.questions, this.rightAnswers);
  }

  async created(): Promise<void> {
    await this.fetchData();
  }

  @Watch('$route.params.lessonId')
  async onChangeRoute(): Promise<void> {
    await this.fetchData();
  }

  async fetchData(): Promise<void> {
    await CourseItemStore.fetchData({courseId: this.$route.params.id,lessonId: this.$route.params.lessonId});
    await LessonItemStore.fetchData(this.$route.params.lessonId);
    await QuestionsStore.fetchAll(this.$route.params.lessonId);
  }

  get course(): ICourseItem{
    return CourseItemStore.courseItem;
  }

  get lesson(): ILessonItem{
    return LessonItemStore.lessonItem;
  }

  get questions(): ITesting[] {
    return QuestionsStore.questions;
  }

  onPlayerPlay(): void {
    this.isPlaying = true;
  }

  moveToLesson(lessonId: number): void {
    this.$router.push({
      name: RouterNameEnum.Course,
      params: {id: this.$route.params.id, lessonId: lessonId.toString()},
    });
  }

  // reviewLesson() {}
  //
  // moveToNextLesson() {}
  //
  // writeMaster() {}
  //
  // passTestAgain() {}
}
</script>
<style lang="scss">
.container_b {
  padding: 0 36px 96px 0;
}

.course {
  width: 64%;
  .course-container {
  }

  .desc {
    color: #818c99;
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

.lessons {
  position: relative;
  width: calc(100% - 64% - 16px);
  margin-left: 16px;
}

.materials {
  margin-top: 68px;
}

</style>
