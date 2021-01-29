<template>
  <div class="company-avatar">
    <img :src="avatar" alt="" class="company-avatar__img">
    <div class="company-avatar__right">
      <div class="company-avatar__title">{{ title }}</div>
      <div class="company-avatar__descr">{{ descr }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class CompanyAvatar extends Vue {
  @Prop() readonly avatar!: string;
  @Prop() readonly title!: string;
  @Prop() readonly descr!: string;
}
</script>
<style lang="scss">
.company-avatar {
  display: flex;
  align-items: center;

  &__img {
    width: 66px;
    height: 66px;
    margin-right: 10px;
  }

  &__right {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 24px;
    color: #060516;
  }

  &__descr {
    font-size: 12px;
    line-height: 1.5;
    color: #828282;
  }
}
</style>
