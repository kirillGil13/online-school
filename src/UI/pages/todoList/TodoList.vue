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
        <keep-alive>
            <component
                :is="activeComponent"
                :id="componentId"
                :tasks="tasks"
                @createTask="createTask"
                @deleteTask="deleteTask"
                style="margin-right: 2px; margin-left: 2px;"
            />
         </keep-alive>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormGroup from '../../components/common/form/FormGroup.vue';
import Relation from '../../components/common/Relation.vue';
import Button from '@/UI/components/common/Button.vue';
import TodoIncome from '@/UI/components/todo/TodoIncome.vue';
import TodoAnyTimes from '@/UI/components/todo/TodoAnyTimes.vue';
import TodoJournal from '@/UI/components/todo/TodoJournal.vue';
import TodoPlans from '@/UI/components/todo/TodoPlans.vue';
import TodoSomeDay from '@/UI/components/todo/TodoSomeDay.vue';
import TodoToday from '@/UI/components/todo/TodoToday.vue';
import { TodoStore } from '@/store/modules/Todo';
import { TodoStatus } from '@/entity/todo/todoStatus';
import { TODOCOMPONENTS } from '@/constants';
import {ITaskStatus, ITodoTask} from '@/entity/todo/todo.types';



@Component({
    components: {
        FormGroup,
        Relation,
        Button,
        TodoPlans,
        TodoSomeDay,
        TodoIncome,
        TodoToday,
        TodoAnyTimes,
        TodoJournal
    },
})
export default class TodoList extends Vue {
    showTextArea = false;
    todoTitle = false;
    checkbox = false;
    activeComponent = 'TodoToday';
    componentId= 2;
    activeTab = 1;

    get tabs(): ITaskStatus[] {
        return TodoStore.tasksStatuses;
    }

    get tasks(): ITodoTask[] {
        return TodoStore.todoTasks;
    }

    getIconName(id: number): string {
        return TODOCOMPONENTS.find(el => el.id === id)!.iconName
    }


    setComponent(component: TodoStatus): void {
        this.activeComponent = component.component!;
        this.componentId = component.categoryId;
        this.fetchData(component.categoryId)
    }


    fetchData(id: number = 2): void {
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
        await this.fetchDatatStatusesTasks();
        await this.fetchData();
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
        margin-left: 48px;
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
            max-width: max-content;

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
