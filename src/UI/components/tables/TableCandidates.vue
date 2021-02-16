<template>
  <div>
    <div class="table" v-if="!isMobile">
      <div class="tr">
        <div></div>
        <div>Имя</div>
        <div>Номер телефона</div>
        <div>Почта</div>
        <div>Продукт</div>
        <div>Дата</div>
        <div></div>
      </div>
      <div class="tr tbody" v-for="(candidate, index) in candidates" :key="index">
        <div>
          <Select class-name="select_content" :selects="selects[0]">
            <template v-slot:act>
              <div class="d-flex flex-row">
                <svg-icon
                    :name="candidate.status"
                >
                </svg-icon>
                <svg-icon name="Arrow_Down"></svg-icon>
              </div>
            </template>
          </Select>
        </div>
        <div class="name">{{ candidate.name }}</div>
        <div class="link">{{ candidate.phone }}</div>
        <div class="email link">{{ candidate.email }}</div>
        <div class="product">Недвижимость за 35%</div>
        <div>{{ candidate.createdAt | moment('DD.MM, HH:mm') }}</div>
        <div>
          <Select class-name="select_content action" :selects="selects[1]">
            <template v-slot:act>
              <div class="d-flex justify-end">
                <svg-icon
                    name="Dots"
                >
                </svg-icon>
              </div>
            </template>
          </Select>
        </div>
      </div>
    </div>
    <div class="table mobile" v-if="isMobile">
      <div class="tr tbody mb-3" v-for="(candidate, index) in candidates" :key="index">
        <div class="d-flex flex-row justify-space-between mb-3">
          <div class="d-flex flex-row">
            <Select class-name="select_content" :selects="selects[0]">
              <template v-slot:act>
                <div class="d-flex flex-row">
                  <svg-icon
                      :name="candidate.status"
                  >
                  </svg-icon>
                  <svg-icon name="Arrow_Down"></svg-icon>
                </div>
              </template>
            </Select>
            <div class="ml-3 name">{{ candidate.name }}</div>
          </div>
          <div>
            <Select class-name="select_content action" :selects="selects[1]">
              <template v-slot:act>
                <div class="d-flex justify-end">
                  <svg-icon
                      name="Dots"
                  >
                  </svg-icon>
                </div>
              </template>
            </Select>
          </div>
        </div>
        <div class="mb-2">
          <div class="label">Номер телефона</div>
          <div class="link">{{ candidate.phone }}</div>
        </div>
        <div class="mb-2">
          <div class="label">Почта</div>
          <div class="email link">{{ candidate.email }}</div>
        </div>
        <div class="mb-2">
          <div class="label">Продукт</div>
          <div class="product">Недвижимость за 35%</div>
        </div>
        <div>
          <div class="label">Дата</div>
          <div>{{ candidate.createdAt | moment('DD.MM, HH:mm') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

import Button from '@/UI/components/common/Button.vue';
import {Candidate} from '@/entity/candidates';
import {ISelect} from '@/entity/select/select.types';
import Select from '@/UI/components/common/Select.vue';
import {AdaptiveStore} from '@/store/modules/Adaptive';

@Component({
  components: {
    Select,
    Button,
  },
})
export default class TablePartners extends Vue {
  @Prop() readonly candidates!: Candidate[];
  @Prop() readonly selects!: ISelect[];

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }
}
</script>

<style lang="scss">

.select_content {
  margin-top: 30px !important;
  border-radius: 12px !important;
  min-width: 190px !important;

  &.action {
    #select0 {
      font-weight: 600;
    }

    #select3 {
      .v-list-item__title {
        color: #EB5757 !important;
      }
    }
  }
}
</style>
