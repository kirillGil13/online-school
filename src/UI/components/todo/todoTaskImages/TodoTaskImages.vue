<template>
  <div class="pa-4 todo-task-images">
    <div class="d-flex flex-row flex-wrap">
      <div class="task-images-item pa-0" :class="[$adaptive.isMobile && 'mobile-image-item']">
        <div class="picture-upload d-flex flex-column align-center justify-center" @click="activateInput">
          <svg-icon name="Picture_outline" width="36" height="36"></svg-icon>
          <div class="link font-14 mt-2">Добавить фото</div>
          <input type="file" v-show="false" accept="image/*" id="upload-picture"
                 @change="$emit('handleImage', $event)" multiple>
        </div>
      </div>
      <div class="task-images-item pa-0"
           :class="[$adaptive.isMobile && 'mobile-image-item', index > 1 && 'mt-2', index > 0 && $adaptive.isMobile && 'mt-2']"
           v-for="(item, index) in images" :key="index">
        <v-img style="cursor: pointer; background-color: rgba(189,189,189,0.12)" :src="item" height="200" width="100%" @click="showImg(index)">
          <v-icon small style="border-radius: 50%; position: absolute; right: 2px; top: 2px;" class="pa-1 mt-0" @click.stop="$emit('deleteImage', item)">mdi-close</v-icon>
            <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                    <v-progress-circular
                        indeterminate
                        color="blue lighten-3"
                    ></v-progress-circular>
                </v-row>
            </template>
        </v-img>
      </div>
    </div>
    <vue-easy-lightbox
        :visible="visible"
        :imgs="images"
        :index="index"
        @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import VueEasyLightbox from 'vue-easy-lightbox'

@Component({
  components: {VueEasyLightbox}
})
export default class TodoTaskImages extends Vue {
  @Prop() readonly images!: string[];
  visible = false;
  index = 0;

  activateInput(): void {
    document.getElementById('upload-picture')!.click();
  }

  showImg(index: number): void {
    this.index = index
    this.visible = true
  }

  handleHide(): void {
    this.visible = false
  }
}
</script>

<style lang="scss">
.todo-task-images {
  .task-images-item {
    width: calc((100% / 3) - 6px);
    margin-right: 9px;

    &:nth-child(3n + 3) {
      margin-right: 0;
    }

    &.mobile-image-item {
      width: calc((100% / 2) - 5px);

      &:nth-child(3n + 3) {
        margin-right: 9px;
      }

      &:nth-child(2n + 2) {
        margin-right: 0;
      }
    }
  }

  .picture-upload {
    height: 200px;
    background: rgba(66, 109, 246, 0.12);
    color: #426DF6;
    cursor: pointer;

    svg {
      path {
        fill: #426df6 !important;
      }
    }
  }
}
</style>
