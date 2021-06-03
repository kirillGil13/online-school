<template>
    <div class="todo">
        <div class="todo__menu mr-12">
            <v-list :collapse-transition="false" v-model="componentId" style="background: none" width="300" nav dense>
              <v-list-item-group
                  v-model="activeTab"
                  color="#426df6"
              >
                  <v-list-item
                      v-for="item in tabs"
                      :id="item.categoryName"
                      :key="item.categoryName"
                      :ripple="!$adaptive.isMobile"
                      @click="setComponent(item)"
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
        <div style="width: 100%">
            <template v-if="activeTab !== 2" >
                <DefaultTodoComponent
                    :statusItem="tabs[activeTab]"
                    :id="componentId"
                    :tasks="tasks"
                    :taskById="taskById"
                    @createTask="createTask"
                    @deleteTask="deleteTask"
                    @setTaskById="setTaskById"
                    @upDateTask="upDateTask"
                    @toJurnalOrIncome="toJurnalOrIncome"
                    style="margin-right: 2px; margin-left: 2px;"
                />
            </template>
            <template v-else>
                <TodoPlans
                    :statusItem="tabs[activeTab]"
                    :activeTab="activeTab"
                    :taskById="taskById"
                    @createTask="createTask"
                    @deleteTask="deleteTask"
                    @setTaskById="setTaskById"
                    @upDateTask="upDateTask"
                    @toJurnalOrIncome="toJurnalOrIncome"
                    style="margin-right: 2px; margin-left: 2px;"
                />
            </template>
         </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import FormGroup from '../../components/common/form/FormGroup.vue';
import Relation from '../../components/common/Relation.vue';
import Button from '@/UI/components/common/Button.vue';
import { TodoStore } from '@/store/modules/Todo';
import { TodoStatus } from '@/entity/todo/todoStatus';
import { TODOCOMPONENTS } from '@/constants';
import {ITaskStatus, ITodoTask} from '@/entity/todo/todo.types';
import DefaultTodoComponent from '@/UI/components/todo/DefaultTodoComponent.vue';
import TodoPlans from '@/UI/components/todo/TodoPlans.vue';


@Component({
    components: {
        FormGroup,
        Relation,
        Button,
        DefaultTodoComponent,
        TodoPlans
    },
})
export default class TodoList extends Vue {
    showTextArea = false;
    todoTitle = false;
    checkbox = false;
    componentId= 2;
    activeTab = 0;

    @Watch('activeTab')
    onChange(): void {
        this.fetchData(this.tabs[this.activeTab].categoryId)
    }

    get taskById(): ITodoTask | null {
        return TodoStore.taskById;
    }

    get tabs(): ITaskStatus[] {
        return TodoStore.tasksStatuses;
    }

    get tasksLoaded(): boolean {
        return TodoStore.todoTasksLoaded;
    }

    get tasks(): ITodoTask[] {
        return TodoStore.todoTasks.map(el => {
            if(this.activeTab !== 6) {
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

    getIconName(id: number): string {
        return TODOCOMPONENTS.find(el => el.id === id)!.iconName
    }


    setComponent(component: TodoStatus): void {
        this.componentId = component.categoryId;

    }


    fetchData(id: number = 1): void {
        TodoStore.fetchAllTask({id});
    }

    fetchDatatStatusesTasks(): void {
        TodoStore.fetchAllTaskStatus()
    }


    createTask(data: {name?: string; description?: string; do_date?: number; reminder_time?: number; candidate_id?: number; category_id: number; images_link?: string[] }): void {
        TodoStore.createTask(data);
        TodoStore.setTaskCount({id: data.category_id, delete: false});
    }

    async deleteTask(id: number): Promise<void> {
      await TodoStore.deletedTask({id});
      await TodoStore.setTaskCount({id: this.tabs[this.activeTab].categoryId, delete: true});
    }

    async created(): Promise<void> {
        await this.fetchData();
        await this.fetchDatatStatusesTasks();
        
    }

    async setTaskById(id: number): Promise<void> {
        await TodoStore.getCandidateTask({ id: id });
    }

    async upDateTask(el: any): Promise<void> {
        await TodoStore.updateCandidateTask(el!);
    }

    async toJurnalOrIncome(el: any): Promise<void> {
        TodoStore.ToJurnalOrIncome(el!);
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
            margin-top: 36px;
            display: flex;
            align-items: center;
            cursor: pointer;
            
            .items-icon-plus {
                border: 2px solid #426DF6;
                border-radius: 5px;
            }

            .btn-add-text {
                margin-left: 14px;
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                color: #426df6;
            }
        }

        .items-check-boxes {
            display: flex;
            flex-direction: column;
            padding-left: 7px;
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
