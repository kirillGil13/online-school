<template>
    <div>
        <div class="avatar-wrapper">
            <img
                class="avatar"
                :style="{ height: `${height}px`, width: `${width}px` }"
                :src="imageSourse"
                alt="Avatar"
            />
            <div v-if="showStar" class="star" :class="starClass">
                <svg-icon name="Star" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AvatarSizeEnum } from '@/entity/common/avatar.types';
@Component
export default class Avatar extends Vue {
    @Prop({ required: true }) readonly imageSourse!: string;
    @Prop({ required: true }) readonly height!: number;
    @Prop({ required: true }) readonly width!: number;
    @Prop({ required: false, default: false }) readonly smallStar!: boolean;
    @Prop({ required: false, default: false }) readonly mediumStar!: boolean;
    @Prop({ required: false, default: AvatarSizeEnum.NONE })
    readonly starSize!: AvatarSizeEnum;

    get showStar(): boolean {
        return this.starSize !== AvatarSizeEnum.NONE;
    }

    get starClass(): string {
        switch (this.starSize) {
            case AvatarSizeEnum.MEDIUM:
                return 'medium-size';
            case AvatarSizeEnum.SMALL:
                return 'small-size';
            default:
                return '';
        }
    }
}
</script>

<style scoped lang="scss">
.small-size {
    height: 18px;
    width: 18px;
    bottom: 0;
    right: 0;
    .svg-icon {
        width: 12px !important;
        height: 12px !important;
    }
}
.medium-size {
    height: 32px;
    width: 32px;
    bottom: -5px;
    right: -5px;
    .svg-icon {
        width: 20px !important;
        height: 20px !important;
    }
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
