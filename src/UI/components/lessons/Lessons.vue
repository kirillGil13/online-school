<template>
    <el-container class="box-container course-lessons-block">
        <div class="lesson-container">
            <ul class="lesson-list">
                <li
                    :class="[
                        'lesson',
                        lesson.type() === lessonType.IN_PROGRESS ? 'lesson-current' : '',
                        lesson.type() === lessonType.LOCKED ? 'lesson-locked' : '',
                    ]"
                    v-for="(lesson, index) in course.lessons"
                    :key="index"
                    @click="$emit('moveToLesson', lesson.id)"
                >
                    <svg-icon class="svg-wh" :name="lesson.type()"></svg-icon>
                    <el-col>
                        <span class="desc">Урок {{ lesson.id + 1 }}</span>
                        {{ lesson.title }}
                    </el-col>
                </li>
            </ul>
        </div>
        <el-col class="lesson-btn">
            <Button class="with_icon">
                <svg-icon name="Chat"></svg-icon>
                Задать вопрос
            </Button>
            <Button class="with_icon secondary">
                <svg-icon name="Next"></svg-icon>
                Следующий урок
            </Button>
        </el-col>
    </el-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CourseItem from '../../../entity/courseItem/courseItem';
import Button from '@/UI/components/common/Button.vue';
import { LessonsTypesEnum } from '@/entity/common/lessons.types';

@Component({
    components: {
        Button,
    },
})
export default class Lessons extends Vue {
    @Prop() course!: CourseItem;
    lessonType = LessonsTypesEnum;
}
</script>

<style lang="scss">
.course-lessons-block {
    display: flex;
    flex-direction: column;

    .lesson-container {
        width: 100%;
        overflow: scroll;
        height: 80%;
        ul {
            padding: 0;
            list-style: none;
            margin: 0;

            li {
                cursor: pointer;
                display: flex;
                flex-direction: row;
                align-items: center;
                font-size: 12px;
                color: #060516;
                padding: 12px 18px 12px 18px;

                &:hover {
                    background-color: rgba(87, 81, 183, 0.12) !important;
                }

                &.lesson-current {
                    background-color: rgba(87, 81, 183, 0.12);

                    &:nth-child(1) {
                        border-top-left-radius: 12px;
                        border-top-right-radius: 12px;
                    }
                }

                &.lesson-locked {
                    background-color: #f2f2f2;
                }

                .svg-wh {
                    height: 24px !important;
                    width: 24px !important;
                    margin-right: 14px;
                }

                .el-col {
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

    .lesson-btn {
        border-top: 1px solid #f2f2f2;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 8px 10px 8px;

        .with_icon {
            margin-top: 0;
            width: calc(50% - 12px) !important;
            font-size: 12px;
            padding-left: 0;
            padding-right: 0;
            justify-content: center;
            margin-right: 12px;

            .svg-icon {
                fill: #ffffff;
                margin-right: 11px;
                height: 16px !important;
                width: 16px !important;
            }

            &.secondary {
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
</style>
