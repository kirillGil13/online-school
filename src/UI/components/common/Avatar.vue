<template>
    <div>
        <div class="avatar-wrapper">
            <v-avatar color="primary" rounded tile :size="size">
                <img
                    v-if="user.avatar"
                    :src="imageSource"
                    alt="Avatar"
                    class="avatar"
                />
                <span v-else class="white--text headline">{{ user.initials }}</span>
            </v-avatar>

            <div v-if="showStar" :class="starClass" class="star">
                <svg-icon name="Star" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AvatarSizeEnum } from '@/entity/common/avatar.types';
import { IUser } from '@/entity/user';
import { AuthStore } from '@/store/modules/Auth';

@Component
export default class Avatar extends Vue {
    @Prop({ required: true }) readonly imageSource!: string;
    @Prop({ required: true }) readonly size!: number;
    @Prop({ required: false, default: false }) readonly smallStar!: boolean;
    @Prop({ required: false, default: false }) readonly mediumStar!: boolean;
    @Prop({ required: false, default: AvatarSizeEnum.NONE })
    readonly starSize!: AvatarSizeEnum;

    get user(): IUser {
        return AuthStore.user;
    }

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

<style lang="scss" scoped>
.small-size {
    height: 18px;
    width: 18px;
    bottom: -5px;
    right: -7px;

    .svg-icon {
        width: 12px !important;
        height: 12px !important;
    }
}

.medium-size {
    height: 32px;
    width: 32px;
    bottom: -10px;
    right: -10px;

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
    .v-avatar {
      border-radius: 12px !important;
    }
}
</style>
