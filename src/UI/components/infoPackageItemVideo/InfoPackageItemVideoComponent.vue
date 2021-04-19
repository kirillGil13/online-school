<template>
  <div class="course-block" @click="$emit('open', infoPackageItemVideo.id)">
    <v-responsive class="infopack-video-block" :aspect-ratio="16/9">
        <v-img class="infopack-image" width="100%" height="100%" :aspect-ratio="16/9" :src="infoPackageItemVideo.coverLink">
          <div class="play-button"></div>
        </v-img>
    </v-responsive>
    <div class="course-title">{{infoPackageItemVideo.name}}</div>
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
.infopack-video-block {
  border-radius: 12px;
}
.infopack-image {
  position: relative;
  border-radius: 12px;
}
.play-button {
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
