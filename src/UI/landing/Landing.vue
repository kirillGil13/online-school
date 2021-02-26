<template>
<v-col>
  <div>
    <iframe id="ytplayer" type="text/html" width="830" height="425"
            ref="mainVideo"
            src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
            frameborder="0"/>
  </div>
  <div class="d-flex flex-row justify-space-between">
    <CourseComponent v-for="(course, index) in "/>
  </div>
</v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CourseComponent from '../components/course/CourseComponent.vue';
@Component({
  components: {CourseComponent}
})
export default class Landing extends Vue {
}
</script>

<style lang="scss">

</style>