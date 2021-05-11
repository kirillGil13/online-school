<template>
          <v-row no-gutters class="mt-4 reviews" :style="{gridTemplateColumns: $adaptive.isMobile ? '25% 75%' : '13% 87%'}">
          <v-col class="pa-0">
            <v-badge avatar bottom color="none" overlap  offset-x="22" offset-y="22">
              <template v-slot:badge>
                <v-avatar size="23" v-if="review.isLike" :style="{ backgroundColor: '#E5F5EC'}">
                  <svg-icon name="Finger" class="finger-up" color="#27AE60" />
                </v-avatar>
                <v-avatar :style="{ backgroundColor: '#FCE9E9' }" v-else>
                  <svg-icon name="Finger" color="#E64646" class="finger-up svg-down down" />
                </v-avatar>
              </template>

              <v-avatar size="60" :color="review.author.photoLink ? '#F0F2F6' :randomColor(review.author.id % 10)">
                <v-img :src="review.author.photoLink" v-if="review.author.photoLink"></v-img>
                <span style="color: #fff" class="font-weight-bold" v-else>{{(review.author.name[0] + review.author.lastName[0].toUpperCase())}}</span>
              </v-avatar>
            </v-badge>
          </v-col>
            <div class="d-flex flex-column review-container mr-4">
                <div class="review">
                    <v-col class="pa-0">
                        <v-row no-gutters class="d-flex flex-row flex-nowrap align-center mb-1">
                          <div class="full-width review-author mr-3">
                            <h4 class="review-author">{{ review.fullName }}</h4>
                          </div>
                            <div class="desc">{{ review.createdAt }}</div>
                        </v-row>
                        <v-row no-gutters :id="'review' + review.id" class="review-text">
                            {{ review.reviewText }}
                        </v-row>
                    </v-col>
                </div>
            </div>
        </v-row>
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
}
</script>

<style lang="scss" scoped>
$badge-min-width: 23px;

.reviews {
  display: grid;
}
.cont {
    flex-wrap: nowrap !important;
  box-sizing: border-box;
}

.review-container {
    width: 100%;
}

.review {
    border-radius: 2px 16px 16px 16px;
    width: 100%;

  .review-author {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

    .desc {
        font-size: 10px;
        line-height: 150%;
        display: flex;
      white-space: nowrap;
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
  .review-text {
    word-break: break-word;
    word-wrap: break-word;
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
