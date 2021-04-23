<template>
  <v-col class="candidates">
    <Header
        :isBordered="false"
        title="Кандидаты"
        class="top_bar_p_0"
        description="Здесь отображаются контактные данные всех людей, которые зарегистрировались по вашим инфопакетам"
    >
    </Header>
    <v-row>
      <v-col class="mt-6">
        <FilterComponent :isCandidates="true" @toggleArchive="toggleIsArchive" :isArchive="isArchive" :isOnRight="false" :button="true" :search="true"
                         :filters="filters" @filter="onFilter" :countInArchive="countInArchive">
          <template v-slot:search>
            <Search @search="search"/>
          </template>
          <template v-slot:button>
            <Button @submit="activator = true">Добавить кандидата</Button>
          </template>
        </FilterComponent>
      </v-col>
    </v-row>
    <v-row no-gutters  v-if="candidates !== {} || candidatesLoaded" class="d-flex">
      <v-col class="mt-6">
        <TableCandidates :candidates="candidates" :selects="selectsActions" :statuses="statuses" @select="selectStatus"
                         @extraAction="openUpdate" @addStatus="activatorStatus = true"  @candidateChangeCallTimeDetails="candidateChangeCallTimeDetails" @choseCandidate="choseCandidate"/>
      </v-col>
      <div style="width: 29%; margin-top: 7.5%;" class="ml-4" v-show="!$adaptive.isMobile && openItemDetails ">
        <candidate-item-detail @extraAction="openUpdate" @updateNote="updateNote" @addStatus="activatorStatus = true"  @select="selectStatus" @changeCallTime="changeCallTime"  @closeCandidateItemDetail="closeCandidateItemDetail" :selects="selectsActions" :indexCandidate="indexCandidate" :statuses="statuses" :item="getcandidateItemDetail"/>
      </div>
    </v-row>
    <v-row v-else-if="candidates === {}">
      <v-col class="mt-10 d-flex justify-center align-center">
        К сожалению данные не найдены
      </v-col>
    </v-row>
    <v-row v-else class="mt-2">
      <v-col>
        <v-progress-linear
            :active="true"
            :indeterminate="true"
            color="primary accent-4"
        ></v-progress-linear>
      </v-col>
    </v-row>
    <Modal v-if="statusesLoaded && infoPackagesLoaded" :activator="activator" @activatorChange="activatorChange">
      <template v-slot:content>
        <CandidateFormComponent :form="candidateForm" v-if="destroy" :statuses="statuses" :info-packs="infoPackages"
                                :account-id="user.id" @close="close" @add="add"/>
      </template>
    </Modal>
    <Modal :activator="activatorStatus" @activatorChange="activatorChangeStatus">
      <template v-slot:content>
        <StatusFormComponent :form="statusForm" v-if="destroy" :status-icons="statusIcons" @close="close"
                             @createStatus="createStatus"/>
      </template>
    </Modal>
    <Modal :activator="activatorCandidate" @activatorChange="activatorChangeCandidate">
      <template v-slot:content>
        <UpdateCandidateFormComponent :form="updateCandidateForm" v-if="destroyUpdateForm" :account-id="user.id" @close="close"
                                      @update="update"/>
      </template>
    </Modal>
    <Modal :activator="activatorCallTime" @activatorChange="activatorChangeCallTime">
      <template v-slot:content>
        <CallTimeFormComponent :form="callTimeForm" v-if="destroy" @close="close"
                               :candidate="Object.values(candidates).flat().find(item => item.id === candidateId)"
                               @delete="deleteCallTime"
                               @save="saveCallTime"/>
      </template>
    </Modal>
    <Modal :activator="$adaptive.isMobile && openItemDetails"  @activatorChange="activatorItemDetail">
      <template v-slot:content>
        <candidate-item-detail @extraAction="openUpdate" @updateNote="updateNote" @addStatus="activatorStatus = true"  @select="selectStatus" @changeCallTime="changeCallTime"  @closeCandidateItemDetail="closeCandidateItemDetail" :selects="selectsActions" :indexCandidate="indexCandidate" :statuses="statuses" :item="getcandidateItemDetail"/>
      </template>
    </Modal>
    <Alert :show="show" :type="alertType.Success" text="Заметка добавлена" @show="showAlert"/>
  </v-col>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
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
import CandidateFormComponent from '@/UI/components/forms/candidateForm/CandidateFormComponent.vue';
import {CandidateForm} from '@/form/candidate/candidateForm';
import {IInfoPackage} from '@/entity/infoPackages/infoPackage.types';
import {InfoPackagesStore} from '@/store/modules/InfoPackages';
import {StatusesStore} from '../../../store/modules/Statuses';
import {IStatuses, StatusRequestNameEnum} from '../../../entity/statuses/statuses.types';
import {StatusForm} from '../../../form/status/statusForm';
import StatusFormComponent from '../../components/forms/statusForm/StatusFormComponent.vue';
import {StatusIconsStore} from '../../../store/modules/StatusIcons';
import {IStatusIcons} from '../../../entity/statusIcons/statusIcons.types';
import {CandidateItemStore} from '../../../store/modules/CandidateItem';
import UpdateCandidateFormComponent from '../../components/forms/candidateForm/UpdateCandidateFormComponent.vue';
import {ICandidateItem} from '../../../entity/candidateItem/candidateItem.types';
import {UpdateCandidateForm} from '../../../form/updateCandidate/updateCandidateForm';
import {FiltersCandidatesNameEnum, IFilters} from '../../../entity/filters/filters.types';
import {FiltersStore} from '../../../store/modules/Filters';
import {CallTimeForm} from '../../../form/callTime/callTimeForm';
import CallTimeFormComponent from '../../components/forms/callTimeForm/CallTimeFormComponent.vue';
import CandidateItemDetail from '../../components/candidateItemDetail/CandidateItemDetail.vue';
import {AlertTypeEnum} from '../../../entity/common/alert.types';
import Alert from '../../components/common/Alert.vue';

@Component({
  components: {
    CallTimeFormComponent,
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
    CandidateItemDetail,
    Alert
  },
})
export default class Candidates extends Vue {
  filters: Filters;
  activator = false;
  activatorStatus = false;
  activatorCandidate = false;
  activatorCallTime = false;
  candidateForm: CandidateForm;
  updateCandidateForm: UpdateCandidateForm;
  statusForm: StatusForm;
  callTimeForm: CallTimeForm;
  destroyUpdateForm = true;
  destroy = true;
  candidateId = 0;
  searchBody = '';
  isArchive = false;
  chosenCandidate: null | ICandidate = null;
  openItemId = null;
  indexCandidate: null | number = null;
  openItemDetails = false;
  show = false;
  alertType = AlertTypeEnum;


  fetchCandidates = (): void => {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

      if (bottomOfWindow && Object.values(this.candidates).length % 100 === 0) {
          CandidatesStore.fetchAll({data: {skip: Object.values(this.candidates).length, limit: 100}, scroll: true});
      }
  };

  constructor() {
    super();
    this.candidateForm = new CandidateForm();
    this.statusForm = new StatusForm();
    this.callTimeForm = new CallTimeForm();
    this.updateCandidateForm = new UpdateCandidateForm();
    this.filters = new Filters(this.filtersCandidates);
  }

  @Watch('statusesLoaded', {immediate: true})
  onFilterStatusChange(): void {

    for (let i = 0; i < this.statuses.length; i++) {
      this.$set(this.filters.filterBody[0].filterValue, i + 1, {text: this.statuses[i].name, value: this.statuses[i].id});
    }
  }

  @Watch('infoPackagesLoaded', {immediate: true})
  onFilterInfoPackagesChange(): void {
    for (let i = 0; i < this.infoPackages.length; i++) {
      this.$set(this.filters.filterBody[2].filterValue, i + 1, {
        text: this.infoPackages[i].name,
        value: this.infoPackages[i].id
      });
    }
  }

  get user(): IUser | null {
    return AuthStore.user;
  }

  get candidates(): {[params: string]: ICandidate[]} {
    return CandidatesStore.candidates;
  }

  get candidatesLoaded(): boolean {
    return CandidatesStore.candidatesLoaded;
  }

  get candidateItem(): ICandidateItem | null {
    return CandidateItemStore.candidateItem;
  }

  get selectsActions(): ISelect[] {
    const data = SelectsStore.selectsActions;
    data[0].id = 5;
    data[data.length - 1].id = 4;
    return data;
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

  get filtersCandidates(): IFilters[] {
    return FiltersStore.candidates;
  }

   get countInArchive(): number {
    return  CandidatesStore.candidateArchiveCount;
  }

  get getcandidateItemDetail(): ICandidate {
    return Object.values(this.candidates).flat().find(el => el.id === this.indexCandidate)!
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
    this.activatorCandidate = act;
    if (act) {
      this.destroyUpdateForm = true;
    } else this.destroyUpdateForm = false;
  }

  activatorChangeCallTime(act: boolean): void {
    this.destroy = true;
    this.activatorCallTime = act;
  }

  activatorItemDetail(act: boolean) :void {
    this.openItemDetails = act;

  }

  close(): void {
    this.activator = false;
    this.activatorStatus = false;
    this.activatorCandidate = false;
    this.activatorCallTime = false;
  }

  choseCandidate(index: number): void {
    this.indexCandidate = index;
    this.openItemDetails = true;
  }

  closeCandidateItemDetail(): void {
    this.openItemDetails = false;
  }

  rerender(): void {
    this.destroy = false;
    this.$nextTick(() => {
      this.destroy = true;
    });
  }

  candidateChangeCallTimeDetails(id: number): void {
    const index = Object.values(this.candidates).flat().findIndex((el) => el.id === id);
    const callTime = Object.values(this.candidates).flat().find(el => el.id === id)!.callTime!;

    this.changeCallTime({index, callTime})
  }

  changeCallTime(data: {index: number; callTime: string}): void {
    this.candidateId = Object.values(this.candidates).flat()[data.index].id;
    this.activatorCallTime = true;
  }

  created(): void {
    this.fetchData();
  }

  mounted(): void {
    window.addEventListener('scroll', this.fetchCandidates);
  }

  beforeDestroy(): void {
    window.removeEventListener('scroll', this.fetchCandidates);
  }

  fetchData(): void {
    StatusesStore.fetchAll();
    CandidatesStore.fetchAll();
    InfoPackagesStore.fetchAll();
    StatusIconsStore.fetchAll();
    CandidatesStore.takeCountStatusCandidates({status: StatusRequestNameEnum.ARCHIVE});

  }

  showAlert(show: boolean): void {
    this.show = show;
  }

  async search(searchBody: string): Promise<void> {
    this.searchBody = searchBody;
    await this.filtration();
  }

  async onFilter(): Promise<void> {
    await this.filtration();
  }

  async toggleIsArchive(): Promise<void> {
    this.openItemDetails = false;
    if(this.isArchive){
      this.isArchive = false;
      await CandidatesStore.fetchAll({data: {
      statusId: 0,
    }});
    }else {
      this.isArchive = true;
      await CandidatesStore.fetchAll({data: {
      statusId: 4,
    }});

    }

  }

  async filtration(): Promise<void> {
    this.isArchive = false;
    await CandidatesStore.fetchAll({data: {
      statusId: this.filters.default[0],
      infoPackId: this.filters.default[2],
      search: this.searchBody,
      isFiction: this.filters.filterBody.find(item => item.filterType === FiltersCandidatesNameEnum.Type)?.filterValue.find(item => item.value === this.filters.default[1])?.isFiction
    }});

  }

  async openUpdate(id: number): Promise<void> {
    await CandidateItemStore.fetchData(id.toString());
    await this.updateCandidateForm.setFormData(this.candidateItem!, this.statuses, this.infoPackages, this.user!.id);
    this.destroyUpdateForm = true;
    this.activatorCandidate = true;
  }

  async selectStatus(data: { statusId: number; id: number}): Promise<void> {


    if( data.statusId === 4) {
      this.closeCandidateItemDetail();
    }

    if(data.statusId !== 4) {
      this.isArchive = false;
    }

    this.candidateId = data.id;
    const el = Object.values(this.candidates).flat().find(item => item.id === this.candidateId)
    if (!(Object.values(this.candidates).flat().find(item => item.id === this.candidateId)!.status.id === data.statusId) ) {
      if (data.statusId !== 3) {
        await this.setStatus(data);
        return
      } else {
        await this.setStatus(data);
        this.activatorCallTime = true;
        return
      }
    }

    if(data.statusId === 4 && Object.values(this.candidates).flat().find(item => item.id === this.candidateId)!.status.id === data.statusId ){
      await CandidatesStore.delete(data.id.toString());
      await CandidatesStore.fetchAll({data: {statusId: data.statusId}});
      await CandidatesStore.takeCountStatusCandidates({status: StatusRequestNameEnum.ARCHIVE});
    }

  }

  async setStatus(data: { statusId: number; id: number }): Promise<void> {
    if (await StatusesStore.set({status: {status_id: data.statusId}, candidateId: data.id.toString()})) {// eslint-disable-line
      await this.fetchData();
    }
  }

  async createStatus(): Promise<void> {
    if (await this.statusForm.submit(StatusesStore.create)) {
      await this.fetchData();
      for (let i = 1; i < this.statuses.length; i++) {
        this.$set(this.filters.filterBody[0].filterValue, i, {text: this.statuses[i].name, value: this.statuses[i].id});
      }
    }
    this.statusForm = new StatusForm();
    this.rerender();
    this.activatorStatus = false;
  }

  async add(): Promise<void> {
    const date = new Date(this.candidateForm.callTimeFake);
    const seconds = date.getTime() / 1000;
    this.candidateForm.callTime = seconds;
    if (await this.candidateForm.submit(CandidatesStore.create)) {
      await this.fetchData();
    }
    this.candidateForm = new CandidateForm();
    this.rerender();
    this.activator = false;
  }

  async updateNote(data: {note: string, id: number}): Promise<void> {
    await CandidateItemStore.update({data: {description: data.note}, route: data.id.toString()});
    this.show = true;
  }

  async update(): Promise<void> {
    const date = new Date(this.updateCandidateForm.callTimeFake);
    const seconds = date.getTime() / 1000;
    this.updateCandidateForm.callTime = seconds;
    if (await this.updateCandidateForm.submit(CandidateItemStore.update, this.updateCandidateForm.candidateId.toString())) {
      await this.fetchData();
    }
    this.updateCandidateForm = new UpdateCandidateForm();
    this.activatorCandidate = false;
    this.destroyUpdateForm = false;
  }

  async saveCallTime(): Promise<void> {
    const date = new Date(this.callTimeForm.callTimeFake);
    const seconds = date.getTime() / 1000;
    this.callTimeForm.callTime = seconds;
    if (await this.callTimeForm.submit(CandidateItemStore.setCallTime, this.candidateId.toString())) {
      await this.fetchData();
    }
    this.callTimeForm = new CallTimeForm();
    this.rerender();
    this.activatorCallTime = false;
  }

  async deleteCallTime(): Promise<void> {
    this.callTimeForm.callTime = null;
    if (await this.callTimeForm.submit(CandidateItemStore.setCallTime, this.candidateId.toString())) {
      await this.fetchData();
    }
    this.callTimeForm = new CallTimeForm();
    this.rerender();
    this.activatorCallTime = false;
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
