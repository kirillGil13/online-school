<template>
    <v-col class="training">
        <Header :isBordered="false" title="Обучение" class="top_bar_p_0">
          <Search />
        </Header>
        <h5>топ лидеры</h5>
        <SliderLeaders :leaders="leaders" />
        <v-row v-if="$route.params.id === undefined">
          <v-col>
            <Tabs :filters="filters" :tabs="tabs">
              <TabsContent
                  v-for="(tab, index) in tabs"
                  :key="index"
                  :name="tab.title"
                  :selected="tab.component === $route.name"
              >
                <keep-alive>
                  <router-view :courses="courses" :leaders="leaders" @proceed="proceed"></router-view>
                </keep-alive>
              </TabsContent>
            </Tabs>
          </v-col>
        </v-row>
    </v-col>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '../../components/common/Header.vue';
import SliderLeaders from '../../components/slider/SliderLeaders.vue';
import Search from '../../components/common/Search.vue';
import Leader from '@/entity/leader/leader';
import { LeaderResponseType } from '@/entity/leader/leader.types';
import Tabs from '../../components/common/tabs/Tabs.vue';
import TabsContent from '../../components/common/tabs/TabsContent.vue';
import { ICoursesListItem} from '@/entity/courses/courses.types';
import {ITabs} from '@/entity/tabs/tabs.types';
import {TabsStore} from '@/store/modules/Tabs';
import {CoursesStore} from '@/store/modules/Courses';
import Filters from '@/entity/filters/filters';
import {LeaderTestStore} from '@/store/modules/LeadersTest';

@Component({
    components: {
        SliderLeaders,
        Search,
        Header,
        Tabs,
        TabsContent,
    },
})
export default class Training extends Vue {
    leaders: Leader[] = [];
    filters: Filters


    constructor() {
        super();
        this.filters = new Filters();
        for (let i = 0; i < this.leadersTest.length; i++) {
            this.leaders.push(new Leader(this.leadersTest[i]));
        }
    }

    proceed(id: number): void{
        this.$router.push({ path: `/course/${id}` });
    }


    get tabs(): ITabs[] {
      return TabsStore.trainingTabs;
    }

    get courses(): ICoursesListItem[] {
      return CoursesStore.courses;
    }

    async created(): Promise<void> {
      await CoursesStore.fetchAll();
    }

    get leadersTest(): LeaderResponseType[] {
      return LeaderTestStore.leader;
    }
}
</script>
<style lang="scss">
.training {
  h5 {
    margin-top: 24px;
  }
}
</style>
