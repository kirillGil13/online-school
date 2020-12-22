<template>
  <el-container class="container_a">
    <el-container class="ml-36 container_b">
      <el-col>
        <Header :isBordered="false" title="Обучение" class="top_bar_training">
          <Search/>
        </Header>
        <h5>топ лидеры</h5>
        <SliderLeaders :leaders="leaders"/>
        <el-col v-if="$route.params.id === undefined">
          <Tabs :tabsResponse="tabs" @select="select">
            <TabsContent
                v-for="(tab,index) in tabs"
                :key="index"
                :name="tab.title"
                :selected="tab.isActive"
            >
              <keep-alive>
                <component :is="tab.component" :courses="courses" @proceed="proceed"></component>
              </keep-alive>
            </TabsContent>
          </Tabs>
        </el-col>
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
import Tabs from "../components/common/tabs/Tabs.vue";
import TabsContent from "../components/common/tabs/TabsContent.vue";
import {ITabs} from "@/entity/tabs/tabs.types";
import CoursesListItem from "@/entity/courses/courses";
import TrainingCourses from "../components/training/TrainingCourses.vue";
import {CoursesListItemResponseType} from "@/entity/courses/courses.types";

@Component({
  components: {
    SliderLeaders,
    Search,
    Header,
    Tabs,
    TabsContent,
    TrainingCourses,
  },
})
export default class Training extends Vue {
  leaders: Leader[] = [];
  courses: CoursesListItem[] = [];

  constructor() {
    super();
    for (let i = 0; i < this.leader.length; i++) {
      this.leaders.push(new Leader(this.leader[i]));
    }
    for (let i = 0; i < this.coursesBack.length; i++) {
      this.courses.push(new CoursesListItem(this.coursesBack[i]));
    }

  }

  select(id: string) {
    this.tabs.forEach((tab) => {
      tab.isActive = tab.id === id;
    });
  }

  mounted() {
    this.tabs.forEach((tab) => {
      if (this.$route.hash != "") {
        tab.isActive = false;
        if ("#" + tab.id === this.$route.hash) {
          tab.isActive = true;
        }
      }
    });
  }

  proceed(id: number) {
    this.$router.push({path: `/training/${id}/0`});
  }

  //для теста
  coursesBack: CoursesListItemResponseType[] = [
    {
      id: 0,
      title:
          "Ornare platea tortor risus elit mauris, mattis. Eget ultricies tortor sed id mauris",
      cover:
          "https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg",
      totalLesson: 20,
      lessonPassed: 7,
      duration: 3850,
      rating: 10,
    },
    {
      id: 1,
      title:
          "Ornare platea tortor risus elit mauris, mattis. Eget ultricies tortor sed id mauris",
      cover:
          "https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg",
      totalLesson: 20,
      lessonPassed: 7,
      duration: 3850,
      rating: 10,
    },
    {
      id: 2,
      title:
          "Ornare platea tortor risus elit mauris, mattis. Eget ultricies tortor sed id mauris",
      cover:
          "https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg",
      totalLesson: 20,
      lessonPassed: 15,
      duration: 3850,
      rating: 10,
    },
    {
      id: 3,
      title:
          "Ornare platea tortor risus elit mauris, mattis. Eget ultricies tortor sed id mauris",
      cover:
          "https://www.open.edu/openlearn/sites/www.open.edu.openlearn/files/ole_images/become_a_student_inline.jpg",
      totalLesson: 20,
      lessonPassed: 7,
      duration: 3850,
      rating: 10,
    },
  ];
  tabs: ITabs[] = [
    {
      id: "home",
      title: "Главная",
      isActive: true,
      component: "",
    },
    {
      id: "courses",
      title: "Курсы",
      isActive: false,
      component: "TrainingCourses",
    },
    {
      id: "club",
      title: "Клуб 100",
      isActive: false,
      component: "",
    },
    {
      id: "leaders",
      title: "Лидеры",
      isActive: false,
      component: "",
    },
  ];
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
}
</script>
<style lang="scss">
.top_bar_training {
  padding-left: 0;
  padding-right: 0;
}
</style>