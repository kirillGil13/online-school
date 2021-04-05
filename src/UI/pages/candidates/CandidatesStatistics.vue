<template>
  <v-row>
    <v-col class="statistics">
      <Header
          :isBordered="false"
          title="Аналитика"
          class="top_bar_p_0"
          description="Здесь отображаются данные по вашей CRM"
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
      </v-row>
      <v-col class="mt-10 box-container">
        <div class="desc font-weight-bold">Тенденция просмотров</div>
          <v-sparkline
              :value="value"
              :labels="value"
              color="#426df6"
              line-width="2"
              class="stats"
              fill
              label-size="4"
              auto-draw
              auto-line-width
          >
            <template v-slot:label="item">
              {{ item.value }}
            </template>
          </v-sparkline>
      </v-col>
      <v-row>
        <v-col class="mt-6">
          <h1>Новые кандидаты</h1>
          <TableCandidates :candidates="candidates" :selects="selects"/>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Header from '@/UI/components/common/Header.vue';
import Badge from '@/UI/components/common/Badge.vue';
import {ISelect} from '@/entity/select/select.types';
import {SelectsStore} from '@/store/modules/Selects';
import {IUser} from '@/entity/user';
import {AuthStore} from '@/store/modules/Auth';
import {ICandidate} from '@/entity/candidates';
import {CandidatesStore} from '@/store/modules/Candidates';
import TableCandidates from '@/UI/components/tables/TableCandidates.vue';
@Component({
  components: {TableCandidates, Badge, Header}
})
export default class CandidatesStatistics extends Vue {
  selects: ISelect[] = [];
  value: number[] = [300,350,230,460,600,610,550,1000,200,1400]

  get selectsActions(): ISelect[] {
    return SelectsStore.selectsActions;
  }

  get user(): IUser | null {
    return AuthStore.user;
  }

  get candidates(): ICandidate[] {
    return CandidatesStore.candidates;
  }

  async created(): Promise<void> {
    await CandidatesStore.fetchAll();
  }
}
</script>

<style lang="scss">
.statistics {
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
