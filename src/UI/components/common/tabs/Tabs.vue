<template>
  <div>
    <v-row class="ma-0 align-center justify-space-between mb-5">
      <div class="tabs">
        <ul>
          <li v-for="(tab, index) in tabs" :key="index" :class="{ 'is-active': tab.isActive }">
            <a :href="'#' + tab.id" @click="select(tab.id)">{{ tab.title }}</a>
          </li>
        </ul>
      </div>
      <FilterCourses :isOnRight="true" :filter="filters.filters" :defaultName="filters.default" v-if="$route.hash === '#leaders'"/>
    </v-row>
    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ITabs} from '@/entity/tabs/tabs.types';
import {TabsStore} from '@/store/modules/Tabs';
import FilterCourses from '@/UI/components/filter/FilterCourses.vue';
import Filters from '@/entity/filters/filters';

@Component({
  components: {
    FilterCourses
  }
})

export default class Tabs extends Vue {
  @Prop() readonly filters!: Filters;
  get tabs(): ITabs[] {
    return TabsStore.tabs;
  }

  select(id: string): void {
    this.tabs.forEach((tab) => {
      tab.isActive = tab.id === id;
    });
  }

  mounted(): void {
    this.tabs.forEach((tab) => {
      if (this.$route.hash != '') {
        tab.isActive = false;
        if ('#' + tab.id === this.$route.hash) {
          tab.isActive = true;
        }
      }
    });
  }
}
</script>
<style lang="scss">
.tabs {
  display: flex;
  align-items: center;
  width: max-content;
  height: 60px;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  padding: 6px 16px 16px 16px;
  ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0;
    margin: 0;

    li {
      margin-right: 24px;

      &:nth-last-child(1) {
        margin-right: 0;
      }

      &.is-active {
        a {
          color: #426df6;

          &::after {
            width: 100%;
          }
        }
      }

      a {
        font-size: 14px;
        color: #5f739c;
        position: relative;

        &:hover {
          color: #426df6;
        }

        &::after {
          content: '';
          width: 0;
          position: absolute;
          height: 2px;
          background-color: #426df6;
          left: 0;
          bottom: -10px;
        }
      }
    }
  }
}

</style>
