<template>
  <div class="courses">
    <LeaderCourseItem v-for="(course, index) in courses"
                      :key="index"
                      :course="course"
                      v-on="$listeners"/>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import LeaderCourses from '@/entity/leaderCourses/leaderCourses';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';
import Leader from '@/entity/leader/leader';

@Component({
  components: {
    LeaderCourseItem
  },
})
export default class TrainingLeaders extends Vue {
  @Prop() readonly courses!: LeaderCourses[];
  @Prop() readonly leader!: Leader[];
}
</script>
<style lang="scss">
.courses {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>
