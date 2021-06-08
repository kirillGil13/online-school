<template>
    <div class="todo">
        <div class="todo__menu" :class="[!$adaptive.isMobile && 'mr-12']" :style="{width: $adaptive.isMobile && '100%'}">
            <v-list :collapse-transition="false" style="background: none" :width="$adaptive.isMobile ? '100%' : 300" nav dense>
              <v-list-item-group
                  v-model="activeTab"
                  color="#426df6"
              >
                  <v-list-item
                      v-for="item in tabs"
                      :id="item.categoryName"
                      :key="item.categoryName"
                      :ripple="!$adaptive.isMobile"
                      @click="setComponent"
                      exact
                      active-class="active-todo"
                      class="todo-list-item py-2 pl-3 pr-2"
                  >
                    <v-list-item-icon class="my-0 mr-3">
                      <svg-icon :name="getIconName(item.categoryId)" class="menu__icon" height="24" width="24" />
                    </v-list-item-icon>
                    <v-list-item-title v-text="item.categoryName" />
                    <span v-if="item.taskCount > 0" style="font-size: 16px; color: #5F739C;">{{item.taskCount}}</span>
                  </v-list-item>
              </v-list-item-group>
            </v-list>
        </div>
        <div style="width: 100%" v-if="!$adaptive.isMobile && tabs.length !== 0">
            <template v-if="activeTab !== 2" >
                <DefaultTodoComponent
                    :statusItem="tabs[activeTab]"
                    :id="tabs[activeTab].categoryId"
                    :candidates="candidates"
                    :filters="filters"
                    :tasks="tasks"
                    @createTask="createTask"
                    @deleteTask="deleteTask"
                    @upDateTask="upDateTask"
                    @filter="onFilter"
                    @search="search"
                    @toJurnalOrIncome="toJurnalOrIncome"
                    style="margin-right: 2px; margin-left: 2px;"
                />
            </template>
            <template v-else>
                <TodoPlans
                    :id="tabs[activeTab].categoryId"
                    :statusItem="tabs[activeTab]"
                    :activeTab="activeTab"
                    :candidates="candidates"
                    :filters="filters"
                    @createTask="createTask"
                    @deleteTask="deleteTask"
                    @upDateTask="upDateTask"
                    @filter="onFilter"
                    @search="search"
                    @toJurnalOrIncome="toJurnalOrIncome"
                    style="margin-right: 2px; margin-left: 2px;"
                />
            </template>
         </div>
      <Modal v-if="$adaptive.isMobile" :activator="activator" @close="closeModal" :without-tool-bar="false" tool-bar-title="" :full-screen="true" @activatorChange="activatorChange">
        <template v-slot:full-screen-content v-if="activeTab || activeTab === 0">
          <template v-if="activeTab !== 2" >
            <DefaultTodoComponent
                :statusItem="tabs[activeTab]"
                :id="tabs[activeTab].categoryId"
                :candidates="candidates"
                :filters="filters"
                :tasks="tasks"
                @createTask="createTask"
                @deleteTask="deleteTask"
                @upDateTask="upDateTask"
                @filter="onFilter"
                @search="search"
                @toJurnalOrIncome="toJurnalOrIncome"
                :style="{marginRight: !$adaptive.isMobile && '2px', marginLeft: !$adaptive.isMobile && '2px'}"
            />
          </template>
          <template v-else>
            <TodoPlans
                :id="tabs[activeTab].categoryId"
                :statusItem="tabs[activeTab]"
                :activeTab="activeTab"
                :candidates="candidates"
                :filters="filters"
                @createTask="createTask"
                @deleteTask="deleteTask"
                @upDateTask="upDateTask"
                @filter="onFilter"
                @search="search"
                @toJurnalOrIncome="toJurnalOrIncome"
                :style="{marginRight: !$adaptive.isMobile && '2px', marginLeft: !$adaptive.isMobile && '2px'}"
            />
          </template>
        </template>
      </Modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FormGroup from '../../components/common/form/FormGroup.vue';
import Relation from '../../components/common/Relation.vue';
import Button from '@/UI/components/common/Button.vue';
import { TodoStore } from '@/store/modules/Todo';
import { TODOCOMPONENTS } from '@/constants';
import {ITaskStatus, ITodoTask, TaskRequestType} from '@/entity/todo/todo.types';
import DefaultTodoComponent from '@/UI/components/todo/DefaultTodoComponent.vue';
import TodoPlans from '@/UI/components/todo/TodoPlans.vue';
import {CandidatesStore} from '../../../store/modules/Candidates';
import {ICandidate} from '../../../entity/candidates';
import {StatusesStore} from '../../../store/modules/Statuses';
import {IStatuses} from '../../../entity/statuses/statuses.types';
import Filters from '../../../entity/filters/filters';
import {FiltersCandidatesNameEnum, IFilters} from '../../../entity/filters/filters.types';
import {FiltersStore} from '../../../store/modules/Filters';
import {IInfoPackage} from '../../../entity/infoPackages/infoPackage.types';
import {InfoPackagesStore} from '../../../store/modules/InfoPackages';
import Modal from '../../components/common/Modal.vue';


@Component({
    components: {
      Modal,
        FormGroup,
        Relation,
        Button,
        DefaultTodoComponent,
        TodoPlans
    },
})
export default class TodoList extends Vue {
    showTextArea = false;
    activeTab = this.$adaptive.isMobile ? null : 0;
    filters: Filters;
    activator = false;
    searchBody = '';

  constructor() {
    super();
    this.filters = new Filters(this.filtersCandidates);
  }

  get filtersCandidates(): IFilters[] {
    return FiltersStore.candidates;
  }

    @Watch('activeTab')
    async onChange(val: number | null): Promise<void> {
        if (this.$adaptive.isMobile) {
          if (val || val === 0) {
            await this.fetchData(this.tabs[val!].categoryId);
          }
        } else {
          await this.fetchData(this.tabs[val!].categoryId);
        }
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

  get infoPackages(): IInfoPackage[] {
    return InfoPackagesStore.infoPackages;
  }

  get infoPackagesLoaded(): boolean {
    return InfoPackagesStore.infoPackagesLoaded;
  }

  get statusesLoaded(): boolean {
    return StatusesStore.statusesLoaded;
  }

    get tabs(): ITaskStatus[] {
        return TodoStore.tasksStatuses;
    }

  get statuses(): IStatuses[] {
    return StatusesStore.statuses;
  }

    get candidates(): {[p: string]: ICandidate[]} {
      return CandidatesStore.candidates;
    }

    get tasks(): ITodoTask[] {
        return TodoStore.todoTasks.map(el => {
            if(this.activeTab !== 5) {
                return {
                    ...el,
                    checked: false
                }
            }else {
                return {
                    ...el,
                    checked: true
                }
            }
        })
    }

    activatorChange(act: boolean): void {
      this.activator = act;
    }

    getIconName(id: number): string {
        return TODOCOMPONENTS.find(el => el.id === id)!.iconName
    }


    setComponent(): void {
        if (this.$adaptive.isMobile) {
          this.activator = true;
        }
    }

  closeModal(): void {
    this.activeTab = null;
  }


    fetchData(id = 1): void {
        TodoStore.fetchAllTask({id});
        CandidatesStore.fetchAll();
      StatusesStore.fetchAll();
      InfoPackagesStore.fetchAll();
    }

    fetchDatatStatusesTasks(): void {
        TodoStore.fetchAllTaskStatus()
    }


    async createTask(data: TaskRequestType, checked: boolean): Promise<void> {
        await TodoStore.createTask({data: data, checked: checked});
        if (checked) {
          await TodoStore.setTaskCount({id: 6, delete: false});
        } else {
          await TodoStore.setTaskCount({id: data.category_id, delete: false});
        }
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

    async deleteTask(id: number): Promise<void> {
      await TodoStore.deletedTask({id});
      await TodoStore.setTaskCount({id: this.tabs[this.activeTab!].categoryId, delete: true});
    }

    async created(): Promise<void> {
        await this.fetchDatatStatusesTasks();
        await this.fetchData();
    }

    async upDateTask(el: TaskRequestType, checked: boolean, route: number, newTask?: boolean): Promise<void> {
        await TodoStore.updateCandidateTask({data: el, checked: checked, route: route, newTask: newTask});
    }

    async toJurnalOrIncome(el: TaskRequestType, route: number): Promise<void> {
        await TodoStore.ToJurnalOrIncome({data: el, route: route});
        if (el.category_id === 1) {
          await TodoStore.setTaskCount({id: 6, delete: true});
          await TodoStore.setTaskCount({id: el.category_id, delete: false});
        } else {
          await TodoStore.setTaskCount({id: 1, delete: true});
          await TodoStore.setTaskCount({id: el.category_id, delete: false});
        }
    }
}
</script>

<style lang="scss">
.todo {
    background: none !important;
    display: flex;
    height: 100%;

    &__items {
        flex-direction: column;
        height: 100%;

        .items-title {
            display: flex;
            align-items: center;

            .title-text {
                font-weight: bold;
                font-size: 36px;
                color: #101010;
                margin-left: 16px;
            }
        }



        .items-btn-add {
            padding-left: 8px;
            display: flex;
            align-items: center;
            cursor: pointer;

            .items-icon-plus {
                border: 2px solid #426DF6;
                border-radius: 5px;
            }

            .btn-add-text {
                margin-left: 11px;
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                color: #426df6;
            }
        }

        .items-check-boxes {
            display: flex;
            flex-direction: column;
        }
    }

    .v-text-field > .v-input__control > .v-input__slot:after {
        border: none !important;
    }

    .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
        border: none !important;
    }

    .v-list--nav .v-list-item:not(:last-child):not(:only-child), .v-list--rounded .v-list-item:not(:last-child):not(:only-child) {
        margin-bottom: 0;
    }

  .todo-list-item {
    min-height: max-content !important;
    .v-list-item__title {
      font-size: 16px !important;
      line-height: 120% !important;
    }
  }
  .active-todo {
    .v-list-item__title {
      color: #000000 !important;
    }
  }

    #Входящие {
        margin-bottom: 16px;
    }

    #Журнал {
        margin-top: 16px;
    }

    .icon-statuses {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .v-text-field {
        padding-top: 0 !important;
    }
  .v-list--nav .v-list-item, .v-list--nav .v-list-item:before {
    border-radius: 8px !important;
  }
}
</style>
