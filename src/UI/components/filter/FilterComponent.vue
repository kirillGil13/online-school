<template>
  <v-col class="py-0">
    <v-row class="tab-controls d-flex flex-row flex-wrap">
      <div :class="['filter-tabs d-flex flex-row justify-center', $adaptive.isMobile ? 'flex-column full-width' : 'flex-row']" :style="{order: isOnRight ? '2' : '1', marginTop: !$adaptive.isMobile ? '12px' : '0'}">
        <v-col :class="['filter-tabs__archive', $adaptive.isMobile && 'mt-2']" v-show="isCandidates">
          <Button  class="mt-0 secondary_white" :full-width="$adaptive.isMobile" :style="{background: isArchive ? '#426DF6' : '#F0F2F6', color: isArchive ? '#ffff !important' : '#5A606F !important'}" @submit="$emit('toggleArchive');">
            Архивные
            <span class="count-in-arhive ml-3" :style="{color: isArchive ? ' #FFFFFF' : '#060516'}">
              {{countInArchive}}
              </span>
          </Button>
        </v-col>
        <v-row no-gutters
               :class="['pa-0', $adaptive.isMobile ? 'mt-2' : '']">
          <v-col class="pa-0" v-for="(item, index) in filters.filterBody" id="select" :key="index">
            <label :for="index">{{ item.filterType }}</label>
            <v-select
                :items="item.filterValue.filter(el => el.text !== 'Архив')"
                v-model="filters.default[index]"
                @change="$emit('filter')"
                :class="['filter pa-0', $adaptive.isMobile ? 'filter-mobile' : '']"
                :menu-props="{ left: true, minWidth: 190}"
                flat
                dense
                solo
            >

              <template v-slot:append >
                <svg-icon name="Filter"></svg-icon>
              </template>
            </v-select>
          </v-col>

        </v-row>
      </div>
      <v-col :class="['filter-search pa-0 d-flex align-end mt-3', $adaptive.isMobile ? '' : 'mr-4']" :cols="$adaptive.isMobile ? 12 : ''"
             v-if="search" :style="{order: isOnRight ? '1' : '2'}">
        <slot name="search"/>
      </v-col>
      <v-col :cols="$adaptive.isMobile ? 12 : 2" class="filter-button pa-0 d-flex align-end mt-2" v-if="button" :style="{order: $adaptive.isMobile ? '-1' : '3'}">
        <slot name="button"/>
      </v-col>
    </v-row>
  </v-col>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import Filters from '../../../entity/filters/filters';
import Button from '../common/Button.vue';

@Component({
  components: {Button}
})
export default class FilterComponent extends Vue {
  @Prop() readonly search!: boolean;
  @Prop() readonly button!: boolean;
  @Prop() readonly filters!: Filters;
  @Prop() readonly isOnRight: boolean | undefined;
  @Prop() readonly isArchive!: boolean;
  @Prop() readonly isCandidates!: boolean;
  @Prop() readonly countInArchive!: number;
}
</script>
<style lang="scss">
.tab-controls {

  .count-in-arhive {
    font-size: 14px;
  }
  .filter-tabs {
    &__archive {
      padding: 0;
      display: flex;
      align-items: flex-end;
      margin-right: .6rem;

      button {
        font-size: 14px;
        padding: 9px 20px;
      }
    }
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
    &.filter-mobile {
      .v-input__control {
        .v-input__slot {
          .v-select__selections {
            .v-select__selection--comma {
              margin: 0;
              max-width: 76px !important;
            }
          }
        }
      }
    }
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
            max-width: 130px !important;
            overflow: hidden !important;
            text-overflow: ellipsis;
            white-space: nowrap;
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
</style>
