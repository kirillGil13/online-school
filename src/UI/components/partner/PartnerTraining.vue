<template>
<div class="d-flex flex-column">
  <FilterComponent class="my-3" :isOnRight="false" :filter="filters.courses" :defaultName="filters.defaultCourse"/>
  <h4 class="mt-3">В процессе</h4>
  <ProgressCourse :cover="'https://leverageedu.com/blog/wp-content/uploads/2019/08/Course-after-MBA.png'" :lessons-passed="2" :total-lessons="10" title="Курс как повысить звезду от Ильгиза">
    <template v-slot:append>
      <v-divider class="mt-3"></v-divider>
    </template>
  </ProgressCourse>
  <ProgressCourse :cover="'https://leverageedu.com/blog/wp-content/uploads/2019/08/Course-after-MBA.png'" :lessons-passed="1" :total-lessons="6" title="Как обрабатывать возражения"/>
  <h4 class="mt-6">Законченные курсы</h4>
  <ProgressCourse :cover="'https://leverageedu.com/blog/wp-content/uploads/2019/08/Course-after-MBA.png'" :lessons-passed="12" :total-lessons="12" title="Как нарастить большое количество партнеров"/>
</div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ProgressCourse from '../progressCourse/ProgressCourse.vue';
import Filters from '../../../entity/filters/filters';
import FilterComponent from '../filter/FilterComponent.vue';
@Component({
  components: {FilterComponent, ProgressCourse}
})
export default class PartnerTraining extends Vue {
  @Prop() readonly cover!: string;
  @Prop() readonly totalLessons!: number;
  @Prop() readonly lessonsPassed!: number;
  @Prop() readonly title!: string;
  filters = new Filters();
}
</script>

<style lang="scss">
.progress-course {

}
</style>