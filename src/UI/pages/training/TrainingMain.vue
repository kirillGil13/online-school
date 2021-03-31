<template>
      <v-col class="py-0">
        <v-row class="mt-16">
          <div :class="['course-list-container course-list-small', $adaptive.isMobile ? 'course-list-mobile' : '']">
            <LeaderCourseItem v-for="(course, index) in leaderCourses"
                              :key="index"
                              :course="course"
                              v-on="$listeners"
                              class="course-block-s"
                              @proceed="proceed"
            />
          </div>
        </v-row>
      </v-col>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ILeaderCourses} from '../../../entity/leaderCourses/leaderCourses.types';
import LeaderCourseItem from '../../components/leaderCourse/LeaderCourseItem.vue';
@Component({
  components: {LeaderCourseItem}
})
export default class TrainingMain extends Vue {
  @Prop() readonly leaderCourses!: ILeaderCourses;

  proceed(id: number): void {
    this.$router.push({path: `/course/${id}`});
  }
}
</script>
<style lang="scss">
</style>
