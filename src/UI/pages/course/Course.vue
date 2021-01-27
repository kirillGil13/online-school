<template>
  <v-col >
    <v-row>
      <v-col v-if="courseLoaded">
        <Header :isBordered="true" :route="route" :title="course.title"></Header>
        <v-row class="mt-6">
          <router-view :isPlaying="isPlaying" @onPlayerPlay="onPlayerPlay" :course="course"></router-view>
          <div class="lessons">
            <Lessons ref="lessons" :course="course"/>
            <v-col class="box-container pa-6 pb-8 materials">
              <h5>МАТЕРИАЛЫ К УРОКУ</h5>
              <Doc v-for="(item, index) in course.materials" :key="index" :material="item"/>
            </v-col>
          </div>
        </v-row>
      </v-col>
      <v-col v-if="!courseLoaded">
        <v-overlay :value="!courseLoaded">
          <v-progress-circular
              indeterminate
              color="primary"
              :size="150"
          ></v-progress-circular>
        </v-overlay>
      </v-col>
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
import {ICourseItem} from '@/entity/courseItem/courseItem.type';
import Lessons from '@/UI/components/lessons/Lessons.vue';
import {RouterNameEnum} from '@/router/router.types';
import {CourseItemStore} from '@/store/modules/CourseItem';
import {VideoStream} from 'stream-vue'
import Doc from '@/UI/components/common/Doc.vue';

@Component({
  components: {
    Lessons,
    Header,
    Button,
    TestingComponent,
    Relation,
    VideoStream,
    Doc
  },
})
export default class Course extends Vue {
  isPlaying = false;
  dataIsReady = false;
  route: HeaderRouteType = {
    name: RouterNameEnum.TrainingMain,
    label: 'Вернуться к списку курсов',
  };

  async created(): Promise<void> {
    await this.fetchData();
    await this.$router.push({name: RouterNameEnum.Lesson, params: {lessonId: this.course!.currentLessonId.toString()}});
  }

  @Watch('$route.params.lessonId')
  async onChangeRoute(val: string, oldVal: string): Promise<void> {
    if (oldVal) {
      await this.fetchData();
      this.isPlaying = false;
    }
  }

  async fetchData(): Promise<void> {
    await CourseItemStore.fetchData({courseId: this.$route.params.id, lessonId: this.$route.params.lessonId});
  }

  get course(): ICourseItem | null {
    return CourseItemStore.courseItem;
  }

  get courseLoaded(): boolean {
    return CourseItemStore.courseLoaded;
  }

  onPlayerPlay(): void {
    this.isPlaying = true;
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
.course-container {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;

  &.material {
    border-radius: 5px;
  }
}

.lessons {
  position: relative;
  width: calc(100% - 64% - 16px);
  margin-left: 16px;
}



</style>
