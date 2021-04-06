<template>
  <v-responsive class="border" content-class="course-lessons-block" :aspect-ratio="$adaptive.isMobile ? 9/6 : 42/44">
    <div class="lessons-block box-container">
      <div class="lesson-container" :style="{height: $adaptive.isMobile ? '100%' : ''}">
        <ul class="lesson-list">
          <li
              v-for="(lesson, index) in course.lessons"
              :key="index"
          >
            <router-link :to="{name: $routeRules.Lesson, params: {lessonId: lesson.id.toString()}}"
                         active-class="lesson-current" :id="`lesson${index}`"
                         :class="[ course.resolveType(index, $route.params.lessonId) === lessonType.LOCKED ? 'lesson-locked' : '']">
              <svg-icon class="svg-wh" :name="course.resolveType(index, $route.params.lessonId)"></svg-icon>
              <div class="lesson_name">
                <span class="desc">Урок {{ lesson.number }}</span>
                {{ lesson.name }}
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="lesson-btn" :style="{justifyContent: last ? 'flex-start' : ''}">
<!--        <v-col class="px-2 py-2">-->
<!--          <Button :class="['with_icon', $adaptive.isMobile ? 'py-2' : '']" small full-width>-->
<!--            <svg-icon name="Chat"></svg-icon>-->
<!--            Задать вопрос-->
<!--          </Button>-->
<!--        </v-col>-->
        <v-col class="px-2 py-2" :cols="$adaptive.isMobile ? 2 : ''">
          <Button :class="['with_icon secondary_white', $adaptive.isMobile ? 'py-2' : '']"
                  @submit="$emit('moveToNextLesson', course.lessons.find(item => item.id === parseInt($route.params.lessonId)).number)"
                  v-if="!last && !$adaptive.isMobile && $route.params.lessonId" small full-width>
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

@Component({
  components: {
    Button,
  },
})
export default class Lessons extends Vue {
  @Prop() readonly course!: ICourseItem;
  lessonType = LessonsTypesEnum;
  //v-if="$route.params.lessonId"

  get last(): boolean {
    return (this.course.lessons[this.course.lessons.length - 1].id.toString() === this.$route.params.lessonId);
  }
}
</script>

<style lang="scss">
.border {
  border-radius: 12px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
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
      border-bottom: 1px solid #f2f2f2;
      width: 100%;
      overflow: scroll;
      height: 80%;

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

              .desc {
                color: #5f739c;
                font-size: 10px;
                line-height: 95%;
              }
            }
          }
        }
      }
    }

    .lesson-btn {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      max-height: 70px;
      height: 100%;

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
