<template>
    <div class="avatar-wrapper">
        <img
            class="avatar"
            :style="{ height: `${height}px`, width: `${width}px` }"
            :src="imageSourse"
            alt="Avatar"
        />
        <div v-if="star" class="star">
            <svg-icon name="Star" />
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
    @Prop({ required: false, default: false }) readonly star!: boolean;
}
</script>

<style scoped lang="scss">
.avatar {
    border-radius: $main_border_radius;
}
.star {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    bottom: 0;
    right: 0;
    background-color: $white;
    color: $blue;
    border-radius: 50%;
    height: 16px;
    width: 16px;
}
.avatar-wrapper {
    position: relative;
}
</style>
