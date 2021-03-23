<template>
    <div class="circle">
        <div class="legend-value">
            <div ref="legend" class="legend">{{ result.rightAnswers }} из {{ result.totalAnswers }}</div>
        </div>
        <vue-ellipse-progress
            :progress="result.percent"
            :size="120"
            :color="color()"
            emptyColor="#f2f2f2"
            :thickness="7"
            :emptyThickness="7"
            line="round"
            :legend="true"
            :legendFormatter="myFormatter"
            fontSize="24px"
            :fontColor="color()"
        />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TestingResult from '@/entity/testingResult/testingResult';
import {TestingResultComponentsEnum} from '../../../entity/common/testingResultComponents.types';

@Component
export default class ProgressCircleTesting extends Vue {
    @Prop() readonly result!: TestingResult;

    myFormatter(): string {
        return Math.ceil(this.result.percent).toString() + '%';
    }
    color(): string {
      let color = '';
      switch (this.result.result) {
        case TestingResultComponentsEnum.MIDDLE: color = '#F2994A'; break;
        case TestingResultComponentsEnum.BAD: color = '#EB5757'; break;
        case TestingResultComponentsEnum.GOOD: color = '#27AE60'; break;
      }
      return color;
    }
    colorLegend(): void {
      switch (this.result.result) {
        case TestingResultComponentsEnum.MIDDLE: (this.$refs.legend as HTMLElement).style.color = '#F2994A'; break;
        case TestingResultComponentsEnum.BAD: (this.$refs.legend as HTMLElement).style.color = '#EB5757'; break;
        case TestingResultComponentsEnum.GOOD: (this.$refs.legend as HTMLElement).style.color = '#27AE60'; break;
      }
    }
    mounted(): void {
        this.colorLegend();
    }
}
</script>
<style lang="scss">
.legend-value {
    position: absolute;
    left: 43px;
    top: 75px;
    font-size: 12px;
}
.ep-legend--value {
    margin-bottom: 7px;
}
.circle {
    position: relative;
    margin-right: 24px;
}
</style>
