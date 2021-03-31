<template>
  <v-sheet color="#ffffff" class="pa-6">
    <cropper
        ref="cropper"
        class="cropper"
        :src="image"
        :debounce="false"
        @change="onChange"
        :stencil-props="{aspectRatio: 1}"
    ></cropper>
    <div class="d-flex flex-row align-end">
      <preview
          class="preview-result mt-3 mr-4"
          :width="120"
          :height="120"
          :image="result.image"
          :coordinates="result.coordinates"
      />
      <preview
          class="preview-result mt-3"
          :width="60"
          :height="60"
          :image="result.image"
          :coordinates="result.coordinates"
      />
    </div>
    <v-row>
      <v-col class="pr-0">
        <Button class="secondary_blue" @submit="$emit('close')" full-width small>Закрыть</Button>
      </v-col>
      <v-col>
        <Button @submit="$emit('setImage', $refs.cropper)" full-width small>Подтвердить</Button>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
//@ts-ignore
import { Cropper, Preview } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import Button from '../common/Button.vue';

@Component({
  components: {
    Button,
    Cropper,
    Preview
  },
})
export default class PictureCropper extends Vue{
  @Prop() readonly image!: string;
  result = {
    coordinates: null,
    image: null
  }

  onChange(e: any): void {
    this.$set(this.result, 'coordinates', e.coordinates);
    this.$set(this.result, 'image', e.image);
  }
}
</script>

<style scoped>

</style>
