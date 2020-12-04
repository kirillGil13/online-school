<template>
    <div class="rating row center" :class="[backgroundOrange ? sliderRating : courseRating]">
        <svg-icon name="Star"></svg-icon>
        <span>{{rating}}</span>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export default class Rating extends Vue {
    @Prop({default: 0}) readonly rating!: number;
    @Prop({default: false}) readonly backgroundOrange!: boolean;
    courseRating = 'course-rating';
    sliderRating = 'slider-rating';
}
</script>
<style lang="scss">
.rating {
    padding: 0 3px 0 3px;
    position: absolute;
    bottom: 8px;
    left: 8px;
    border-radius: 3px;
    color: #ffffff;
    &.course-rating {
        background: linear-gradient(180deg, #4F79FF 0%, #2150E7 100%);
        backdrop-filter: blur(4px);
    }
    &.slider-rating {
        background: linear-gradient(180deg, #F2CD4A 0%, #FF6D1B 100%);
        backdrop-filter: blur(4px);
    }
    span {
        margin-left: 3px;
    }
}
</style>