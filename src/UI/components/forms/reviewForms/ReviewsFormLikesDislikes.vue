<template>
    <v-row no-gutters class="message-containers d-flex flex-row align-start mt-2" :style="{backgroundColor: background ? background : ''}">
        <v-col class="pa-0 d-flex flex-row align-end">
            <form-group class="width" field="review" :form="form" show-custom-error >
                <div class="review-text">
                    <div class="review-text__title">оставить отзыв</div>
                    <div class="review-text__actions">
                        <div class="review-text__set-review">
                            <v-textarea 
                                ref="contentTextArea"
                                no-resize
                                id="message"
                                :placeholder="!course.isLiked ? 'Напишите текст отзыва, чтобы сохранить оценку (обязательно)' : 'Напишите текст отзыва' "
                                rows="5"
                                hide-details
                                v-model="form.reviewText"
                            />
                        </div>
                        <div class="review-text__like-dislike">
                            <div :class="course.isLiked === true ? 'like--active' : 'like'">
                                <Relation svg-name="Finger"  @click="setReviewLike" />
                            </div>
                            <div :class="course.isDisliked === true ? 'dislike--active' : 'dislike'">
                                <Relation svg-class="svg-down" svg-name="Finger" @click="setReviewDisLike" />
                            </div>
                        </div>
                    </div>
                    <div class="review-text__button">
                        <Button :disabled="form.disabled" class="btn-send-rewiew" @submit="sendMessage">Отправить</Button>
                        <Button class="btn-like-dislike ml-3" @submit="buttonFunc">{{course.isLiked ? 'Оценить без отзыва' : 'Отменить оценку'}}</Button>
                    </div>
                </div>
            </form-group>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IUser } from '../../../../entity/user';
import { AuthStore } from '../../../../store/modules/Auth';
import FormGroup from '../../common/form/FormGroup.vue';
import { ReviewsForm } from '@/form/reviews/reviewsForm';
import Relation from '../../common/Relation.vue';
import { ICourseItem } from '@/entity/courseItem/courseItem.type';
import Button from '@/UI/components/common/Button.vue';


@Component({
    components: {
        FormGroup,
        Relation,
        Button
    },
})
export default class ReviewsFormLikesDislikes extends Vue {
    @Prop() readonly form!: ReviewsForm;
    @Prop({default:''}) readonly background?: string;
    @Prop() readonly course!: ICourseItem;

    mounted(): void {
        (this.$refs.contentTextArea as HTMLElement).focus()
    }

    get user(): IUser | null {
        return AuthStore.user;
    }

    cancel(): void {
        this.form.reviewText = '';
        this.form.reviewId = null;
        this.form.isLike = false;
    }

    sendMessage():void {
      this.$emit('setReview')
    }

    setReviewLike() {
        if(this.course!.isLiked){
            this.course!.isLiked = false;
            this.course!.isDisliked = false;
            this.form.isLike = true
        }else {
            this.course!.isLiked = true;
            this.form.isLike = true
            this.course!.isDisliked = false;
        }
    }

    setReviewDisLike() {
        if(this.course!.isDisliked){
            this.course!.isLiked = false;
            this.course!.isDisliked = false;
            this.form.isLike = false
        }else {
            this.course!.isLiked = false;
            this.form.isLike = false;
            this.course!.isDisliked = true;
        }
    }

    buttonFunc() {
        if(this.course.isLiked) {
            this.$emit('setMark')
        }else{
            this.$emit('cancelDislike')
        }
    }

}
</script>

<style lang="scss">
.message-containers {
    flex-wrap: nowrap;
    padding: 24px;
    border: 1px solid #f2f2f2;
    box-sizing: border-box;
    box-shadow: 0px 14px 12px rgba(0, 0, 0, 0.01);
    border-radius: 12px;

    .review-text {
        &__title {
            font-weight: 600;
            font-size: 12px;
            line-height: 15px;
            display: flex;
            align-items: center;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #5f739c;
        }

        &__actions {
            display: flex;
        }

        &__set-review {
            flex: 10;
        }

        &__like-dislike {
            display: flex;
            padding-top: 12px;

            .like {
                .relation {
                    margin-right: 12px !important;
                }
                &--active {
                    .relation {
                        margin-right: 12px;
                    }

                    .icon-container {
                        background: rgba(39, 174, 96, 0.12);

                        svg path {
                            fill: #27AE60;
                        }
                    }
                }
            }

            .dislike {
                &--active {
                    .relation {
                        margin-right: 0;
                    }

                    .icon-container {
                        background: rgba(230, 70, 70, 0.12);

                        svg path {
                            fill: #e64646;
                        }
                    }
                }
                .relation {
                    margin-right: 0;
                }
            }
        }

        &__button {
            .btn-send-rewiew {
                padding: 10px 16px;
            }

            .btn-like-dislike {
                padding: 10px 16px;
                background: rgba(66, 109, 246, 0.12);
                color: #426DF6 !important;
            }
        }
    }

    .v-input__slot::before {
        border-style: none !important;
    }

    .v-input__slot::after {
        border-style: none !important;
    }
}

.width {
    width: 100%;
}
</style>
