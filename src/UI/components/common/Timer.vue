<template>
    <v-col>
        <div class="timer">{{ currentTimeTemp }} сек.</div>
    </v-col>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Timer extends Vue {
    @Prop() readonly currentTime!: number;
    currentTimeTemp: number;
    constructor() {
        super();
        this.currentTimeTemp = this.currentTime;
    }
    timer!: NodeJS.Timeout;
    isZero = false;
    @Watch('currentTimeTemp')
    onChangeTimer(time: number): void {
        if (time === 0) {
            this.stopTimer();
        }
    }
    startTimer(): void {
        this.timer = setTimeout(() => {
            --this.currentTimeTemp;
            this.startTimer();
        }, 1000);
    }
    changeTimer(): void {
        this.currentTimeTemp--;
    }
    stopTimer(): void {
        clearTimeout(this.timer);
        this.isZero = true;
        this.$emit('stop', this.isZero);
    }
    mounted(): void {
        this.startTimer();
    }
    destroyed(): void {
        this.stopTimer();
    }
}
</script>
<style lang="scss">
.timer {
    margin-top: 4px;
    width: 61px;
    height: 32px;
    background: rgba(87, 81, 183, 0.12);
    border-radius: 8px;
    color: #060516;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
