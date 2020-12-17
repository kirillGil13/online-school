<template>
  <el-container class="container_a">
    <el-container class="ml-36 container_b">
      <el-col>
        <Header :isBordered="false" title="Обучение">
          <Search />
        </Header>
        <h5>топ лидеры</h5>
        <SliderLeaders :leaders="leaders" />
        <Tabs :tabsResponse="tabs" @select="select">
          <TabsContent
            v-for="(tab,index) in tabs"
            :key="index"
            :name="tab.title"
            :selected="tab.isActive"
          >
            <keep-alive>
              <component :is="tab.component"></component>
            </keep-alive>
          </TabsContent>
        </Tabs>
      </el-col>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "../components/common/Header.vue";
import SliderLeaders from "../components/slider/SliderLeaders.vue";
import Search from "../components/common/Search.vue";
import Leader from "@/entity/leader/leader";
import { LeaderResponseType } from "@/entity/leader/leader.types";
import Tabs from "../components/common/tabs/Tabs.vue";
import Test1 from "../components/common/Test1.vue";
import Test2 from "../components/common/Test2.vue";
import Test3 from "../components/common/Test3.vue";
import TabsContent from "../components/common/tabs/TabsContent.vue";
import { ITabs } from "@/entity/tabs/tabs.types";
@Component({
  components: {
    SliderLeaders,
    Search,
    Header,
    Tabs,
    TabsContent,
    Test1,
    Test2,
    Test3,
  },
})
export default class Training extends Vue {
  leaders: Leader[] = [];
  constructor() {
    super();
    for (let i = 0; i < this.leader.length; i++) {
      this.leaders.push(new Leader(this.leader[i]));
    }
  }
  select(id: string) {
    this.tabs.forEach((tab) => {
      tab.isActive = tab.id === id;
    });
  }
  mounted() {
    this.tabs.forEach((tab) => {
      if ("#" + tab.id === this.$route.hash) {
        tab.isActive = true;
      }
    });
  }
  //для теста
  tabs: ITabs[] = [
    {
      id: "home",
      title: "Главная",
      isActive: true,
      component: "Test1",
    },
    {
      id: "courses",
      title: "Курсы",
      isActive: false,
      component: "Test2",
    },
    {
      id: "club",
      title: "Клуб 100",
      isActive: false,
      component: "Test3",
    },
  ];
  leader: LeaderResponseType[] = [
    {
      id: 0,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 1,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 2,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 3,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 4,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 5,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 6,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 7,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 8,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 9,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 10,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
    {
      id: 11,
      name: "Ivan",
      surname: "Ivanov",
      master: "Мастер вовлечения",
      rating: 10,
      img:
        "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/136697800/original/ad0b0ec86b4d6cc39a8f2350c1979d0be2182691/do-youtube-banner-watermark-avatar-logo-for-your-channel.png",
    },
  ];
}
</script>
<style lang="scss">
.top_bar {
  padding-left: 0;
  padding-right: 0;
}
</style>