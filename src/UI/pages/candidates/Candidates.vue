<template>
  <div class="candidate-page" >
    <v-tabs v-show="$adaptive.isMobile" grow show-arrows class="mb-2" color="#426DF6" v-model="activeName">
      <v-tabs-slider color="#426DF6"></v-tabs-slider>
      <v-tab :ripple="false" v-for="(item, index) in tabs" :key="index" :style="{borderRadius: '8px'}">{{ item.title }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeName">
      <v-tab-item v-for="(item, index) in tabs" :key="index">
        <keep-alive>
          <component
              :is="item.component"
              :active="activeName"
          />
        </keep-alive>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {ITabs} from '../../../entity/tabs/tabs.types';
import {TabsStore} from '../../../store/modules/Tabs';
import CandidatesComponent from '../../components/candidates/CandidatesComponent.vue';
import TodoList from '../todoList/TodoList.vue';
@Component({
  components: {TodoList, CandidatesComponent}
})
export default class Candidates extends Vue {
  activeName = 0;

  get tabs(): ITabs[] {
    return TabsStore.candidateTabs;
  }
}
</script>

<style lang="scss">
.v-tabs .v-tab--active:focus::before {
  border-radius: 8px;
}
.v-tab:before {
  border-radius: 8px;
}
.candidate-page {
  .v-tab {
    font-size: 14px !important;
    text-transform: none !important;
    letter-spacing: normal !important;
  }
}
</style>
