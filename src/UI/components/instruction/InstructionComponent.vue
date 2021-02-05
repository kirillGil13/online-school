<template>
  <div :class="['instruction', type === instructionType.Done ? 'done' : '', type === instructionType.Locked ? 'locked' : '']">
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {InstructionsTypesEnum} from '@/entity/common/instructions.types';

@Component
export default class InstructionComponent extends Vue {
  @Prop() readonly type!: string;
  instructionType = InstructionsTypesEnum;
}
</script>

<style lang="scss">
.instruction {
  padding: 8px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16);
  background: #FFFFFF;
  border-radius: 8px;
  &::after {
    content: '';
    width: 20px;
    height: 8px;
    transform: matrix(1, 0, 0, -1, 0, 0);
  }
  &.done {
    background: linear-gradient(0deg, rgba(39, 174, 96, 0.08), rgba(39, 174, 96, 0.08)), #FFFFFF;
    border: 1px solid rgba(39, 174, 96, 0.12);
  }
  &.locked {
    background: #F2F2F2;
    border: 1px solid #E0E0E0;
  }
}
</style>