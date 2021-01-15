<template>
  <v-col>
    <v-row class="tab-controls justify-end">
      <v-col v-for="(item, index) in filters.filters" id="select" :key="index" cols="auto" class="pa-0">
        <label :for="index">{{item.filterType}}</label>
        <v-select
            :items="item.filter"
            v-model="filters.default[index]"
            class="filter pa-0"
            :menu-props="{ left: true}"
            flat
            dense
            solo
        >
          <template v-slot:append>
            <svg-icon name="Filter"></svg-icon>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </v-col>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Filters from '@/entity/filters/filters';

@Component({
  components: {

  }
})
export default class FilterCourses extends Vue {
  filters: Filters;
  constructor() {
    super();
    this.filters = new Filters();
  }
}
</script>
<style lang="scss">
.tab-controls {
  #select {
    margin-right: 12px;
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
  label {
    color: #060516;
    font-size: 12px;
  }
  .filter {
    font-size: 14px !important;
    max-height: 38px !important;
    input {
      max-width: 0;
    }
    .v-input__control {
      .v-input__slot {
        background: #F0F2F6;
        margin: 0 !important;
        border-radius: 8px;
        padding: 8px 6px 8px 12px;
        height: auto !important;
        .v-select__slot {
        }
        &::before {
          display: none !important;
        }
        .v-select__selection--comma {
          overflow: visible !important;
          color: #5A606F !important;
        }
        .v-input__append-inner {
          padding-left: 7px !important;
          .v-input__icon {
            height: 15px !important;
            width: 10px !important;
            i {
              font-size: 20px !important;
            }
          }
        }
        .v-select__selections {
          .v-select__selection--comma {
            margin: 0;
          }
        }
      }
    }
  }
}
.v-menu__content {
  top: 390px !important;
  width: 13.5% !important;
  max-width: 200px !important;
}
</style>
