<template>
  <v-col class="candidates">
      <Header
          :isBordered="false"
          title="Кандидаты"
          class="top_bar_p_0"
          description="Здесь отображаются контактные данные всех людей, которые регистрировались по Вашим партнерским ссылкам"
      >
      </Header>
      <v-row class="badges d-flex justify-space-between flex-nowrap mt-6" no-gutters>
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
        <Badge class="badges__container" :link-name="route.CandidatesStatistics">
          <template v-slot:title>Подробная аналитика</template>
          <template v-slot:link>Посмотреть</template>
        </Badge>
      </v-row>
      <v-row no-gutters>
        <span class="desc mt-2">Данные за последние 30 дней</span>
      </v-row>
      <v-row>
        <v-col class="mt-6">
          <FilterComponent :isOnRight="false" :button="true" :search="true" :filter="filters.candidates"
                           :defaultName="filters.defaultCandidate">
            <template v-slot:search>
              <Search/>
            </template>
            <template v-slot:button>
              <Button @submit="activator = true">Добавить кандидата</Button>
            </template>
          </FilterComponent>
        </v-col>
      </v-row>
      <v-row v-if="candidates.length !== 0">
        <v-col class="mt-6">
          <TableCandidates :candidates="candidates" :selects="selectsActions" :statuses="statuses" @select="selectStatus" @extraAction="openUpdate" @addStatus="activatorStatus = true"/>
        </v-col>
      </v-row>
      <Modal :activator="activator" @activatorChange="activatorChange">
        <template v-slot:content>
          <CandidateFormComponent :form="candidateForm" v-if="destroy" :statuses="statuses" :info-packs="infoPackages" :account-id="user.id" @close="close" @add="add"/>
        </template>
      </Modal>
      <Modal :activator="activatorStatus" @activatorChange="activatorChangeStatus">
        <template v-slot:content>
          <StatusFormComponent :form="statusForm" v-if="destroy" :status-icons="statusIcons" @close="close" @createStatus="createStatus"/>
        </template>
      </Modal>
    <Modal :activator="activatorCandidate" @activatorChange="activatorChangeCandidate">
      <template v-slot:content>
        <UpdateCandidateFormComponent :form="updateCandidateForm" v-if="destroy" :account-id="user.id" @close="close" @update="update"/>
      </template>
    </Modal>
  </v-col>
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
import Modal from '@/UI/components/common/Modal.vue';
import CandidateFormComponent from '@/UI/components/candidateForm/CandidateFormComponent.vue';
import {CandidateForm} from '@/form/candidate/candidateForm';
import {RouterNameEnum} from '@/router/router.types';
import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';
import {InfoPackagesStore} from '@/store/modules/InfoPackages';
import {AdaptiveStore} from '@/store/modules/Adaptive';
import {StatusesStore} from '../../../store/modules/Statuses';
import {IStatuses} from '../../../entity/statuses/statuses.types';
import {StatusForm} from '../../../form/status/statusForm';
import StatusFormComponent from '../../components/statusForm/StatusFormComponent.vue';
import {StatusIconsStore} from '../../../store/modules/StatusIcons';
import {IStatusIcons} from '../../../entity/statusIcons/statusIcons.types';
import {CandidateItemStore} from '../../../store/modules/CandidateItem';
import UpdateCandidateFormComponent from '../../components/candidateForm/UpdateCandidateFormComponent.vue';
import {ICandidateItem} from '../../../entity/candidateItem/candidateItem.types';
import {UpdateCandidateForm} from '../../../form/updateCandidate/updateCandidateForm';

@Component({
  components: {
    UpdateCandidateFormComponent,
    StatusFormComponent,
    CandidateFormComponent,
    Modal,
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
  activator = false;
  activatorStatus = false;
  activatorCandidate = false;
  candidateForm: CandidateForm;
  updateCandidateForm: UpdateCandidateForm;
  statusForm: StatusForm;
  destroy = true;
  route = RouterNameEnum;

  constructor() {
    super();
    this.candidateForm = new CandidateForm();
    this.statusForm = new StatusForm();
    this.updateCandidateForm = new UpdateCandidateForm();
    this.filters = new Filters();
  }

  activatorChange(act: boolean): void {
    this.destroy = true;
    this.activator = act;
  }

  activatorChangeStatus(act: boolean): void {
    this.destroy = true;
    this.activatorStatus = act;
  }

  activatorChangeCandidate(act: boolean): void {
    this.destroy = true;
    this.activatorCandidate = act;
  }

  close(): void {
    this.activator = false;
    this.activatorStatus = false;
  }

  rerender(): void {
    this.destroy = false;
    this.$nextTick(() => {
      this.destroy = true;
    });
  }

  async openUpdate(id: number): Promise<void> {
   await CandidateItemStore.fetchData(id.toString());
   this.updateCandidateForm.setFormData(this.candidateItem!, this.statuses, this.infoPackages, this.user.id);
   this.activatorCandidate = true;
  }

  async selectStatus(data: {statusId: number; id: number}): Promise<void> {
    if (await StatusesStore.set({status: {status_id: data.statusId}, candidateId: data.id.toString()})) {// eslint-disable-line
      await this.fetchData();
    }
  }

  async createStatus(): Promise<void> {
    if (await this.statusForm.submit(StatusesStore.create)) {
      await this.fetchData();
    }
    this.statusForm = new StatusForm();
    this.rerender();
    this.activatorStatus = false;
  }

  async add(): Promise<void> {
    if (await this.candidateForm.submit(CandidatesStore.create)) {
      await this.fetchData();
    }
    this.candidateForm = new CandidateForm();
    this.rerender();
    this.activator = false;
  }

  async update(): Promise<void> {
    if (await this.updateCandidateForm.submit(CandidateItemStore.update, this.updateCandidateForm.candidateId.toString())) {
      await this.fetchData();
    }
    this.updateCandidateForm = new UpdateCandidateForm();
    this.rerender();
    this.activatorCandidate = false;
  }

  get user(): IUser {
    return AuthStore.user;
  }

  get candidates(): ICandidate[] {
    return CandidatesStore.candidates;
  }

  get candidateItem(): ICandidateItem | null {
    return CandidateItemStore.candidateItem;
  }

  get selectsActions(): ISelect[] {
    const data = SelectsStore.selectsActions;
    data[0].id = 5;
    data[data.length - 1].id = 4;
    return SelectsStore.selectsActions;
  }

  get statuses(): IStatuses[] {
    return StatusesStore.statuses;
  }

  get statusesLoaded(): boolean {
    return StatusesStore.statusesLoaded;
  }

  get infoPackages(): IInfoPackage[] {
    return InfoPackagesStore.infoPackages;
  }

  get infoPackagesLoaded(): boolean {
    return InfoPackagesStore.infoPackagesLoaded;
  }

  get statusIcons(): IStatusIcons[] {
    return StatusIconsStore.statusIcons;
  }

  get isMobile(): boolean {
    return AdaptiveStore.isMobile;
  }

  async created(): Promise<void> {
    await this.fetchData();
  }

  async fetchData(): Promise<void> {
    await StatusesStore.fetchAll();
    await CandidatesStore.fetchAll();
    await InfoPackagesStore.fetchAll();
    await StatusIconsStore.fetchAll();
  }

}
</script>

<style lang="scss">
.candidates {
  .badges {
    width: 100%;
    overflow-x: scroll;
    &__container {
      width: calc((100% / 4) - 12px);
      min-width: 204px;
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
