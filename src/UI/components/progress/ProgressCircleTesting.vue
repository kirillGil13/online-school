<template>
    <div class="circle">
        <div class="legend-value">
            <div ref="legend" class="legend">{{ result.totalRightAnswers }} из {{ result.questionLength }}</div>
        </div>
        <vue-ellipse-progress
            :progress="result.progress"
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

@Component
export default class ProgressCircleTesting extends Vue {
    @Prop() readonly result!: TestingResult;

    myFormatter(): string {
        return Math.ceil(this.result.progress).toString() + '%';
    }
    color(): string {
        if (this.result.progress <= 75 && this.result.progress > 20) {
            return '#F2994A';
        } else if (this.result.progress <= 20) {
            return '#EB5757';
        } else {
            return '#27AE60';
        }
    }
    colorLegend(): void {
        if (this.result.progress <= 75 && this.result.progress > 20) {
            (this.$refs.legend as HTMLElement).style.color = '#F2994A';
        } else if (this.result.progress <= 20) {
            (this.$refs.legend as HTMLElement).style.color = '#EB5757';
        } else {
            (this.$refs.legend as HTMLElement).style.color = '#27AE60';
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
    left: 35%;
    top: 51%;
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
