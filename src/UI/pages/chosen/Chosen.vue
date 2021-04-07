<template>
  <v-col>
    <Header :isBordered="false" title="Избранное" class="top_bar_p_0"></Header>
    <v-col class="py-0" v-if="coursesFavouriteLoaded">
      <v-row class="mt-6" v-if="coursesFavourite.length !== 0">
        <div :class="['course-list-container course-list-small mt-3',$adaptive.isMobile ? 'course-list-mobile' : '']">
          <LeaderCourseItem v-for="(course, index) in coursesFavourite"
                            :key="index"
                            :course="course"
                            v-on="$listeners"
                            class="course-block-s"
                            @proceed="proceed"
          />
        </div>
      </v-row>
      <v-row v-else>
        <v-col class="mt-10 d-flex justify-center align-center">
          Ни одного курса еще не было добавлено в избранное
        </v-col>
      </v-row>
    </v-col>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {CoursesFavouriteStore} from '../../../store/modules/CoursesFavourite';
import {ILeaderCourses} from '../../../entity/leaderCourses/leaderCourses.types';
import LeaderCourseItem from '../../components/leaderCourse/LeaderCourseItem.vue';
import Header from '../../components/common/Header.vue';

@Component({
  components: {Header, LeaderCourseItem}
})
export default class Chosen extends Vue {

  get coursesFavourite(): ILeaderCourses[] {
    return CoursesFavouriteStore.coursesFavourite;
  }

  get coursesFavouriteLoaded(): boolean {
    return CoursesFavouriteStore.coursesFavouriteLoaded;
  }

  proceed(id: number): void {
    this.$router.push({path: `/course/${id}`});
  }

  async created(): Promise<void> {
    await CoursesFavouriteStore.fetchAll();
  }
}
</script>

<style lang="scss">
</style>
