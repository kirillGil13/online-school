<template>
<div class="add_task pt-2 pl-3 pb-6">
  <task-input :tab-id="1" :task-item="taskItem" :candidates="candidates" :statuses="statuses" :filters="filters" @filter="onFilter"
              @search="search"/>
  <v-divider class="ml-3 mr-6"></v-divider>
  <div class="d-flex flex-row justify-space-between pl-3 pr-6 align-end" :style="{height: $adaptive.isMobile && '100%'}">
    <Button full-width small class="mr-3" @submit="createTask">Сохранить</Button>
    <Button class="secondary_blue" small @submit="$emit('close')">Отмена</Button>
  </div>
</div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import TaskInput from '../taskInput/TaskInput.vue';
import {CandidatesStore} from '../../../../store/modules/Candidates';
import {StatusesStore} from '../../../../store/modules/Statuses';
import {InfoPackagesStore} from '../../../../store/modules/InfoPackages';
import {IInfoPackage} from '../../../../entity/infoPackages/infoPackage.types';
import {IStatuses} from '../../../../entity/statuses/statuses.types';
import {ICandidate} from '../../../../entity/candidates';
import Filters from '../../../../entity/filters/filters';
import {FiltersCandidatesNameEnum, IFilters} from '../../../../entity/filters/filters.types';
import {FiltersStore} from '../../../../store/modules/Filters';
import {ITaskItem} from '../../../../entity/todo/todo.types';
import Button from '../../common/Button.vue';
import {TodoStore} from '../../../../store/modules/Todo';
import {eventBus} from '../../../../main';
import {AlertTypeEnum} from '../../../../entity/common/alert.types';
@Component({
  components: {Button, TaskInput}
})
export default class AddTask extends Vue {

  taskItem: ITaskItem = {
    name: '',
    checked: false,
    description: '',
    doDate: null,
    imagesLink: [],
    candidateId: null,
    candidateName: '',
      categoryId: null
  };
  alertType = AlertTypeEnum;
  filters: Filters;
  searchBody = '';

  constructor() {
    super();
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

  get infoPackagesLoaded(): boolean {
    return InfoPackagesStore.infoPackagesLoaded;
  }

  get statusesLoaded(): boolean {
    return StatusesStore.statusesLoaded;
  }

  get filtersCandidates(): IFilters[] {
    return FiltersStore.candidates;
  }


  get statuses(): IStatuses[] {
    return StatusesStore.statuses;
  }

  get candidates(): {[p: string]: ICandidate[]} {
    return CandidatesStore.candidates;
  }

  get infoPackages(): IInfoPackage[] {
    return InfoPackagesStore.infoPackages;
  }

  async createTask(): Promise<void> {
        const el = {
          name: this.taskItem.name || null,
          do_date: null,
          description: this.taskItem.description || null,
          category_id: this.taskItem.checked ? 6 : 1,
          reminder_time: null,
          images_link: this.taskItem.imagesLink.length === 0 ? null : this.taskItem.imagesLink,
          candidate_id: this.taskItem.candidateId ? this.taskItem.candidateId : null
        };
        await TodoStore.createTask({data: el, checked: this.taskItem.checked});
        this.$emit('close');
    eventBus.$emit('showAlert', {
      show: true,
      type: this.alertType.Info,
      text: 'Заметка успешно создана'
    })
  }

  async search(searchBody: string): Promise<void> {
    this.searchBody = searchBody;
    await this.filtration();
  }

  async onFilter(): Promise<void> {
    await this.filtration();
  }

  async filtration(): Promise<void> {
    await CandidatesStore.fetchAll({data: {
        statusId: this.filters.default[0],
        infoPackId: this.filters.default[2],
        search: this.searchBody,
        isFiction: this.filters.filterBody.find(item => item.filterType === FiltersCandidatesNameEnum.Type)?.filterValue.find(item => item.value === this.filters.default[1])?.isFiction
      }});

  }

  async created(): Promise<void> {
    await CandidatesStore.fetchAll();
    await StatusesStore.fetchAll();
    await InfoPackagesStore.fetchAll();
  }
}

</script>

<style lang="scss">
.add_task {
  .items-add-place {
    margin-top: 0 !important;
    box-shadow: none !important;
  }
  .v-text-field > .v-input__control > .v-input__slot:before, .v-text-field > .v-input__control > .v-input__slot:after {
    content: none !important;
  }
}
</style>
