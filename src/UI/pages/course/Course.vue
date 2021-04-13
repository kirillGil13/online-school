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
          <div class="course" v-if="!$route.params.lessonId"
               :style="{width: $adaptive.isMobile ? '100%' : '', order: $adaptive.isMobile ? 2 : ''}">
            <v-responsive :aspect-ratio="16/9" content-class="course-container" @click="pushToCurrent">
              <v-img :aspect-ratio="16/9" width="100%" height="100%" class="course-cover" :src="course.photoLink">
                <div class="play-button"></div>
              </v-img>
            </v-responsive>
            <v-col :class="['box-container mt-6', $adaptive.isMobile ? 'pa-3' : 'pa-5']">
                <div class="desc__container">
                  <div class="desc__container--title">Автор курса</div>
                  <div class="desc__container--author"> 
                    <div class="author--title">
                      <v-avatar>
                        <img
                          src="https://www.eg.ru/wp-content/uploads/2020/06/kto-iz-znamenitostey-prazdnuet-25-iyunya-den-rojdeniya103921.jpg"
                          alt="John"/>
                      </v-avatar>
                      {{defaultCourse.author}}
                    </div>
                    <div class="author--socials">
                        <a target="_blank" v-for="social of defaultCourse.socials" :key="social.id">
                          <v-btn
                              class="white--text mr-2 mt-0"
                              icon
                              small
                          >
                            <v-icon small>
                              mdi-{{social.id}}
                            </v-icon>
                          </v-btn>
                        </a>
                    </div>
                  </div>
              </div>
                <h5>ОПИСАНИЕ</h5>
                <div class="desc wrap-text" v-html="course.description"/>
            </v-col>
            <v-col :class="['box-container mt-6', $adaptive.isMobile ? 'pa-3' : 'pa-5']">
              <div class="desc__review">
                <div class="desc__reiting">
                <div class="desc__reiting--count">9.9</div>
                <div class="desc__reiting00subtitle">общий рейтинг</div>
              </div>

              <div class="desc__icons">
                <div class="desc__icons--like">
                  <Relation svg-name="Finger" :active="isLiked" :title="$adaptive.isMobile ? '' : '1788'"
                    @click="$emit('handleLike', true)"/>
                </div>

                <div  class="desc__icons--dislike">
                   <Relation svg-class="svg-down" :active="isDisliked" svg-name="Finger" :title="$adaptive.isMobile ? '' : '876'"
                    @click="$emit('handleDisLike', false)"/>
                </div>
              </div>

              <div class="desc__btn-send-review"> 
                <button>Написать отзыв</button>
              </div>
                <Discussion isRewiew="true"/>
              </div>
            </v-col>
          </div>
          <div :class="['lessons', $adaptive.isMobile ? 'mb-3' : 'ml-4']"
               :style="{width: $adaptive.isMobile ? '100%' : ''}">
            <Lessons ref="lessons" :course="course" @moveToNextLesson="moveToNextLesson"/>
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
import Discussion from '../../components/discussion/Discussion.vue';
import { IDefaultCourseItem } from '@/entity/courseItem/courseItemDefault';

@Component({
  components: {
    Lessons,
    Header,
    Button,
    Relation,
    Doc,
    Discussion
  },
})
export default class Course extends Vue {
  route: HeaderRouteType = {
    name: this.$routeRules.TrainingMain,
    label: 'Вернуться к списку курсов',
  };
  files: ILessonItemFiles[] = [];

  @Watch('$route.params.lessonId')
  async onChangeRoute(val: string, oldVal: string): Promise<void> {
    if (oldVal) {
      await this.fetchData();
    }
  }

  get lastLesson(): number {
    return this.course!.lessons[this.course!.lessons.length - 1].number;
  }

  get course(): ICourseItem | null {
    return CourseItemStore.courseItem;
  }

  get defaultCourse(): IDefaultCourseItem {
    console.log(CourseItemStore.courseItem)
    return CourseItemStore.courseItemDefault
  }

  get courseLoaded(): boolean {
    return CourseItemStore.courseLoaded;
  }

  findCurrent(lessons: ICourseLessons[]): number {
    if (lessons.find((el) => el.status === LessonsTypesEnum.UN_DONE || el.status === LessonsTypesEnum.LOCKED)) {
      return lessons.find((el) => el.status === LessonsTypesEnum.UN_DONE || el.status === LessonsTypesEnum.LOCKED)!.id;
    } else {
      return lessons.find((el) => el.number === this.lastLesson)!.id;
    }
  }

  passFile(files: ILessonItemFiles[]): void {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
  }

  pushToCurrent(): void {
    this.$router.push({
      name: this.$routeRules.Lesson,
      params: {lessonId: this.findCurrent(this.course!.lessons).toString()}
    });
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
      document.title = this.course!.name + ' - ' + 'ONELINKS';
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
}
</script>
<style lang="scss">
.container_b {
  padding: 0 36px 96px 0;
}

.lessons {
  position: relative;
  width: calc(100% - 64% - 16px);
}

.course-cover {
  border-radius: 12px;
  cursor: pointer;
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

.desc__container {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #F2F2F2;
  padding: 1rem 0;
  margin-bottom: 1rem;

  &--title {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #5F739C;
    margin: 0 0 1.3rem 0;
  }

  &--author {
    display: flex;
    justify-content: space-between;

    .author--socials {
      display: flex;
    }
  }  
}

.desc__review {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
}

.desc__reiting {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  border-right: 1px solid #F2F2F2;
  margin-right: 2rem ;

  &--count {
    font-weight: 600;
    font-size: 48px;
    line-height: 58px;
    display: flex;
    color: #27AE60;
    align-items: center;
  }

  &--subtitle {
    font-size: 12px;
    line-height: 150%;
    display: flex;
    align-items: center;
    color: #5F739C;
  }
}

.desc__icons {
  display: flex;
  width: 30%;
  border-right: 1px solid #F2F2F2;
  margin-right: 2rem ;
  height: 100%;
  align-items: center;

  &--dislike {
    .icon-container {
      background: rgba(230, 70, 70, 0.12);

      svg path {
        fill: #E64646;
      }
    }
  }

  &--like {
    .icon-container {
      background: rgba(39, 174, 96, 0.12);

      svg path {
        fill: #27AE60;
      }
    }
  }
  
  
}

.desc__btn-send-review {
  display: flex;
  align-items: center;
  width: 40%;
  height: 100%;

    button {
      padding: 10px 16px;
      font-size: 12px;
    }
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgb(62, 60, 60, 0.7);
  transform: translate(-50%, -50%);
  color: hsla(0, 0%, 100%, .74);
  cursor: pointer;
  -webkit-transition: .2s;
  -o-transition: .2s;
  transition: all ease .5s;
  width: 68px;
  height: 68px;
  border-radius: 100%;
  border: 3px solid #fff;
  z-index: 2;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-30%, -50%);
    -o-transform: translate(-30%, -50%);
    transform: translate(-30%, -50%);
    width: 0;
    height: 0;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    border-left: 15px solid #fff;
  }
}
</style>
