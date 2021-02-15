<template>
  <div class="task">
    <div class="task__title">{{ title }}</div>
    <div class="task__completion mt-1" :style="{color: color}">
      <ProgressCircle class="mr-1" :progress="progress" :emptyColor="emptyColor" :color="color"/>
      {{ userName }} выполнил задание на {{ progress }}%
    </div>
    <div class="desc-container d-flex flex-row justify-space-between mt-3">
      <div class="desc mr-7">Верных ответов:
        <span @click="activator = true" :style="{color: color}">{{ right }} из {{ total }}
          <svg-icon class="ml-1" name="Arrow_Down"></svg-icon>
        </span>
      </div>
      <div class="date mt-2 d-flex align-end">{{ date }}</div>
    </div>
    <Modal :activator="activator" @activatorChange="activatorChange">
      <template v-slot:content>
        <TestingResultComponentReadOnly @close="close"/>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ProgressCircle from '@/UI/components/progress/ProgressCircle.vue';
import Modal from '@/UI/components/common/Modal.vue';
import TestingResultComponentReadOnly
  from '@/UI/components/testing/TestingResultComponents/TestingResultComponentReadOnly.vue';

@Component({
  components: {TestingResultComponentReadOnly, Modal, ProgressCircle}
})
export default class Task extends Vue {
  @Prop() readonly progress!: number;
  @Prop() readonly title!: string;
  @Prop() readonly userName!: string;
  @Prop() readonly total!: number;
  @Prop() readonly right!: number;
  @Prop() readonly date!: string
  color = '';
  emptyColor = '';
  activator = false;

  activatorChange(act: boolean): void {
    this.activator = act;
  }
  close(): void {
    this.activator = false;
  }

  created(): void {
    if (this.progress > 75) {
      this.color = '#27AE60';
      this.emptyColor = 'rgba(39, 174, 96, 0.2)';
    } else if (this.progress <= 75 && this.progress > 45) {
      this.color = '#f2994a';
      this.emptyColor = 'rgba(242, 153, 74, 0.2)';
    } else {
      this.color = '#eb5757';
      this.emptyColor = 'rgba(235, 87, 87, 0.2)';
    }
  }
}
</script>

<style lang="scss">
.task {
  width: 100%;
  padding: 16px;
  background: #FFFFFF;
  border: 1px solid #F2F2F2;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border-radius: 5px;

  &__title {
    font-size: 14px;
    color: #4F79FF;
  }

  &__completion {

  }

  .desc-container {
    color: #5F739C;

    .desc {
      span {
        cursor: pointer;
      }
    }

    .date {
      font-size: 12px;
    }
  }
}
</style>