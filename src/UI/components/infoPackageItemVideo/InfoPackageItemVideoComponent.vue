<template>
  <div class="course-block" @click="$emit('open', infoPackageItemVideo.id)">
    <div class="course-video-block">
      <v-img class="course-image" :src="infoPackageItemVideo.coverLink" max-width="100%" height="100%"
             :aspect-ratio="16/9">
        <div class="course-info-container"></div>
      </v-img>
    </div>
    <div class="course-title">{{ infoPackageItemVideo.name }}</div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IInfoPackageItemVideo} from '../../../entity/infoPackageItem/infoPackageItem.types';

@Component
export default class InfoPackageItemVideoComponent extends Vue {
  @Prop() readonly infoPackageItemVideo!: IInfoPackageItemVideo;
}
</script>

<style lang="scss">
.course-block {
  width: calc((100% / 3) - 16px);
}
</style>
