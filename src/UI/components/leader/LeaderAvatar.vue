<template>
  <div class="company-leader">
    <img :src="leader.userInfo.avatar" alt="" class="company-leader__img">
    <div class="company-leader__name">{{ leader.userInfo.name }} {{ leader.userInfo.surname }}</div>
    <div class="company-leader__role">{{ leader.direction }}</div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ILeader} from '@/entity/leader';

@Component
export default class LeaderAvatar extends Vue {
  @Prop() readonly leader!: ILeader;
}
</script>
<style lang="scss">
.company-leader {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__img {
    width: 72px;
    height: 72px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    border-radius: 100%;
    object-fit: cover;
  }

  &__name {
    font-size: 12px;
    line-height: 1.5;
    color: #060516;
    text-align: center;
    margin-top: 8px;
  }

  &__role {
    text-align: center;
    color: #060516;
    opacity: 0.6;
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
