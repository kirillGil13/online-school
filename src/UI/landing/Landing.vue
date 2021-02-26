<template>
<v-col>
  <v-row class="d-flex justify-center align-center align-self-center">
    <iframe id="ytplayer" type="text/html" width="830" height="425"
            ref="mainVideo"
            src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
            frameborder="0"/>
  </v-row>
  <div class="d-flex justify-space-between flex-row flex-nowrap" v-if="infoPackageItemLoaded">
    <InfoPackageItemVideoComponent v-for="(item, index) in infoPackageItem.videos" :key="index" :info-package-item-video="item"/>
  </div>
</v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CourseComponent from '../components/course/CourseComponent.vue';
import InfoPackageItemVideoComponent from '../components/infoPackageItemVideo/InfoPackageItemVideoComponent.vue';
import {InfoPackagesStore} from '../../store/modules/InfoPackages';
import {IInfoPackageItem} from '../../entity/infoPackageItem/infoPackageItem.types';
@Component({
  components: {InfoPackageItemVideoComponent, CourseComponent}
})
export default class Landing extends Vue {

  get infoPackageItem(): IInfoPackageItem {
    return InfoPackagesStore.infoPackageItem!;
  }

  get infoPackageItemLoaded(): boolean {
    return InfoPackagesStore.infoPackageItemLoaded;
  }

  async created(): Promise<void> {
    await InfoPackagesStore.fetchData(this.$route.params.id);
  }
}
</script>

<style lang="scss">

</style>