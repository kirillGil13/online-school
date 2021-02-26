<template>
  <div class="course" :style="{width: isMobile ? '100%' : '', order: isMobile ? 2 : ''}">
    <v-responsive :aspect-ratio="16/9" content-class="course-container">
      <h1 v-if="!isPlaying && lessonLoaded" class="abs">{{ lesson.title }}</h1>
      <VideoStream v-if="lessonLoaded" controls :src="lesson.videoUid" id="player"
                   :class="['player', !isPlaying ? 'shadow' : '']"
                   style="border-radius: 12px;position: absolute; top: 0; height: 100%; width: 100%;"
                   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                   @play="$emit('onPlayerPlay')"
      />
    </v-responsive>
    <v-row class="course-video-row" v-if="lessonLoaded">
      <Relation svg-name="Finger" :title="isMobile ? '' : 'Нравится'"/>
      <Relation svg-class="svg-down" svg-name="Finger" :title="isMobile ? '' : 'Не нравится'"/>
      <Relation svg-name="Chosen" :title="isMobile ? '' : 'В избранное'"/>
      <Relation svg-name="Message" :title="isMobile ? '' : 'Обсудить'"/>
    </v-row>
    <v-col :class="['box-container', isMobile ? 'pa-3' : 'pa-5']" v-if="lessonLoaded">
      <h5>ОПИСАНИЕ</h5>
      <span class="desc">{{ course.description }}</span>
    </v-col>
    <v-col v-if="questionsLoaded && questions" :class="['box-container mt-4', isMobile ? 'pa-3' : 'pa-5']">
      <TestingComponent
          :form="testingForm"
          :questions="questions"
          :result="result"
          :active-result="activeResult"
          @send="send()"
          @moveToNextLesson="moveToNextLesson()"
          @passTestAgain="passTestAgain()"
          @reviewLesson="reviewLesson()"
          @writeMaster="writeMaster()"
      />
    </v-col>
    <!-- todo logic and connection plus components -->
    <h2 class="discussion-title mt-6" v-if="!isMobile">Обсуждение</h2>
    <v-row no-gutters v-if="!isMobile">
      <Button class="discussion-button with_icon">
        <svg-icon class="mr-2" name="Ring"></svg-icon>
        Подписаться
      </Button>
    </v-row>
    <v-col class="mt-4" v-if="!isMobile">
      <v-row class="message-container d-flex flex-row">
        <v-avatar size="36" class="mr-3">
          <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="">
        </v-avatar>
        <input
            class="message"
            type="text" name="text"
            id="text"
            placeholder="Ваше сообщение"
        >
      </v-row>
      <v-row class="mt-8">
        <v-avatar size="36" class="mr-3">
          <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="">
        </v-avatar>
        <div class="d-flex flex-column">
          <div class="comment py-3 px-4">
            <v-col class="pa-0">
              <v-row no-gutters class="mb-1">
                <h4 class="mr-3">Марина Кравец</h4>
                <div class="desc">25 Января, 16:20</div>
              </v-row>
              <v-row no-gutters>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed lobortis tortor ipsum neque.
              </v-row>
              <v-row no-gutters class="d-flex flex-row justify-space-between align-end mt-2">
                <span class="comment-action">Ответить</span>
                <div class="d-flex flex-row justify-space-between">
                  <Relation class="mr-3" svg-name="Finger" title="1"/>
                  <Relation svg-class="svg-down" svg-name="Finger"/>
                </div>
              </v-row>
            </v-col>
          </div>
          <span class="comment-action mt-2"><svg-icon class="mr-2" name="Comment_Arrow"></svg-icon>Еще 2 ответа</span>
        </div>
      </v-row>
      <v-row class="mt-8">
        <v-avatar size="36" class="mr-3">
          <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="">
        </v-avatar>
        <div class="d-flex flex-column">
          <div class="comment py-3 px-4">
            <v-col class="pa-0">
              <v-row no-gutters class="mb-1">
                <h4 class="mr-3">Иван Харьков</h4>
                <div class="desc">25 Января, 16:20</div>
              </v-row>
              <v-row no-gutters>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat orci varius molestie facilisis sed diam.
                Orci habitasse in dolor in diam. Ac at mauris diam lobortis varius convallis metus sed. Cursus lorem
                hendrerit sed etiam.
              </v-row>
              <v-row no-gutters class="d-flex flex-row justify-space-between align-end mt-2">
                <span class="comment-action">Ответить</span>
                <div class="d-flex flex-row justify-space-between">
                  <Relation class="mr-3" svg-name="Finger" title="1"/>
                  <Relation svg-class="svg-down" svg-name="Finger"/>
                </div>
              </v-row>
            </v-col>
          </div>
          <v-row class="mt-4 ml-4">
            <v-avatar size="24" class="mr-3">
              <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="">
            </v-avatar>
            <div class="d-flex flex-column">
              <div class="comment child py-3 px-4">
                <v-col class="pa-0">
                  <v-row no-gutters class="mb-1">
                    <h4 class="mr-3">Иван Харьков</h4>
                    <div class="desc">25 Января, 16:20</div>
                  </v-row>
                  <v-row no-gutters>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat orci varius molestie facilisis sed diam.
                    Orci habitasse in dolor in diam. Ac at mauris diam lobortis varius convallis metus sed. Cursus lorem
                    hendrerit sed etiam.
                  </v-row>
                  <v-row no-gutters class="d-flex flex-row justify-space-between align-end mt-2">
                    <span class="comment-action">Ответить</span>
                    <div class="d-flex flex-row justify-space-between">
                      <Relation class="mr-3" svg-name="Finger" title="1"/>
                      <Relation svg-class="svg-down" svg-name="Finger"/>
                    </div>
                  </v-row>
                </v-col>
              </div>
            </div>
          </v-row>
        </div>
      </v-row>
    </v-col>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {TestingForm} from '@/form/testing/testingForm';
import {LessonItemStore} from '@/store/modules/LessonItem';
import {ILessonItem} from '@/entity/lessonItem/lessonItem.types';
import Lessons from '../../components/lessons/Lessons.vue';
import Button from '../../components/common/Button.vue';
import TestingComponent from '../../components/testing/TestingComponent.vue';
import Relation from '../../components/common/Relation.vue';
import {VideoStream} from 'stream-vue';
import {QuestionsStore} from '@/store/modules/Questions';
import {ITesting} from '@/entity/testing/testing.types';
import {ICourseItem} from '@/entity/courseItem/courseItem.type';
import {RightAnswersStore} from '@/store/modules/RightAnswers';
import TestingResult from '@/entity/testingResult/testingResult';
import {TestingResultResponseType} from '@/entity/testingResult/testingResult.types';
import {AdaptiveStore} from '@/store/modules/Adaptive';

@Component({
  components: {
    Lessons,
    Button,
    TestingComponent,
    Relation,
    VideoStream,
  },
})
export default class Lesson extends Vue {
  @Prop() readonly isPlaying!: boolean;
  @Prop() readonly course!: ICourseItem;
  result: TestingResult | null = null;
  testingForm: TestingForm;
  activeResult = false;

  constructor() {
    super();
    this.testingForm = new TestingForm(this.questions);
  }

  @Watch('$route.params.lessonId')
  async onChangeRoute(): Promise<void> {
    await this.fetchData();
    this.testingForm = new TestingForm(this.questions);
    this.activeResult = false;
    if (this.questionsLoaded === true) {
      this.testingForm.activeStep[0].active = true;
    }
  }

  @Watch('questionsLoaded')
  onChangeLoad(): void {
    if (this.questionsLoaded === true) {
      this.testingForm = new TestingForm(this.questions);
      this.testingForm.activeStep[0].active = true;
      this.activeResult = false;
    }
  }

  async fetchData(): Promise<void> {
    await LessonItemStore.fetchData(this.$route.params.lessonId);
    await QuestionsStore.fetchAll(this.$route.params.lessonId);
  }

  get lesson(): ILessonItem | null {
    return LessonItemStore.lessonItem;
  }

  get questions(): ITesting[] {
    return QuestionsStore.questions;
  }

  get questionsLoaded(): boolean {
    return QuestionsStore.questionsLoaded;
  }

  get lessonLoaded(): boolean {
    return LessonItemStore.lessonLoaded;
  }

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }

  async mounted(): Promise<void> {
    if (this.$route.params.lessonId) {
      await this.fetchData();
    }
  }

  passTestAgain(): void {
    window.location.reload();
  }

  reviewLesson(): void {
    window.location.reload();
  }

  async send(): Promise<void> {
    await RightAnswersStore.postAnswers({answers: this.testingForm.results, param: this.$route.params.lessonId});
    if (RightAnswersStore.answersLoaded) {
      const response = RightAnswersStore.rightAnswers;
      if (response) {
        this.activeResult = true;
        this.result = new TestingResult(this.questions, response as TestingResultResponseType);
      }
    }
  }
}
</script>

<style lang="scss">
.course {
  width: 64%;
  display: flex;
  flex-direction: column;

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

  .discussion-title {
    font-size: 18px;
  }

  .discussion-button {
    padding: 0;
    color: #5F739C !important;
    font-size: 12px;
    background: none;
    background-color: transparent !important;
    border: none;

    &:hover {
      box-shadow: none;
    }
  }

  .message-container {
    flex-wrap: nowrap;

    .message {
      background-color: $white;
      border-radius: 5px;
      color: $dark;
      font-size: 14px;
      width: 100%;
      text-indent: 16px;
      border: 1px solid rgba(66, 109, 246, 0.12);

      &::placeholder {
        color: #828282;
      }
    }
  }

  .comment {
    background: rgba(66, 109, 246, 0.12);
    border-radius: 2px 16px 16px 16px;
    max-width: 570px;
    &.child {
      max-width: 490px;
    }
    .desc {
      font-size: 12px;
    }

    .relation {
      margin-right: 0;
      font-size: 12px;

      .icon-container {
        width: auto;
        height: auto;
        background-color: transparent;
        margin-right: 4px;
      }
    }
  }

  .comment-action {
    cursor: pointer;
    font-size: 12px;
    color: #426DF6;
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

.video-js {
  font-size: 22px !important;
  border-radius: 12px;

  video {
    border-radius: 12px;
  }

  .vjs-control-bar {
    bottom: 10px;
    background-color: transparent !important;

    .vjs-control {
      width: 8em !important;

      .vjs-icon-placeholder {
        font-size: 15px;

        &::before {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .vjs-play-control {
      margin-left: 20px !important;
    }

    .vjs-progress-control {
      .vjs-slider {
        background: rgba(255, 255, 255, 0.3);

        .vjs-load-progress {
          background-color: #F2F2F2;
        }

        .vjs-play-progress {
          background-color: #FF4D2C;
        }
      }

      .vjs-progress-holder {
        height: 0.4em;
      }
    }

    .vjs-fullscreen-control {
      margin-right: 20px !important;
    }
  }
}
</style>