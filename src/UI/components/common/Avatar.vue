<template>
    <div>
        <div class="avatar-wrapper">
            <img
                class="avatar"
                :style="{ height: `${height}px`, width: `${width}px` }"
                :src="imageSourse"
                alt="Avatar"
            />
            <div
                v-if="smallStar || mediumStar"
                class="star"
                :class="{ 'small-size': smallStar, 'medium-size': mediumStar }"
            >
                <svg-icon
                    :height="smallStar ? '12' : mediumStar ? '20' : '8'"
                    :width="smallStar ? '12' : mediumStar ? '20' : '8'"
                    name="Star"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Avatar extends Vue {
    @Prop({ required: true }) readonly imageSourse!: string;
    @Prop({ required: true }) readonly height!: number;
    @Prop({ required: true }) readonly width!: number;
    @Prop({ required: false, default: false }) readonly smallStar!: boolean;
    @Prop({ required: false, default: false }) readonly mediumStar!: boolean;
}
</script>

<style scoped lang="scss">
.small-size {
    height: 18px;
    width: 18px;
    bottom: 0;
    right: 0;
}
.medium-size {
    height: 32px;
    width: 32px;
    bottom: -5px;
    right: -5px;
}
.avatar {
    border-radius: $main_border_radius;
}
.star {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: $white;
    color: $blue;
    border-radius: 50%;
}
.avatar-wrapper {
    display: inline-block;
    position: relative;
}
</style>
