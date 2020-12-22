<template>
  <el-container class="container_a">
    <el-container class="ml-36 container_b">
      <el-col>
        <Header :isBordered="false" title="Обучение" class="top_bar_training">
          <Search/>
        </Header>
        <h5>топ лидеры</h5>
        <SliderLeaders :leaders="leaders"/>
        <LeaderCourseComponent :leader="leaders[$route.params.id]" :courses="coursesLeader"/>
      </el-col>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Header from "../components/common/Header.vue";
import SliderLeaders from "../components/slider/SliderLeaders.vue";
import Search from "../components/common/Search.vue";
import Leader from "@/entity/leader/leader";
import {LeaderResponseType} from "@/entity/leader/leader.types";
import LeaderCourseComponent from "@/UI/components/leaderCourse/LeaderCourseComponent.vue";
import {LeaderCoursesResponseType} from "@/entity/leaderCourses/leaderCourses.types";
import LeaderCourses from "@/entity/leaderCourses/leaderCourses";

@Component({
  components: {
    SliderLeaders,
    Search,
    Header,
    LeaderCourseComponent
  },
})
export default class LeaderCoursePage extends Vue {
  leaders: Leader[] = []
  coursesLeader: LeaderCourses[] = [];
  constructor() {
    super();
    for (let i = 0; i < this.leader.length; i++) {
      this.leaders.push(new Leader(this.leader[i]));
    }
    for (let i = 0; i < this.leaderCoursesTemp.length; i++) {
      this.coursesLeader.push(new LeaderCourses(this.leaderCoursesTemp[i]));
    }
  }
  getCourses() {
    //по роуту определяем id каких данных загрузить

  }
  leader: LeaderResponseType[] = [
    {
      id: 0,
      direction: "dir",
      rating: "10",
      createdAt: "",
      updatedAt: "",
      userInfo: {
        id: 0,
        name: "Ivan",
        surname: "Ivanov",
        avatar:
            "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
      },
      courses: [
        {
          id: 0,
          title: "jdkckdjc",
          description: "gjhgk",
          isTestingRequire: true,
          createdAt: "",
        },
      ],
      balance: "",
      totalCoursesViewsCount: 10,
    }, {
      id: 1,
      direction: "dir",
      rating: "10",
      createdAt: "",
      updatedAt: "",
      userInfo: {
        id: 0,
        name: "Ivan",
        surname: "Sidorov",
        avatar:
            "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
      },
      courses: [
        {
          id: 0,
          title: "jdkckdjc",
          description: "gjhgk",
          isTestingRequire: true,
          createdAt: "",
        },
      ],
      balance: "",
      totalCoursesViewsCount: 10,
    },
  ];
  //то что мы получаем при запросе через getCourse
  leaderCoursesTemp: LeaderCoursesResponseType[] = [
    {
      id: 0,
      title:
          "Ornare platea tortor risus elit mauris, mattis. Eget ultricies tortor sed id mauris",
      cover:
          "https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg",
      totalLesson: 20,
      lessonPassed: 15,
      duration: 3850,
      rating: 10,
    }, {
      id: 1,
      title:
          "",
      cover:
          "https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg",
      totalLesson: 20,
      lessonPassed: 15,
      duration: 3850,
      rating: 10,
    }, {
      id: 2,
      title:
          "Ornare platea tortor risus elit mauris, mattis. Eget ultricies tortor sed id mauris",
      cover:
          "https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg",
      totalLesson: 20,
      lessonPassed: 15,
      duration: 3850,
      rating: 10,
    }, {
      id: 3,
      title:
          "Ornare platea tortor risus elit mauris, mattis. Eget ultricies tortor sed id mauris",
      cover:
          "https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg",
      totalLesson: 20,
      lessonPassed: 15,
      duration: 3850,
      rating: 10,
    }
  ]
}
</script>

<style lang="scss">

</style>