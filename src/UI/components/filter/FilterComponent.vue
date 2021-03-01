<template>
  <v-col class="py-0">
    <v-row class="tab-controls d-flex flex-row flex-wrap">
      <div class="filter-tabs d-flex flex-row justify-center mt-2" :style="{order: isOnRight ? '2' : '1'}">
        <v-col v-for="(item, index) in filterItem" id="select" :key="index" cols="auto"
               :class="['pa-0 d-flex flex-column', index + 1 === filterItem.length && isMobile ? 'mr-0' : '']">
          <label :for="index">{{ item.filterType }}</label>
          <v-select
              :items="item.filterValue"
              v-model="filters.default[index]"
              @change="$emit('filter')"
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
      </div>
      <v-col :class="['filter-search pa-0 d-flex align-end mt-3', isMobile ? '' : 'mr-4']" :cols="isMobile ? 12 : ''"
             v-if="search" :style="{order: isOnRight ? '1' : '2'}">
        <slot name="search"/>
      </v-col>
      <v-col :cols="isMobile ? 12 : 2" class="filter-button pa-0 d-flex align-end mt-2" v-if="button" :style="{order: isMobile ? '-1' : '3'}">
        <slot name="button"/>
      </v-col>
    </v-row>
  </v-col>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {AdaptiveStore} from '@/store/modules/Adaptive';
import {IFilters} from '../../../entity/filters/filters.types';
import Filters from '../../../entity/filters/filters';

@Component({
  components: {}
})
export default class FilterComponent extends Vue {
  @Prop() readonly search!: boolean;
  @Prop() readonly button!: boolean;
  @Prop() readonly filterItem!: IFilters[];
  @Prop() readonly filters!: Filters;
  @Prop() readonly isOnRight: boolean | undefined;
  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }
}
</script>
<style lang="scss">
.tab-controls {
  .filter-tabs {
    #select {
      margin-right: 12px;
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
        background: #F0F2F6 !important;
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

  .filter-search {
    width: 100%;

    .search {
      width: 100%;

      input[type='search'] {
        border: none;
        width: 100%;
        background: #F4F6F9;
        padding: 8px;
        text-indent: 36px;
      }

      & svg {
        position: absolute;
        left: 15px;
        top: 31.82%;
      }
    }
  }

  .filter-button {
    button {
      margin: 0 !important;
      font-size: 12px;
      padding: 10px 16px !important;
      width: 100%;
    }
  }
}

.v-menu__content {
  margin-top: 45px;
  width: 13.5% !important;
  max-width: 200px !important;
}
</style>
