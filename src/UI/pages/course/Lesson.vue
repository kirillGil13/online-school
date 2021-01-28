<template>
  <div class="course">
    <v-responsive :aspect-ratio="16/9" content-class="course-container">
      <h1 v-if="!isPlaying && lessonLoaded" class="abs">{{ lesson.title }}</h1>
      <VideoStream v-if="lessonLoaded" controls :src="lesson.videoUid" id="player" :class="['player', !isPlaying ? 'shadow' : '']"
                   style="border-radius: 12px;position: absolute; top: 0; height: 100%; width: 100%;"
                   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                   @play="$emit('onPlayerPlay')"
      />
    </v-responsive>
    <v-row class="course-video-row" v-if="lessonLoaded">
      <Relation svg-name="Finger" title="Нравится"/>
      <Relation svg-class="svg-down" svg-name="Finger" title="Не нравится"/>
      <Relation svg-name="Chosen" title="В избранное"/>
    </v-row>
    <v-col class="box-container pa-6" v-if="lessonLoaded">
      <h5>ОПИСАНИЕ</h5>
      <span class="desc">{{ course.description }}</span>
    </v-col>

    <TestingComponent v-if="false"
        :form="testingForm"
        :result="testingResult"
        v-show="questions"
        :questions="questions"
        @moveToNextLesson="moveToNextLesson()"
        @passTestAgain="passTestAgain()"
        @reviewLesson="reviewLesson()"
        @writeMaster="writeMaster()"
    />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {TestingForm} from '../../../form/testing/testingForm';
import {LessonItemStore} from '../../../store/modules/LessonItem';
import {ILessonItem} from '../../../entity/lessonItem/lessonItem.types';
import Lessons from '../../components/lessons/Lessons.vue';
import Button from '../../components/common/Button.vue';
import TestingComponent from '../../components/testing/TestingComponent.vue';
import Relation from '../../components/common/Relation.vue';
import {VideoStream} from 'stream-vue';
import {QuestionsStore} from '@/store/modules/Questions';
import {ITesting} from '@/entity/testing/testing.types';
import {ICourseItem} from '@/entity/courseItem/courseItem.type';

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
  testingForm: TestingForm;
  constructor() {
    super();
    this.testingForm = new TestingForm(this.questions);
  }

  @Watch('$route.params.lessonId')
  async onChangeRoute(): Promise<void> {
    await this.fetchData();
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
  async mounted(): Promise<void> {
    if (this.$route.params.lessonId) {
      await this.fetchData();
    }
  }
}
</script>

<style lang="scss">
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
.materials {
  margin-top: 68px;
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