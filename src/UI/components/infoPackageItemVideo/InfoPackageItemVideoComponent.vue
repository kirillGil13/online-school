<template>
  <div class="course-block" @click="$emit('proceed', infoPackageItemVideo.id)">
    <div class="course-video-block" :style="{ backgroundImage: 'url(' + infoPackageItemVideo.coverLink + ')' }">
      <div class="course-info duration">1:12:20</div>
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

</style>