<template>
  <div class="course-block" @click="$emit('open', infoPackageItemVideo.id)">
    <v-responsive class="infopack-video-block" :aspect-ratio="16/9">
      <v-img class="course-image infopack-image" width="100%" height="100%" :src="infoPackageItemVideo.coverLink">
        <div class="play-button"></div>
      </v-img>
    </v-responsive>
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
.infopack-video-block {
  border-radius: 18px;
  max-height: 550px;
}
.infopack-image {
  position: relative;
  &:hover {
    .play-button {
      display: block;
    }
  }
}
.play-button {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: rgb(62, 60, 60, 0.7);
  transform: translate(-50%,-50%);
  color: hsla(0,0%,100%,.74);
  cursor: pointer;
  -webkit-transition: .2s;
  -o-transition: .2s;
  transition: all ease .5s;
  width: 68px;
  height: 68px;
  border-radius: 100%;
  border: 3px solid #fff;
  z-index: 2;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-30%,-50%);
    -o-transform: translate(-30%,-50%);
    transform: translate(-30%,-50%);
    width: 0;
    height: 0;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    border-left: 15px solid #fff;
  }
}
</style>
