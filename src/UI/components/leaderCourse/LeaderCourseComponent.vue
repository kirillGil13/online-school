<template>
  <v-col class="container_a">
    <h2>{{ leader.fullName }}: Индивидуальные курсы</h2>
    <div :class="['course-list-container course-list-small mt-3',$adaptive.isMobile ? 'course-list-mobile' : '']">
      <LeaderCourseItem
          v-for="(course, index) in courses"
          :key="index"
          :course="course"
          v-on="$listeners"
      />
    </div>
  </v-col>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Leader from '@/entity/leader/leader';
import LeaderCourses from '@/entity/leaderCourses/leaderCourses';
import LeaderCourseItem from '@/UI/components/leaderCourse/LeaderCourseItem.vue';

@Component({
  components: {
    LeaderCourseItem,
  },
})
export default class LeaderCourseComponent extends Vue {
  @Prop() readonly leader!: Leader;
  @Prop() readonly courses!: LeaderCourses[];

}
</script>
<style lang="scss">
</style>
