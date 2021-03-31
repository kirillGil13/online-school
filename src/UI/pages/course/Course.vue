<template>
  <v-col>
    <v-row>
      <v-col v-if="courseLoaded" :class="[$adaptive.isMobile ? 'pa-6' : '']">
        <Header :isBordered="true" :route="route" :title="course.name"></Header>
        <v-row :class="['mt-6', $adaptive.isMobile ? 'd-flex flex-column' : '']">
          <router-view @passFile="passFile"
                       @handleLike="handleLike"
                       @handleDisLike="handleDisLike"
                       @handleFavourite="handleFavourite"
                       @moveToNextLesson="moveToNextLesson"
                       @send="send"
                       @moveToPrevious="moveToPrevious"
                       :last-lesson="lastLesson"
                       :isFavourite="course.isFavourite"
                       :isDisliked="course.isDisliked"
                       :isLiked="course.isLiked"
          ></router-view>
          <div :class="['lessons', $adaptive.isMobile ? 'mb-3' : 'ml-4']" :style="{width: $adaptive.isMobile ? '100%' : ''}">
            <Lessons ref="lessons" :course="course"/>
            <!--todo or not ?-->
            <!--            <div class="contacts" v-if="!$adaptive.isMobile">-->
            <!--              <div class="contacts__content">-->
            <!--                <div class="contacts__item d-flex flex-row">-->
            <!--                  <v-avatar class="mr-3">-->
            <!--                    <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="">-->
            <!--                  </v-avatar>-->
            <!--                  <div class="details d-flex flex-column justify-center">-->
            <!--                    <h3 class="ma-0">Ильгиз Шакиров</h3>-->
            <!--                    <div class="details-desc">Автор курса</div>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--                <v-divider class="mt-4 mb-4"></v-divider>-->
            <!--                <div class="contacts__item d-flex flex-row">-->
            <!--                  <v-avatar class="mr-3">-->
            <!--                    <img src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="">-->
            <!--                  </v-avatar>-->
            <!--                  <div class="details d-flex flex-column justify-center">-->
            <!--                    <h3 class="ma-0">Ильгиз Шакиров</h3>-->
            <!--                    <div class="details-desc">Ваш лидер</div>-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <v-col class="box-container pa-6 pb-8 materials" v-if="!$adaptive.isMobile && files === []">
              <h5>МАТЕРИАЛЫ К УРОКУ</h5>
              <Doc v-for="(item, index) in files" :key="index" :material="item"/>
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
import {Component, Vue, Watch} from 'vue-property-decorator';
import {HeaderRouteType} from '@/entity/common/header.types';
import Relation from '../../components/common/Relation.vue';
import {ICourseItem, ICourseLessons} from '@/entity/courseItem/courseItem.type';
import Lessons from '@/UI/components/lessons/Lessons.vue';
import {CourseItemStore} from '@/store/modules/CourseItem';
import Doc from '@/UI/components/common/Doc.vue';
import {LessonsTypesEnum} from '../../../entity/common/lessons.types';
import {ILessonItemFiles} from '../../../entity/lessonItem/lessonItem.types';
import {RelationStore} from '../../../store/modules/Relation';

@Component({
  components: {
    Lessons,
    Header,
    Button,
    Relation,
    Doc
  },
})
export default class Course extends Vue {
  route: HeaderRouteType = {
    name: this.$routeRules.TrainingMain,
    label: 'Вернуться к списку курсов',
  };
  files: ILessonItemFiles[] = [];

  findCurrent(lessons: ICourseLessons[]): number {
    if (lessons.find((el) => el.status === LessonsTypesEnum.UN_DONE || el.status === LessonsTypesEnum.LOCKED)) {
      return lessons.find((el) => el.status === LessonsTypesEnum.UN_DONE || el.status === LessonsTypesEnum.LOCKED)!.id;
    } else {
      return lessons.find((el) => el.number === this.lastLesson)!.id;
    }
  }

  get lastLesson(): number {
    return this.course!.lessons[this.course!.lessons.length - 1].number;
  }

  passFile(files: ILessonItemFiles[]): void {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
  }

  getLessonId(lessons: ICourseLessons[], number: number, next: boolean): number {
    if (next) {
      return lessons.find(item => item.number === number + 1)!.id;
    } else return lessons.find(item => item.number === number - 1)!.id;
  }

  moveToNextLesson(number: number): void {
    this.$router.push({
      name: this.$routeRules.Lesson,
      params: {
        lessonId: this.getLessonId(this.course!.lessons, number, true).toString()
      }
    })
  }

  moveToPrevious(number: number): void {
    this.$router.push({
      name: this.$routeRules.Lesson,
      params: {
        lessonId: this.getLessonId(this.course!.lessons, number, false).toString()
      }
    })
  }

  send(): void {
    this.fetchData();
  }

  async created(): Promise<void> {
    await this.fetchData();
    if (this.courseLoaded) {
      document.title = this.course!.name + ' - ' + 'OneLinks';
    }
    if (!this.$route.params.lessonId) {
      await this.$router.push({
        name: this.$routeRules.Lesson,
        params: {lessonId: this.findCurrent(this.course!.lessons).toString()}
      });
    }
  }

  @Watch('$route.params.lessonId')
  async onChangeRoute(val: string, oldVal: string): Promise<void> {
    if (oldVal) {
      await this.fetchData();
    }
  }

  async fetchData(): Promise<void> {
    await CourseItemStore.fetchData(this.$route.params.id);
  }

  async handleLike(like: boolean): Promise<void> {
    if (!this.course!.isLiked) {
      await RelationStore.postLikeDislike({param: this.$route.params.id, relation: {is_like: like}}); //eslint-disable-line
      await this.fetchData();
    } else {
      await RelationStore.deleteLikeDislike(this.$route.params.id);
      await this.fetchData();
    }
  }

  async handleDisLike(dislike: boolean): Promise<void> {
    if (!this.course!.isDisliked) {
      await RelationStore.postLikeDislike({param: this.$route.params.id, relation: {is_like: dislike}}); //eslint-disable-line
      await this.fetchData();
    } else {
      await RelationStore.deleteLikeDislike(this.$route.params.id);
      await this.fetchData();
    }
  }

  async handleFavourite(): Promise<void> {
    if (!this.course!.isFavourite) {
      await RelationStore.postFavourite(this.$route.params.id); //eslint-disable-line
      await this.fetchData();
    } else {
      await RelationStore.deleteFavourite(this.$route.params.id);
      await this.fetchData();
    }
  }

  get course(): ICourseItem | null {
    return CourseItemStore.courseItem;
  }

  get courseLoaded(): boolean {
    return CourseItemStore.courseLoaded;
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
