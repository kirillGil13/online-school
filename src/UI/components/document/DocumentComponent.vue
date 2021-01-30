<template>
<div class="document pa-6 box-container">
  <div>
    <div class="document__icon"><svg-icon name="Doc"></svg-icon></div>
    <div class="document__title">{{document.name}}</div>
    <div class="document__size">{{document.fileSize}} Kb</div>
  </div>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IDocument} from '../../../entity/document/document.types';

@Component
export default class DocumentComponent extends Vue {
  @Prop() readonly document!: IDocument;
}
</script>

<style lang="scss">
.document {
  width: calc((100% / 4) - 12px);
  margin-right: 12px;
  margin-bottom: 16px;
  &:nth-child(4n + 4){
    margin-right: 0;
  }
  &__icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(66, 109, 246, 0.12);
    border-radius: 12px;
    .svg-icon {
      width: 18px !important;
      height: 18px !important;
    }
  }
  &__title {
    font-size: 16px;
    margin-top: 7px;
  }
  &__size {
    color: #5F739C;
  }
}
</style>