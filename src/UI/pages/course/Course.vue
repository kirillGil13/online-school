 <template>
  <v-col>
    <v-row>
      <v-col v-if="courseLoaded" :class="[isMobile ? 'pa-6' : '']">
        <Header :isBordered="true" :route="route" :title="course.title"></Header>
        <v-row :class="['mt-6', isMobile ? 'd-flex flex-column' : '']">
          <router-view :isPlaying="isPlaying" @onPlayerPlay="onPlayerPlay" :course="course"></router-view>
          <div :class="['lessons', isMobile ? 'mb-3' : 'ml-4']" :style="{width: isMobile ? '100%' : ''}">
            <Lessons ref="lessons" :course="course"/>
            <div class="contacts" v-if="!isMobile">
              <div class="contacts__content">
                <div class="contacts__item d-flex flex-row">
                  <v-avatar class="mr-3">
                    <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="">
                  </v-avatar>
                  <div class="details d-flex flex-column justify-center">
                    <h3 class="ma-0">Ильгиз Шакиров</h3>
                    <div class="details-desc">Автор курса</div>
                  </div>
                </div>
                <v-divider class="mt-4 mb-4"></v-divider>
                <div class="contacts__item d-flex flex-row">
                  <v-avatar class="mr-3">
                    <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="">
                  </v-avatar>
                  <div class="details d-flex flex-column justify-center">
                    <h3 class="ma-0">Ильгиз Шакиров</h3>
                    <div class="details-desc">Ваш лидер</div>
                  </div>
                </div>
              </div>
            </div>
            <v-col class="box-container pa-6 pb-8 materials" v-if="!isMobile">
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
import {AdaptiveStore} from '@/store/modules/Adaptive';

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
  route: HeaderRouteType = {
    name: RouterNameEnum.TrainingMain,
    label: 'Вернуться к списку курсов',
  };

  async created(): Promise<void> {
    await this.fetchData();
    if (!this.$route.params.lessonId) {
      await this.$router.push({name: RouterNameEnum.Lesson, params: {lessonId: this.course!.currentLessonId.toString()}});
    }
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

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
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
}
.contacts {
  margin-top: 12px;
  width: 100%;
  &__content {
    border: 1px solid #F2F2F2;
    position: relative;
    padding: 16px;
    background: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16);
    border-radius: 8px;
    &:before {
      z-index: 9999999;
      content: "";
      position: absolute;
      bottom: 100%;
      left: 76px;
      border: 9px solid transparent;
      border-bottom-color: #FFFFFF;
    }
  }
  &__item {
    cursor: pointer;
    .details {
      .details-desc {
        font-size: 12px;
        color: #828282;
      }
    }
  }
}
</style>
