<template>
  <a class="file-link" :href="`https://static.onelinks.com/admin/course/materials/${material.filename}`" target="_blank">
    <v-row class="course-container material align-center mt-4 pa-3">
      <svg-icon class="svg-wh" name="Doc"></svg-icon>
      {{material.name}}
    </v-row>
  </a>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ICourseMaterials} from '../../../entity/courseItem/courseItem.type';

@Component
export default class Doc extends Vue {
  @Prop() readonly material!: ICourseMaterials;
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