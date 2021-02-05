<template>
  <div>
    <v-row class="ma-0 align-center justify-space-between mb-5">
      <div class="tabs">
        <ul>
          <li v-for="(tab, index) in tabs" :key="index">
            <router-link :to="{name: tab.component}" active-class="is-active">{{ tab.title }}</router-link>
          </li>
        </ul>
      </div>
      <FilterComponent :isOnRight="true" :filter="filters.filters" :defaultName="filters.default"
                     v-if="tabs.some(item => item.filter && item.component === $route.name)"/>
    </v-row>
    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ITabs} from '@/entity/tabs/tabs.types';
import Filters from '@/entity/filters/filters';
import {TrainingTabsNameEnum} from '@/entity/tabs/trainingTabs.types';
import FilterComponent from '@/UI/components/filter/FilterComponent.vue';

@Component({
  components: {
    FilterComponent,
  }
})
export default class Tabs extends Vue {
  @Prop() readonly filters!: Filters;
  @Prop() readonly tabs!: ITabs[];
  tabsName = TrainingTabsNameEnum;
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
    height: 100%;
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0;
    margin: 0;

    li {
      margin-right: 24px;
      cursor: pointer;
      &:nth-last-child(1) {
        margin-right: 0;
      }

      a {
        height: 100%;
        font-size: 14px;
        color: #5f739c;
        position: relative;

        &.is-active {
          color: #426df6;

          &::after {
            width: 100%;
          }
        }

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
