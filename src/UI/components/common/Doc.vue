<template>
  <a class="file-link" :href="`${material.fileLink}`" target="_blank">
    <v-row class="course-container material align-center mt-4 pa-3">
      <svg-icon class="svg-wh" name="Doc"></svg-icon>
      {{material.name}}
    </v-row>
  </a>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ILessonItemFiles} from '../../../entity/lessonItem/lessonItem.types';

@Component
export default class Doc extends Vue {
  @Prop() readonly material!: ILessonItemFiles;
}
</script>

<style lang="scss">
.file-link {
  font-size: 14px;
  color: #060516 !important;
}
.course-container {
  &.material {
    border-radius: 5px;
  }
}

</style>