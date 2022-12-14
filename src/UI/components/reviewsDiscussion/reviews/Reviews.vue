<template>
    <div>
        <div class="d-flex flex-row cont align-center">
            <v-badge avatar overlap bottom color="none" offset-x="22" offset-y="22" class="mr-3">
                <template v-slot:badge>
                    <v-avatar size="23" v-if="review.isLike" :style="{ backgroundColor: '#E5F5EC' }">
                        <svg-icon name="Finger" class="finger-up" color="#27AE60" />
                    </v-avatar>
                    <v-avatar :style="{ backgroundColor: '#FCE9E9' }" v-else>
                        <svg-icon name="Finger" color="#E64646" class="finger-up svg-down down" />
                    </v-avatar>
                </template>

                <v-avatar size="60">
                    <v-img :src="review.author.photoLink"></v-img>
                </v-avatar>
            </v-badge>
            <div class="d-flex flex-column review-container">
                <div class="review py-3 px-4">
                    <v-col class="pa-0">
                        <v-row no-gutters class="d-flex align-center justify-space-between mb-3">
                            <h4 class="mr-3">{{ review.fullName }}</h4>
                            <div class="desc">{{ review.createdAt }}</div>
                        </v-row>
                        <v-row no-gutters :id="'review' + review.id">
                            {{ review.reviewText }}
                        </v-row>
                    </v-col>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Relation from '../../common/Relation.vue';
import { ReviewTypesEnum } from '../../../../entity/common/reviews.types';
import { IReviews } from '@/entity/reviews/reviews.types';

@Component({
    components: { Relation },
})
export default class Reviews extends Vue {
    @Prop({ required: true, default: [] }) readonly review!: IReviews;
    reviewType = ReviewTypesEnum;
}
</script>

<style lang="scss" scoped>
$badge-min-width: 23px;
.cont {
    flex-wrap: nowrap !important;
}

.review-container {
    width: 100%;
}

.review {
    border-radius: 2px 16px 16px 16px;
    width: 100%;

    .desc {
        font-size: 12px;
        font-size: 12px;
        line-height: 150%;
        display: flex;
        align-items: center;
        color: #5f739c;
    }

    .relation {
        margin-right: 0;
        font-size: 12px;

        .icon-container {
            width: auto;
            height: auto;
            background-color: transparent;
            margin-right: 4px;
        }
    }
}

.review-action {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    color: #426df6;

    .svg-up {
        transform: rotate(180deg);
    }
}

.v-badge--avatar {
    .v-badge__badge {
        .v-avatar {
            min-width: none !important;
            max-width: none !important;
            width: 26px !important;
            height: 26px !important;
        }
    }
}
</style>
