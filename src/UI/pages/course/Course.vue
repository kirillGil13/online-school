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
                        @proceed="proceed"
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
                                <div class="course-info views"><v-icon color="#ffffff" class="mr-1" style="marginTop: 2px" x-small>mdi-eye</v-icon>{{course.countViews}}</div>
                                <div class="course-info duration "><v-icon color="#ffffff" class="mr-1" style="marginTop: 2px" x-small>mdi-clock-time-four-outline</v-icon>{{course.totalDuration}}</div>
                            </v-img>
                        </v-responsive>
                        <v-row
                            no-gutters
                            :class="['mt-4 ml-6', $adaptive.isMobile ? 'justify-center' : '']"
                        >
                            <Relation
                                svg-name="Finger"
                                class="mb-4"
                                :title="$adaptive.isMobile ? '' : 'Нравится'"
                                :class="course.isLiked && 'like-active'"
                                @click="user.isSubscriptionActual ? handleLike({form: formName.likeDislike, formButton: false}) : activator = true"
                            />
                            <Relation
                                svg-class="svg-down"
                                class="mb-4"
                                :class="course.isDisliked && 'dislike-active'"
                                svg-name="Finger"
                                @click="user.isSubscriptionActual ? handleDisLike({form: formName.likeDislike, formButton: false}) : activator = true"
                                :title="$adaptive.isMobile ? '' : 'Не нравится'"
                            />
                            <Relation
                                svg-name="Chosen"
                                class="mb-4"
                                :active="course.isFavourite"
                                :title="$adaptive.isMobile ? '' : 'В избранное'"
                                @click="handleFavourite"
                                :class="course.isFavourite && 'rotateIcon'"
                            />
                        </v-row>
                        <v-row no-gutters class="mb-6" v-if="toggleOpenLikeDislikeForm">
                            <template >
                                <ReviewsFormLikesDislikes
                                    :form-name="formName.likeDislike"
                                    :form="reviewsForm"
                                    :course="course"
                                    @setReview="setReview"
                                    @cancelDislike="cancelDislike"
                                    @setMark="setMark"
                                    @handleLike="handleLike"
                                    @handleDisLike="handleDisLike"
                                />
                            </template>
                        </v-row>
                      <v-col v-if="!user.isSubscriptionActual" class="sub-card box-container d-flex flex-column justify-center align-center mb-6" :class="[ $adaptive.isMobile ? 'pa-4' : 'pa-6']">
                        <Subscription/>
                        <Button class="with_icon subs_button" @submit="activator = true"><svg-icon name="Subs_Play_Btn" class="mr-2 svg-16"></svg-icon>Смотреть по подписке</Button>
                      </v-col>
                        <v-col :class="['box-container', $adaptive.isMobile ? 'pa-3' : 'pa-5']">
                            <div class="desc__container">
                                <div class="desc__container--title">Автор курса</div>
                                <div class="desc__container--author d-flex flex-column">
                                    <div class="author--title d-flex" :class="[$adaptive.isMobile ? 'flex-column' : 'justify-space-between align-center']">
                                        <div class="d-flex flex-row" @click="proceed(course.author.id)" :style="{cursor: 'pointer'}">
                                            <v-avatar class="mr-3" :color="course.author.photoLink ? '#F0F2F6' :randomColor(course.author.id % 10)">
                                                <template v-slot:default v-if="course.author.photoLink">
                                                    <v-img :src="course.author.photoLink" alt="" />
                                                </template>
                                                <template v-else v-slot:default>
                                                    <span style="color: #fff" class="font-weight-bold">{{(course.author.name[0] + course.author.lastName[0]).toUpperCase()}}</span>
                                                </template>
                                            </v-avatar>
                                          <div class="d-flex justify-center flex-column">
                                            <div>
                                              {{ course.author.name }}
                                            </div>
                                            <div>
                                              {{ course.author.lastName }}
                                            </div>
                                          </div>
                                        </div>
                                      <Socials :class="[$adaptive.isMobile && 'mt-3 ml-3']" :vk="course.author.vk_link" :facebook-link="course.author.facebook_link"
                                               :instagram-link="course.author.instagram_link" :telegram="course.author.telegram" :site-link="course.author.site_link"/>
                                    </div>
                                    <div
                                        class="author-description my-4 ml-2 wrap-text"
                                        id="authorDescription"
                                        ref="authorDescription"
                                        v-html="course.author.description"
                                    />
                                    <div v-if="showAll === false" class="show-all ml-2" @click="showAll = true">
                                        Показать полностью
                                    </div>
                                    <div v-if="showAll === true" class="show-all ml-2" @click="showAll = false">
                                        Скрыть
                                    </div>
                                </div>
                            </div>
                            <h5 style="color: #5f739c; font-weight: 600; font-size: 12px">ОПИСАНИЕ КУРСА</h5>
                            <div class="desc wrap-text" v-html="course.description" />
                        </v-col>
                        <v-col :class="['box-container mt-6', $adaptive.isMobile ? 'pa-3' : 'pa-6']" class="reviews sub-card">
                            <div class="desc__review">
                                <div class="desc__review--container" :style="{flexDirection: $adaptive.isMobile && 'column'}">
                                    <div class="d-flex align-center" style="height: 100%">
                                        <div class="desc__reiting" :style="{borderRight: $adaptive.isMobile && 'none', marginRight: $adaptive.isMobile && '0px'}">
                                            <div
                                                class="desc__reiting--count"
                                                :style="{ color: course.rating > 6.5 ? '#27AE60' : '#5F739C' }"
                                            >
                                                {{ course.rating ? course.rating : 0 }}
                                            </div>
                                        <div class="desc__reiting--subtitle">{{!course.rating ? 'слишком мало оценок' : 'общий рейтинг'}}</div>
                                    </div>
                                    <div class="desc__icons" style="height: 100%" :style="{borderRight: $adaptive.isMobile && 'none', marginRight: $adaptive.isMobile && '0'}">
                                        <div class="desc__icons--like">
                                            <Relation
                                                :key="componentKey"
                                                svg-name="Finger"
                                                :title="course.countLikes"
                                                @click="handleLike({form: formName.review, formButton: false})"
                                                isRaiting="true"
                                            />
                                        </div>

                                        <div class="desc__icons--dislike">
                                            <Relation
                                                :key="componentKey"
                                                isRaiting="true"
                                                svg-class="svg-down"
                                                svg-name="Finger"
                                                :title="course.countDislikes"
                                                @click="handleDisLike({form: formName.review, formButton: false})"
                                            />
                                        </div>
                                    </div>
                                    </div>
                                    <div class="desc__btn-send-review" :style="{width: $adaptive.isMobile && '100%', marginTop: $adaptive.isMobile &&  '14px'}" v-if="user.isSubscriptionActual">
                                        <Button @submit="toggleShowSetReview" :style="{width: $adaptive.isMobile && '100%'}">Написать отзыв</Button>
                                    </div>
                                </div>
                                <template v-if="isSetReview">
                                  <ReviewsFormLikesDislikes
                                      :form="reviewsForm"
                                      :form-name="formName.review"
                                      :course="course"
                                      @setReview="setReview"
                                      @cancelDislike="cancelDislike"
                                      @setMark="setMark"
                                      @handleLike="handleLike"
                                      @handleDisLike="handleDisLike"
                                  />
                                </template>
                            </div>
                            <div>
                                <ReviewsDiscussion :reviews="reviews" isReview/>
                            </div>
                        </v-col>
                    </div>
                    <div
                        :class="['lessons', $adaptive.isMobile ? 'mb-3' : 'ml-4']"
                        :style="{ width: $adaptive.isMobile ? '100%' : '' }"
                    >
                        <Lessons ref="lessons" :course="course" @moveToNextLesson="moveToNextLesson"/>
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
          <Modal :activator="activator" :max-width="1000" @activatorChange="activatorChange" color="#F2F2F2">
            <template v-slot:content>
              <SubscribeFormalization/>
            </template>
          </Modal>
          <Alert :show="showSuccess" :type="alertTypes.Success" @show="showSuccessAlert" text="Курс успешно добавлен в избранное"/>
          <Alert :show="showError" :type="alertTypes.Error" @show="showErrorAlert" text="Курс успешно удален из избранного"/>
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
import Socials from '../../components/socials/Socials.vue';
import {IUser} from '../../../entity/user';
import {AuthStore} from '../../../store/modules/Auth';
import SubscribeFormalization from '../../components/subscribeFormalization/SubscribeFormalization.vue';
import Subscription from '../../components/subscription/Subscription.vue';
import Modal from '../../components/common/Modal.vue';
import Alert from '../../components/common/Alert.vue';
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import {RouterNameEnum} from '../../../router/router.types';
import Router from 'vue-router';
import {ReviewsFormName} from '../../../form/reviews/reviewsForm.types';
@Component({
    components: {
      Alert,
      Modal,
      Subscription,
      SubscribeFormalization,
      Socials,
        Lessons,
        Header,
        Button,
        Relation,
        Doc,
        Discussion,
        ReviewsDiscussion,
        ReviewsFormComponent,
        ReviewsFormLikesDislikes
    },
})
export default class Course extends Vue {
    route: HeaderRouteType = {
        name: this.$routeRules.TrainingMain,
        label: 'Вернуться к списку курсов',
    };
    showSuccess = false;
    showError = false;
    alertTypes = AlertTypeEnum;
    activator = false;
    interval!: NodeJS.Timeout;
    files: ILessonItemFiles[] = [];
    reviewsForm = new ReviewsForm();
    isSetReview = false;
    showAll = false;
    componentKey = 0;
    toggleOpenLikeDislikeForm = false;
    formName = ReviewsFormName;


    @Watch('$route.params.lessonId', { immediate: true })
    async onChangeRoute(val: string, oldVal: string): Promise<void> {
        await this.fetchData();
        await ReviewsStore.fetchAll(this.$route.params.id);
        await this.autoDescriptionHeight();
        await this.reviewsForm.clearData();
        this.isSetReview = false;
    }


    autoDescriptionHeight(): void {
        if((this.$refs.authorDescription as HTMLElement)?.clientHeight <= 52){
            this.showAll = true;
        }else{
            this.showAll = false;
        }
    }

    @Watch('showAll')
    onChangeShall(): void {
        if (this.showAll === true) {
            (this.$refs.authorDescription as HTMLElement).style.overflow = 'none';
            (this.$refs.authorDescription as HTMLElement).style.maxHeight = 'unset';
        }

        if (this.showAll === false) {

            (this.$refs.authorDescription as HTMLElement).style.overflow = 'hidden';
            (this.$refs.authorDescription as HTMLElement).style.maxHeight = '65px';
        }
    }

    @Watch('course.countLikes')
    onChangeLike(val: string, oldVal: string): void {
        Vue.set(this.course!, 'countLikes', val);
    }

    beforeUpdate(): void {
        this.componentKey += 0;
    }

  proceed(id: number): void {
    this.$router.push({name: RouterNameEnum.LeaderPage, params: {id: id.toString()}});
  }

    randomColor(i: number): string {
        const COLORS = [
        '#56CCF2',
        '#BB6BD9',
        '#6FCF97',
        '#F2C94C',
        '#967CBA',
        '#FF9960',
        '#566FF2',
        '#FF5733',
        '#FF89C9',
        '#56F2DF',
        '#F38460',
        '#939ED6',
        '#F271A0',
        '#2ABF93',
        '#FF9C9C',
        '#6EC1F0',
        '#3B4244'
        ];
        return COLORS[i || 0];
    }

  showSuccessAlert(show: boolean): void {
    this.showSuccess = show;
  }

  showErrorAlert(show: boolean): void {
    this.showError = show;
  }


  activatorChange(act: boolean): void {
    this.activator = act;
  }


  get user(): IUser | null {
    return AuthStore.user;
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
     if (this.user!.isSubscriptionActual) {
       this.$router.push({
         name: this.$routeRules.Lesson,
         params: { lessonId: this.findCurrent(this.course!.lessons).toString() },
       });
     } else this.activator = true;

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

    cancelDislike(): void {
        this.course!.isDisliked = false;
        this.course!.isLiked = false;
        this.toggleOpenLikeDislikeForm = false;
        this.isSetReview = false;
        this.reviewsForm.clearData()
        this.reviewsForm.isLike = null;
        Vue.set(this.course!, 'countDislikes', this.course!.countDislikes - 1);
    }
    

    async created(): Promise<void> {
        if (this.courseLoaded) {
            document.title = this.course!.name + ' - ' + 'ONELINKS';
        }
    }

    async setMark(): Promise<void> {
      await RelationStore.deleteLikeDislike(this.$route.params.id);
        await RelationStore.postLikeDislike({
            param: this.$route.params.id,
            relation: { is_like: true},
        });
        await ReviewsStore.fetchAll(this.$route.params.id);
        await this.reviewsForm.clearData();
        this.toggleOpenLikeDislikeForm = false;
        this.isSetReview = false;
    }

    async fetchData(): Promise<void> {
        await CourseItemStore.fetchData(this.$route.params.id);
    }

  async handleLike(data: {form: string; formButton: boolean}): Promise<void> {
        if(this.course?.isDisliked) {
            await RelationStore.deleteLikeDislike(this.$route.params.id);
            await ReviewsStore.fetchAll(this.$route.params.id);
            Vue.set(this.course!, 'countDislikes', this.course!.countDislikes - 1);
        }

        if (this.course?.isLiked) {
          if (!data.formButton) {
            await RelationStore.deleteLikeDislike(this.$route.params.id);
            await ReviewsStore.fetchAll(this.$route.params.id);
            Vue.set(this.course!, 'countLikes', this.course!.countLikes - 1);
            this.course!.isLiked = false;
            this.course!.isDisliked = false;
            this.isSetReview = false;
            this.toggleOpenLikeDislikeForm = false;
            this.reviewsForm.clearData();
          }
        } else {
          if (!data.formButton) {
            if (data.form === this.formName.likeDislike) {
              this.isSetReview = false;
              this.toggleOpenLikeDislikeForm = true;
            } else {
              this.isSetReview = true;
              this.toggleOpenLikeDislikeForm = false;
            }
          }
            this.course!.isDisliked = false;
            this.course!.isLiked = true;
            Vue.set(this.course!, 'countLikes', this.course!.countLikes + 1);
            this.reviewsForm.isLike = true;
        }
    }

    async handleDisLike(data: {form: string; formButton: boolean}): Promise<void> {
        if(this.course?.isLiked) {
                await RelationStore.deleteLikeDislike(this.$route.params.id);
                await ReviewsStore.fetchAll(this.$route.params.id);
                Vue.set(this.course!, 'countLikes', this.course!.countLikes - 1);
        }

        if (this.course!.isDisliked) {
          if (!data.formButton) {
            await RelationStore.deleteLikeDislike(this.$route.params.id);
            await ReviewsStore.fetchAll(this.$route.params.id);
            this.course!.isDisliked = false;
            this.course!.isLiked = false;
            Vue.set(this.course!, 'countDislikes', this.course!.countDislikes - 1);
            this.reviewsForm.isLike = null;
            this.isSetReview = false;
            this.toggleOpenLikeDislikeForm = false;
            this.reviewsForm.clearData()
          }
        } else {
          if (!data.formButton) {
            if (data.form === this.formName.likeDislike) {
              this.isSetReview = false;
              this.toggleOpenLikeDislikeForm = true;
            } else {
              this.isSetReview = true;
              this.toggleOpenLikeDislikeForm = false;
            }
          }
            this.course!.isLiked = false;
            this.course!.isDisliked = true;
            Vue.set(this.course!, 'countDislikes', this.course!.countDislikes + 1);
            this.reviewsForm.isLike = false;
        }
    }



    async handleFavourite(): Promise<void> {
        if (!this.course!.isFavourite) {
            await RelationStore.postFavourite(this.$route.params.id); //eslint-disable-line
            await this.fetchData();
            this.showError = false;
            this.showSuccess = true;
        } else {
            await RelationStore.deleteFavourite(this.$route.params.id);
            await this.fetchData();
            this.showSuccess = false;
            this.showError = true;
        }
    }

    async setReview(): Promise<void> {
        await RelationStore.postLikeDislike({
            param: this.$route.params.id,
            relation: { is_like: this.reviewsForm.isLike, reviewText: this.reviewsForm.reviewText },
        });

        await ReviewsStore.fetchAll(this.$route.params.id);
        await this.reviewsForm.clearData();
        this.isSetReview = false;
        this.toggleOpenLikeDislikeForm = false;

    }
}
</script>
<style lang="scss" >

.sub-card {
    min-height: max-content;
}

.rotateIcon {
    svg {
        transform: rotate(0) !important;
    }
}
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
          .author-name {

          }
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
    padding-right: 24px;
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
      width: max-content;
    }
}

.desc__icons {
    display: flex;
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
    max-height: 65px;
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
