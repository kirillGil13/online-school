<template>
    <div>
        <div class="avatar-wrapper">
          <slot name="inputFile"></slot>
            <v-avatar color="#F0F2F6" rounded tile :size="size">
              <template v-slot:default v-if="pictureChanged">
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
              <template v-slot:default v-if="imageSource">
                <v-img
                    :src="imageSource"
                    alt="Avatar"
                    aspect-ratio="1"
                    class="avatar"
                >
                  <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                      <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </template>
              <template v-else v-slot:default>
                <svg-icon :class="{'medium-size-icon': avatarSize === sizes.MEDIUM}" name="Camera" ></svg-icon>
              </template>
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

@Component
export default class Avatar extends Vue {
    @Prop({ required: true }) readonly imageSource!: string;
    @Prop({ required: true }) readonly size!: number;
    @Prop({ required: false, default: false }) readonly smallStar!: boolean;
    @Prop({ required: false, default: false }) readonly mediumStar!: boolean;
    @Prop({ required: false, default: AvatarSizeEnum.NONE }) readonly starSize!: AvatarSizeEnum;
    @Prop({ default: AvatarSizeEnum.SMALL }) readonly avatarSize!: AvatarSizeEnum;
    sizes = AvatarSizeEnum;
    @Prop() readonly pictureChanged!: boolean;

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
      border: 1px solid rgba(0, 0, 0, 0.04);
    }
  .input-file {
    z-index: 99999999 !important;
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
.medium-size-icon {
  width: 36px !important;
  height: 36px !important;
}
</style>
