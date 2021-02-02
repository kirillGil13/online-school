<template>
  <v-row>
    <v-col class="candidates">
      <Header
          :isBordered="false"
          title="Кандидаты"
          class="top_bar_p_0"
          description="Здесь отображаются контактные данные всех людей, которые регистрировались по Вашим партнерским ссылкам"
      >
      </Header>
      <v-row class="badges d-flex justify-space-between mt-6" no-gutters>
        <Badge class="badges__container" :subs="true" :profit="true">
          <template v-slot:title>Просмотров инфопакетов</template>
          <template v-slot:default>172</template>
          <template v-slot:stats>19</template>
        </Badge>
        <Badge class="badges__container" :profit="true">
          <template v-slot:title>Оставлено заявок</template>
          <template v-slot:default>50</template>
          <template v-slot:stats>5.3</template>
        </Badge>
        <Badge class="badges__container" :profit="true">
          <template v-slot:title>Конверсия</template>
          <template v-slot:default>37%</template>
          <template v-slot:stats>12</template>
        </Badge>
        <Badge class="badges__container" :profit="true">
          <template v-slot:title>Новых партнеров</template>
          <template v-slot:default>25</template>
          <template v-slot:stats>0.2</template>
        </Badge>
        <Badge class="badges__container" :link="true">
          <template v-slot:title>Подробная аналитика</template>
          <template v-slot:link>Посмотреть</template>
        </Badge>
      </v-row>
      <v-row no-gutters>
        <span class="desc mt-2">Данные за последние 30 дней</span>
      </v-row>
      <v-row>
        <v-col class="mt-6">
          <FilterComponent :isOnRight="false" :button="true" :search="true" :filter="filters.candidates" :defaultName="filters.defaultCandidate">
            <template v-slot:search>
              <Search/>
            </template>
            <template v-slot:button>
              <Button>Добавить кандидата</Button>
            </template>
          </FilterComponent>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <TableCandidates :candidates="candidates" :selects="selects"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import Search from '@/UI/components/common/Search.vue';
import TableCandidates from '@/UI/components/tables/TableCandidates.vue';

import {ICandidate} from '@/entity/candidates/candidates.types';
import {CandidatesStore} from '@/store/modules/Candidates';
import {AuthStore} from '@/store/modules/Auth';
import {IUser} from '@/entity/user';
import Badge from '@/UI/components/common/Badge.vue';
import FilterComponent from '@/UI/components/filter/FilterComponent.vue';
import Filters from '@/entity/filters/filters';
import Button from '@/UI/components/common/Button.vue';
import {ISelect} from '@/entity/select/select.types';
import {SelectsStore} from '@/store/modules/Selects';
import Select from '@/entity/select/select';

@Component({
  components: {
    Button,
    FilterComponent,
    Badge,
    Header,
    Search,
    TableCandidates,
  },
})
export default class Candidates extends Vue {
  filters: Filters;
  selects: ISelect[] = [];

  constructor() {
    super();
    this.filters = new Filters();
    this.selects.push(new Select(this.selectsStatus), new Select(this.selectsActions))
  }

  get user(): IUser {
    return AuthStore.user;
  }

  get candidates(): ICandidate[] {
    return CandidatesStore.candidates;
  }

  async created(): Promise<void> {
    await CandidatesStore.fetchAll();
  }
  get selectsStatus(): ISelect {
    return SelectsStore.selectsStatus;
  }
  get selectsActions(): ISelect {
    return SelectsStore.selectsActions;
  }

}
</script>

<style lang="scss">
.candidates {
  .badges {
    &__container {
      width: calc((100% / 4) - 12px);
      margin-right: 12px;
      background-color: #FFFFFF;
      border: 1px solid rgba(87, 81, 183, 0.12);
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.04);

      &:nth-last-child(1) {
        margin-right: 0px !important;
        margin-bottom: 8px !important;
      }
    }
  }

  .desc {
    color: #828282;
  }
}

</style>
