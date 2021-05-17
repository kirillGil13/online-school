<template>
  <v-responsive class="border" content-class="course-lessons-block" :aspect-ratio="$adaptive.isMobile ? 9/6 : 42/44">
    <div class="lessons-block d-flex flex-column align-end box-container">
      <v-col class="lesson-container pa-0" align-self="start" :style="{height: $adaptive.isMobile ? '100%' : ''}">
        <ul class="lesson-list">
          <li
              v-for="(lesson, index) in course.lessons"
              :key="index"
          >
            <router-link :to="{name: $routeRules.Lesson, params: {lessonId: lesson.id.toString()}}"
                         active-class="lesson-current" :id="`lesson${index}`"
                         :class="[ (course.resolveType(index, $route.params.lessonId) === lessonType.LOCKED || !user.isSubscriptionActual) ? 'lesson-locked' : '']">
              <svg-icon class="svg-wh" :name="user.isSubscriptionActual ? course.resolveType(index, $route.params.lessonId) : lessonType.LOCKED"></svg-icon>
              <div class="lesson_name">
                <span class="desc d-flex justify-space-between">Урок {{ lesson.number }} </span>
                {{ lesson.name }}
              </div>
              <span class="lesson_duration">{{lesson.duration}}</span>
            </router-link>
          </li>
        </ul>
      </v-col>
      <div class="lesson-btn pa-2" :style="{justifyContent: last ? 'flex-start' : ''}" v-if="!$adaptive.isMobile && $route.name === $routeRules.Lesson">
<!--        <v-col class="px-2 py-2">-->
<!--          <Button :class="['with_icon', $adaptive.isMobile ? 'py-2' : '']" small full-width>-->
<!--            <svg-icon name="Chat"></svg-icon>-->
<!--            Задать вопрос-->
<!--          </Button>-->
<!--        </v-col>-->
        <v-col class="pa-0" :cols="$adaptive.isMobile ? 2 : ''">
          <Button :class="['with_icon secondary_white', $adaptive.isMobile ? 'py-4' : '']"
                  @submit="$emit('moveToNextLesson', course.lessons.find(item => item.id === parseInt($route.params.lessonId)).number)"
                  v-if="!last && $route.params.lessonId" small full-width>
            <svg-icon name="Next" :style="{marginRight: $adaptive.isMobile ? 0 : ''}"></svg-icon>
            {{$adaptive.isMobile ? '' : 'Следующий урок'}}
          </Button>
        </v-col>
      </div>
      </div>
  </v-responsive>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from '@/UI/components/common/Button.vue';
import {LessonsTypesEnum} from '@/entity/common/lessons.types';
import {ICourseItem} from '@/entity/courseItem/courseItem.type';
import {IUser} from '../../../entity/user';
import {AuthStore} from '../../../store/modules/Auth';

@Component({
  components: {
    Button,
  },
})
export default class Lessons extends Vue {
  @Prop() readonly course!: ICourseItem;
  lessonType = LessonsTypesEnum;

  get last(): boolean {
    return (this.course.lessons[this.course.lessons.length - 1].id.toString() === this.$route.params.lessonId);
  }

  get user(): IUser | null {
    return AuthStore.user;
  }
}
</script>

<style lang="scss">
.border {
  border-radius: 12px;
  box-shadow: 0px 14px 12px rgba(0, 0, 0, 0.01);
}

.course-lessons-block {
  position: relative;
  border-radius: 12px;

  .lessons-block {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;

    .lesson-container {
      position: relative;
      width: 100%;
      overflow: scroll;
      ul {
        padding: 0;
        list-style: none;
        margin: 0;
        width: 100%;

        li {
          a {
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 12px;
            color: #060516;
            padding: 12px 18px 12px 18px;

            &#lesson0 {
              border-top-left-radius: 12px;
              border-top-right-radius: 12px;
            }

            &:hover {
              background-color: rgba(87, 81, 183, 0.12) !important;
            }

            &.lesson-current {
              background-color: rgba(87, 81, 183, 0.12);
            }

            &.lesson-locked {
              background-color: #f2f2f2;
            }

            .svg-wh {
              height: 24px !important;
              width: 24px !important;
              margin-right: 14px;
              display: flex;
              justify-content: center;
              align-content: center;
            }

            .lesson_name {
              display: flex;
              flex-direction: column;
              width:100%;

              .desc {
                color: #5f739c;
                font-size: 10px;
                line-height: 95%;
              }
            }

            .lesson_duration {
              font-size: 10px;
              line-height: 150%;
              display: flex;
              align-items: center;
              text-align: right;
              color: #5F739C;
            }
          }
        }
      }
    }

    .lesson-btn {
      border-top: 1px solid #F2F2F2;
      display: flex;
      flex-direction: row;
      width: 100%;
      .with_icon {
        margin-top: 0;
        padding: 16px 0;
        justify-content: center;

        .svg-icon {
          margin-right: 12px;
          height: 16px !important;
          width: 16px !important;
        }

        &.secondary_white {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
