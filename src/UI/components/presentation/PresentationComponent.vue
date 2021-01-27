<template>
  <div class="presentation-card">
    <div class="presentation-card__top">
      <img :src="presentation.subcategories" alt="presentation" class="presentation-card__image">
      <svg-icon name="Share"></svg-icon>
    </div>
    <div class="presentation-card__bottom">
      <div class="presentation-card__document">
        <svg-icon name="Doc_PPT"></svg-icon>
      </div>
      <div class="presentation-card__title">{{ presentation.name }}</div>
      <div class="presentation-card__size"> {{ presentation.subcategories }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import PresentationsListItem from '@/entity/presentations/presentations';


@Component
export default class PresentationComponent extends Vue {
  @Prop() readonly presentation!: PresentationsListItem
}
</script>
