<template>
  <v-responsive class="border" content-class="course-lessons-block" :aspect-ratio="39/23">
    <div class="lessons-block box-container">
      <div class="lesson-container">
        <ul class="lesson-list">
          <li
              v-for="(lesson, index) in course.lessons"
              :key="index"
          >
            <router-link :to="{name: routeName.Lesson, params: {lessonId: lesson.id}}" active-class="lesson-current" :id="`lesson${index}`"
                         :class="[ course.resolveType(index, $route.params.lessonId) === lessonType.LOCKED ? 'lesson-locked' : '']">
              <svg-icon class="svg-wh" :name="course.resolveType(index, $route.params.lessonId)"></svg-icon>
              <div class="lesson_name">
                <span class="desc">Урок {{ index + 1 }}</span>
                {{ lesson.title }}
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="lesson-btn">
        <Button class="with_icon">
          <svg-icon name="Chat"></svg-icon>
          Задать вопрос
        </Button>
        <Button class="with_icon secondary_white">
          <svg-icon name="Next"></svg-icon>
          Следующий урок
        </Button>
      </div>
    </div>
  </v-responsive>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from '@/UI/components/common/Button.vue';
import {LessonsTypesEnum} from '@/entity/common/lessons.types';
import {ICourseItem} from '@/entity/courseItem/courseItem.type';
import {RouterNameEnum} from '@/router/router.types';

@Component({
  components: {
    Button,
  },
})
export default class Lessons extends Vue {
  @Prop() readonly course!: ICourseItem;
  lessonType = LessonsTypesEnum;
  routeName = RouterNameEnum;
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
      width: 100%;
      overflow: scroll;
      height: 65%;

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
      border-top: 1px solid #f2f2f2;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 10px 8px 10px 8px;

      .with_icon {
        margin-top: 0;
        width: calc(50% - 12px) !important;
        font-size: 12px;
        padding: 15px 0;
        justify-content: center;
        margin-right: 12px;

        .svg-icon {
          fill: #ffffff;
          margin-right: 11px;
          height: 16px !important;
          width: 16px !important;
        }

        &.secondary_white {
          margin-right: 0;

          .svg-icon {
            margin-right: 11px;

            path {
              fill: #426df6 !important;
            }
          }
        }
      }
    }
  }
}
</style>
