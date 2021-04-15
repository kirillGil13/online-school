<template>
  <div class="review-container" v-if="reviews.length !== 0">
    <h2 class="review-title">Отзывы</h2>

    <v-col class="mt-4 pa-0">
    <Reviews v-for="(item, index) in reviews" :review="item" :key="index"/>
    </v-col>
  </div>
  <div class="review-container" v-else>
      <h2>Пока отзывов нет</h2>
  </div>
</template>

<script lang="ts">
import { IReviews } from '@/entity/reviews/reviews.types';
import {Component, Prop, Vue} from 'vue-property-decorator';
import Button from '../common/Button.vue';
import Relation from '../common/Relation.vue';
import ReviewsFormComponent from '../forms/reviewForm/ReviewsFormComponent.vue';
import Reviews from './reviews/Reviews.vue'


@Component({
  components: {Relation, Button, ReviewsFormComponent, Reviews}
})
export default class ReviewsDiscussion extends Vue {
  @Prop( {default: []}) readonly reviews!: IReviews[];
}
</script>

<style lang="scss" scoped>
.review-title {
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5F739C;
}

.review-container {
    display: flex;
    flex-direction: column; 
    padding: 24px 0 0 0 ;
}
</style>
