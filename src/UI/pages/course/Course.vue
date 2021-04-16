<template>
    <v-col>
        <v-row>
            <v-col v-if="courseLoaded" :class="[$adaptive.isMobile ? 'pa-6' : '']">
                <Header :isBordered="true" :route="route" :title="course.name"></Header>
                <v-row :class="['mt-6', $adaptive.isMobile ? 'd-flex flex-column' : '']">
                    <router-view
                        @passFile="passFile"
                        @handleLike="handleLike"
                        @handleDisLike="handleDisLike"
                        @handleFavourite="handleFavourite"
                        @moveToNextLesson="moveToNextLesson"
                        @send="send"
                        @moveToPrevious="moveToPrevious"
                        @toggleShowSetReview="toggleShowSetReview"
                        @setReview="setReview"
                        @cancelDislike="cancelDislike"
                        @setMark="setMark"
                        :course="course"
                        :toggleOpenLikeDislikeForm="toggleOpenLikeDislikeForm"
                        :formReview="reviewsForm"
                        :isSetReview="isSetReview"
                        :last-lesson="lastLesson"
                        :isFavourite="course.isFavourite"
                        :isDisliked="course.isDisliked"
                        :isLiked="course.isLiked"
                    ></router-view>
                    <div
                        class="course"
                        v-if="!$route.params.lessonId"
                        :style="{ width: $adaptive.isMobile ? '100%' : '', order: $adaptive.isMobile ? 2 : '' }"
                    >
                        <v-responsive :aspect-ratio="16 / 9" content-class="course-container" @click="pushToCurrent">
                            <v-img
                                :aspect-ratio="16 / 9"
                                width="100%"
                                height="100%"
                                class="course-cover"
                                :src="course.photoLink"
                            >
                                <div class="play-button"></div>
                                <div class="course-info views">
                                    <v-icon color="#ffffff" class="mr-1" style="margintop: 2px" x-small>mdi-eye</v-icon
                                    >{{ course.countViews }}
                                </div>
                                <div class="course-info duration">
                                    <v-icon color="#ffffff" class="mr-1" style="margintop: 2px" x-small
                                        >mdi-clock-time-four-outline</v-icon
                                    >{{ course.totalDuration }}
                                </div>
                            </v-img>
                        </v-responsive>
                        <v-row
                            no-gutters
                            :class="['course-video-row mt-4 ml-4', $adaptive.isMobile ? 'justify-center' : '']"
                        >
                            <Relation
                                svg-name="Finger"
                                :title="$adaptive.isMobile ? '' : 'Нравится'"
                                :class="course.isLiked && 'like-active'"
                                @click="handleLike(false)"
                            />
                            <Relation
                                svg-class="svg-down"
                                :class="course.isDisliked && 'dislike-active'"
                                svg-name="Finger"
                                @click="handleDisLike(false)"
                                :title="$adaptive.isMobile ? '' : 'Не нравится'"
                            />
                            <Relation
                                svg-name="Chosen"
                                :active="course.isFavourite"
                                :title="$adaptive.isMobile ? '' : 'В избранное'"
                                @click="handleFavourite"
                            />
                        </v-row>
                        <v-row no-gutters class="mt-4">
                            <template v-if="toggleOpenLikeDislikeForm">
                                <ReviewsFormLikesDislikes
                                    :form="reviewsForm"
                                    :course="course"
                                    @setReview="setReview"
                                    @cancelDislike="cancelDislike"
                                    @setMark="setMark"
                                />
                            </template>
                        </v-row>
                        <v-col :class="['box-container mt-6', $adaptive.isMobile ? 'pa-3' : 'pa-5']">
                            <div class="desc__container">
                                <div class="desc__container--title">Автор курса</div>
                                <div class="desc__container--author d-flex flex-column">
                                    <div class="author--title d-flex justify-space-between align-center">
                                        <div>
                                            <v-avatar class="mr-3">
                                                <template v-slot:default v-if="course.author.photoLink">
                                                    <v-img :src="course.author.photoLink" alt="" />
                                                </template>
                                                <template v-else v-slot:default>
                                                    <svg-icon name="Camera"></svg-icon>
                                                </template>
                                            </v-avatar>
                                            {{ course.author.name }}
                                            {{ course.author.lastName }}
                                        </div>

                                        <div class="author--socials">
                                            <a
                                                :href="`https://facebook.com/${course.author.facebook_link}`"
                                                target="_blank"
                                                v-if="course.author.facebook_link"
                                            >
                                                <v-btn class="white--text mr-2 mt-0" icon small>
                                                    <v-icon small> mdi-facebook </v-icon>
                                                </v-btn>
                                            </a>
                                            <a
                                                :href="`https://instagram.com/${course.author.instagram_link}`"
                                                target="_blank"
                                                v-if="course.author.instagram_link"
                                            >
                                                <v-btn class="white--text mr-2 mt-0" color="red lighten-3" icon small>
                                                    <v-icon small> mdi-instagram </v-icon>
                                                </v-btn>
                                            </a>
                                            <a
                                                :href="`https://vk.com/${course.author.vk_link}`"
                                                target="_blank"
                                                v-if="course.author.vk_link"
                                            >
                                                <v-btn class="white--text mr-2 mt-0" color="primary" icon small>
                                                    <v-icon color="#ffffff" small> mdi-vk </v-icon>
                                                </v-btn>
                                            </a>
                                            <a
                                                :href="`https://t.me/${course.author.telegram}`"
                                                target="_blank"
                                                v-if="course.author.telegram"
                                            >
                                                <v-btn class="white--text mt-0" color="white" icon small>
                                                    <v-icon small> mdi-telegram </v-icon>
                                                </v-btn>
                                            </a>
                                        </div>
                                    </div>

                                    <div
                                        class="author-description my-4 ml-2 wrap-text"
                                        ref="authorDescription"
                                        v-html="course.author.description"
                                    />
                                    <div v-if="!showAll" class="show-all ml-2" @click="showAll = true">
                                        Показать полностью
                                    </div>
                                </div>
                            </div>
                            <h5 style="color: #5f739c; font-weight: 600; font-size: 12px">ОПИСАНИЕ КУРСА</h5>
                            <div class="desc wrap-text" v-html="course.description" />
                        </v-col>
                        <v-col :class="['box-container mt-6', $adaptive.isMobile ? 'pa-3' : 'pa-6']" class="reviews">
                            <div class="desc__review" v-if="!$adaptive.isMobile">
                                <div class="desc__review--container">
                                    <div class="desc__reiting">
                                        <div
                                            class="desc__reiting--count"
                                            :style="{ color: course.raiting > 6.5 ? '#27AE60' : '#5F739C' }"
                                        >
                                            {{ course.raiting ? course.raiting : 0 }}
                                        </div>
                                        <div class="desc__reiting--subtitle">общий рейтинг</div>
                                    </div>

                                    <div class="desc__icons">
                                        <div class="desc__icons--like">
                                            <Relation
                                                :key="componentKey"
                                                svg-name="Finger"
                                                :title="
                                                    $adaptive.isMobile ? '' : course.countLikes ? course.countLikes : 0
                                                "
                                                isRaiting="true"
                                            />
                                        </div>

                                        <div class="desc__icons--dislike">
                                            <Relation
                                                :key="componentKey"
                                                isRaiting="true"
                                                svg-class="svg-down"
                                                svg-name="Finger"
                                                :title="
                                                    $adaptive.isMobile
                                                        ? ''
                                                        : course.countDislikes
                                                        ? course.countDislikes
                                                        : 0
                                                "
                                            />
                                        </div>
                                    </div>

                                    <div class="desc__btn-send-review">
                                        <Button @submit="toggleShowSetReview">Написать отзыв</Button>
                                    </div>
                                </div>

                                <template v-if="isSetReview">
                                    <reviews-form-component
                                        :form="reviewsForm"
                                        @setReview="setReview"
                                        :course="course"
                                    />
                                </template>
                            </div>

                            <div class="desc__review--mobile" v-else="$adaptive.isMobile">
                                <div class="d-flex flex-column">
                                    <div class="desc__reiting--mobile d-flex align-center">
                                        <v-col class="d-flex flex-column align-center" style="flex:1">
                                            <div
                                                class="desc__reiting--count"
                                                :style="{ color: course.raiting > 6.5 ? '#27AE60' : '#5F739C' }"
                                            >
                                                {{ course.raiting ? course.raiting : 0 }}
                                            </div>
                                            <div class="desc__reiting--subtitle">общий рейтинг</div>
                                        </v-col>
                                         <v-col class="desc__icons mx-0" style="border: none; flex: 2;">
                                            <div class="desc__icons--like ">
                                                <Relation
                                                    :key="componentKey"
                                                    svg-name="Finger"
                                                    :title=" course.countLikes
                                                            ? course.countLikes
                                                            : 0
                                                    "
                                                    isRaiting="true"
                                                    s
                                                />
                                            </div>

                                            <div class="desc__icons--dislike">
                                                <Relation
                                                    :key="componentKey"
                                                    isRaiting="true"
                                                    svg-class="svg-down"
                                                    svg-name="Finger"
                                                    :title="
                                                            course.countDislikes
                                                            ? course.countDislikes
                                                            : 0
                                                    "
                                                />
                                            </div>
                                        </v-col>
                                    </div>
                                    <div class="desc__btn-send-review--mobile">
                                         <Button @submit="toggleShowSetReview" fullWidth>Написать отзыв</Button>
                                    </div>
                                </div>

                                <template v-if="isSetReview">
                                    <reviews-form-component
                                        :form="reviewsForm"
                                        @setReview="setReview"
                                        :course="course"
                                    />
                                </template>
                            </div>

                            <div>
                                <ReviewsDiscussion :reviews="reviews" isReview />
                            </div>
                        </v-col>
                    </div>
                    <div
                        :class="['lessons', $adaptive.isMobile ? 'mb-3' : 'ml-4']"
                        :style="{ width: $adaptive.isMobile ? '100%' : '' }"
                    >
                        <Lessons ref="lessons" :course="course" @moveToNextLesson="moveToNextLesson" />
                        <v-col class="box-container pa-6 pb-8 materials" v-if="!$adaptive.isMobile && files === []">
                            <h5>МАТЕРИАЛЫ К УРОКУ</h5>
                            <Doc v-for="(item, index) in files" :key="index" :material="item" />
                        </v-col>
                    </div>
                </v-row>
            </v-col>
            <v-col v-if="!courseLoaded">
                <v-overlay :value="!courseLoaded">
                    <v-progress-circular indeterminate :size="150"></v-progress-circular>
                </v-overlay>
            </v-col>
        </v-row>
    </v-col>
</template>
<script lang="ts">
import Header from '../../components/common/Header.vue';
import Button from '../../components/common/Button.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { HeaderRouteType } from '@/entity/common/header.types';
import Relation from '../../components/common/Relation.vue';
import Lessons from '@/UI/components/lessons/Lessons.vue';
import { CourseItemStore } from '@/store/modules/CourseItem';
import Doc from '@/UI/components/common/Doc.vue';
import { LessonsTypesEnum } from '../../../entity/common/lessons.types';
import { ILessonItemFiles } from '../../../entity/lessonItem/lessonItem.types';
import { RelationStore } from '../../../store/modules/Relation';
import Discussion from '../../components/discussion/Discussion.vue';
import { IDefaultCourseItem } from '@/entity/courseItem/courseItemDefault';
import { ReviewsForm } from '@/form/reviews/reviewsForm';
import { ICourseItem, ICourseLessons } from '@/entity/courseItem/courseItem.type';
import { IReviews } from '@/entity/reviews/reviews.types';
import { ReviewsStore } from '../../../store/modules/Reviews';
import ReviewsDiscussion from '../../components/reviewsDiscussion/ReviewsDiscussion.vue';
import ReviewsFormComponent from '../../components/forms/reviewForms/ReviewsFormComponent.vue';
import ReviewsFormLikesDislikes from '../../components/forms/reviewForms/ReviewsFormLikesDislikes.vue';
@Component({
    components: {
        Lessons,
        Header,
        Button,
        Relation,
        Doc,
        Discussion,
        ReviewsDiscussion,
        ReviewsFormComponent,
        ReviewsFormLikesDislikes,
    },
})
export default class Course extends Vue {
    route: HeaderRouteType = {
        name: this.$routeRules.TrainingMain,
        label: 'Вернуться к списку курсов',
    };

    interval!: NodeJS.Timeout;
    files: ILessonItemFiles[] = [];
    reviewsForm = new ReviewsForm();
    isSetReview = false;
    showAll = false;
    componentKey = 0;
    toggleOpenLikeDislikeForm = false;

    @Watch('$route.params.lessonId', { immediate: true })
    async onChangeRoute(val: string, oldVal: string): Promise<void> {
        await this.fetchData();
        await ReviewsStore.fetchAll(this.$route.params.id);
        await this.reviewsForm.clearData();
        this.isSetReview = false;
    }

    @Watch('showAll')
    onChangeShall(): void {
        if (this.showAll) {
            (this.$refs.authorDescription as HTMLElement).style.overflow = 'none';
            (this.$refs.authorDescription as HTMLElement).style.maxHeight = 'unset';
        }
    }

    @Watch('course.countLikes')
    onChangeLike(val: string, oldVal: string): void {
        Vue.set(this.course!, 'countLikes', val);
    }

    mounted() {
        if ((this.$refs.authorDescription as HTMLElement)?.clientHeight > 72) {
            this.showAll = true;
        }
    }

    beforeUpdate() {
        this.componentKey += 0;
    }

    get reviews(): IReviews[] {
        return ReviewsStore.reviews;
    }

    get reviewsLoaded(): boolean {
        return ReviewsStore.reviewsLoaded;
    }

    get lastLesson(): number {
        return this.course!.lessons[this.course!.lessons.length - 1].number;
    }

    get course(): ICourseItem | null {
        return CourseItemStore.courseItem;
    }

    get defaultCourse(): IDefaultCourseItem {
        return CourseItemStore.courseItemDefault;
    }

    get courseLoaded(): boolean {
        return CourseItemStore.courseLoaded;
    }

    startTimer(): void {
        this.interval = setTimeout(() => {
            ReviewsStore.fetchAll(this.$route.params.lessonId);
            this.startTimer();
        }, 10000);
    }

    toggleShowSetReview(): void {
        this.isSetReview = !this.isSetReview;
        this.reviewsForm.isLike = null;
        this.reviewsForm.clearData();
    }

    stopTimer(): void {
        clearTimeout(this.interval);
    }

    findCurrent(lessons: ICourseLessons[]): number {
        if (lessons.find((el) => el.status === LessonsTypesEnum.UN_DONE || el.status === LessonsTypesEnum.LOCKED)) {
            return lessons.find(
                (el) => el.status === LessonsTypesEnum.UN_DONE || el.status === LessonsTypesEnum.LOCKED
            )!.id;
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
            params: { lessonId: this.findCurrent(this.course!.lessons).toString() },
        });
    }

    getLessonId(lessons: ICourseLessons[], number: number, next: boolean): number {
        if (next) {
            return lessons.find((item) => item.number === number + 1)!.id;
        } else return lessons.find((item) => item.number === number - 1)!.id;
    }

    moveToNextLesson(number: number): void {
        this.$router.push({
            name: this.$routeRules.Lesson,
            params: {
                lessonId: this.getLessonId(this.course!.lessons, number, true).toString(),
            },
        });
    }

    moveToPrevious(number: number): void {
        this.$router.push({
            name: this.$routeRules.Lesson,
            params: {
                lessonId: this.getLessonId(this.course!.lessons, number, false).toString(),
            },
        });
    }

    send(): void {
        this.fetchData();
    }

    cancelDislike() {
        this.course!.isDisliked = false;
        this.course!.isLiked = false;
        this.toggleOpenLikeDislikeForm = false;
        this.reviewsForm.clearData();
        this.reviewsForm.isLike = null;
    }

    async created(): Promise<void> {
        await this.fetchData();
        await ReviewsStore.fetchAll(this.$route.params.id);
        if (this.courseLoaded) {
            document.title = this.course!.name + ' - ' + 'ONELINKS';
        }
    }

    async setMark() {
        await RelationStore.postLikeDislike({
            param: this.$route.params.id,
            relation: { is_like: this.reviewsForm.isLike },
        });
        Vue.set(
            this.course!,
            'countLikes',
            this.reviewsForm.isLike
                ? this.course!.countLikes + 1
                : this.course!.countLikes !== 0
                ? this.course!.countLikes - 1
                : 0
        );
        Vue.set(
            this.course!,
            'countDislikes',
            !this.reviewsForm.isLike
                ? this.course!.countDislikes + 1
                : this.course!.countDislikes !== 0
                ? this.course!.countDislikes - 1
                : 0
        );
        await ReviewsStore.fetchAll(this.$route.params.id);
        await this.reviewsForm.clearData();
        this.toggleOpenLikeDislikeForm = false;
    }

    async fetchData(): Promise<void> {
        await CourseItemStore.fetchData(this.$route.params.id);
    }

    async handleLike(empty: boolean): Promise<void> {
        if (this.course?.isLiked) {
            await RelationStore.deleteLikeDislike(this.$route.params.id);
            await ReviewsStore.fetchAll(this.$route.params.id);
            this.course!.isLiked = false;
            this.course!.isDisliked = false;

            if (empty) {
                this.isSetReview = false;
            } else {
                this.toggleOpenLikeDislikeForm = false;
            }

            this.reviewsForm.clearData();
        } else {
            this.course!.isDisliked = false;
            this.course!.isLiked = true;

            if (empty) {
                this.isSetReview = true;
            } else {
                this.toggleOpenLikeDislikeForm = true;
            }

            this.reviewsForm.isLike = true;
        }
    }

    async handleDisLike(empty: boolean): Promise<void> {
        if (this.course!.isDisliked) {
            await RelationStore.deleteLikeDislike(this.$route.params.id);
            await ReviewsStore.fetchAll(this.$route.params.id);
            this.course!.isDisliked = false;
            this.course!.isLiked = false;

            if (empty) {
                this.isSetReview = false;
            } else {
                this.toggleOpenLikeDislikeForm = false;
            }

            this.reviewsForm.isLike = null;
            this.reviewsForm.clearData();
        } else {
            this.course!.isLiked = false;
            this.course!.isDisliked = true;

            if (empty) {
                this.isSetReview = true;
            } else {
                this.toggleOpenLikeDislikeForm = true;
            }
            this.reviewsForm.isLike = false;
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

    async setReview(): Promise<void> {
        await RelationStore.postLikeDislike({
            param: this.$route.params.id,
            relation: { is_like: this.reviewsForm.isLike, reviewText: this.reviewsForm.reviewText },
        });
        Vue.set(
            this.course!,
            'countLikes',
            this.reviewsForm.isLike
                ? this.course!.countLikes + 1
                : this.course!.countLikes !== 0
                ? this.course!.countLikes - 1
                : 0
        );
        Vue.set(
            this.course!,
            'countDislikes',
            !this.reviewsForm.isLike
                ? this.course!.countDislikes + 1
                : this.course!.countDislikes !== 0
                ? this.course!.countDislikes - 1
                : 0
        );
        await ReviewsStore.fetchAll(this.$route.params.id);
        await this.reviewsForm.clearData();
        this.isSetReview = false;
        this.toggleOpenLikeDislikeForm = false;
    }
}
</script>
<style lang="scss" >
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
        border: 1px solid #f2f2f2;
        position: relative;
        padding: 16px;
        background: #ffffff;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16);
        border-radius: 8px;

        &:before {
            z-index: 9999999;
            content: '';
            position: absolute;
            bottom: 100%;
            left: 76px;
            border: 9px solid transparent;
            border-bottom-color: #ffffff;
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
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 1rem;
    margin-bottom: 1rem;

    &--title {
        font-style: normal;
        font-size: 12px;
        line-height: 15px;
        display: flex;
        align-items: center;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #5f739c;
        font-weight: 600;
        margin: 0 0 1.3rem 0;
    }

    &--author {
        display: flex;
        justify-content: space-between;

        .author--title {
            font-weight: 600;
        }

        .author--socials {
            display: flex;
        }
    }
}

.desc__review {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 24px;
    border-bottom: 1px solid #f2f2f2;

    &--container {
        display: flex;
        justify-content: space-around;
        align-items: baseline;
        margin-bottom: 24px;
    }
}

.reviews {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
}

.desc__reiting {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    border-right: 1px solid #f2f2f2;
    margin-right: 2rem;

    &--count {
        font-weight: 600;
        font-size: 48px;
        line-height: 58px;
        display: flex;
        align-items: center;
    }

    &--subtitle {
        font-size: 12px;
        line-height: 150%;
        display: flex;
        align-items: center;
        color: #5f739c;
    }
}

.desc__icons {
    display: flex;
    width: 30%;
    border-right: 1px solid #f2f2f2;
    margin-right: 2rem;
    height: 100%;
    align-items: center;

    &--dislike {
        .icon-container {
            background: rgba(230, 70, 70, 0.12);

            svg path {
                fill: #e64646;
            }
        }
    }

    &--like {
        .icon-container {
            background: rgba(39, 174, 96, 0.12);

            svg path {
                fill: #27ae60;
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
    color: hsla(0, 0%, 100%, 0.74);
    cursor: pointer;
    -webkit-transition: 0.2s;
    -o-transition: 0.2s;
    transition: all ease 0.5s;
    width: 68px;
    height: 68px;
    border-radius: 100%;
    border: 3px solid #fff;
    z-index: 2;

    &:before {
        content: '';
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

.like-active {
    .icon-container {
        background: rgba(39, 174, 96, 0.12);

        svg path {
            fill: #27ae60;
        }
    }
}

.dislike-active {
    .icon-container {
        background: rgba(230, 70, 70, 0.12);

        svg path {
            fill: #e64646;
        }
    }
}

.author-description {
    overflow: hidden;
    max-height: 72px;
}

.show-all {
    font-size: 14px;
    line-height: 170%;
    display: flex;
    align-items: center;
    color: #426df6;
    cursor: pointer;
}
</style>
