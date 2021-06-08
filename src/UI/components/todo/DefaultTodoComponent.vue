<template>
    <div class="d-flex todo__items" style="width: 100%">
        <div class="items-title pb-9">
            <svg-icon :name="getIconName(statusItem.categoryId)" style="width: 28px; height: 28px" />
            <span class="title-text">{{ statusItem.categoryName }}</span>
        </div>
        <div class="add-task" v-if="statusItem.categoryId !== 6">
            <div class="items-btn-add" style="padding-left: 10px" @click="openCardToCreateTask">
                <v-icon class="items-icon-plus" small color="#426DF6">mdi-plus</v-icon>
                <span class="btn-add-text">Добавить задачу</span>
            </div>
            <TaskInput v-if="showTextArea" @setTask="setTask" :filters="filters" :statuses="statuses" :candidates="candidates" :tabId="id" :task-item="taskItem" v-on="$listeners"  />
        </div>
        <div class="items-check-boxes" v-click-outside="closeTask">
            <template v-for="item in tasks">
                <div class="d-flex flex-column mt-2" :key="item.id" v-if="!item.hide">
                    <div class="d-flex align-center justify-space-between task-item-container px-2" v-if="taskShowId !== item.id">
                        <div class="d-flex align-end">
                            <v-checkbox
                                hide-details
                                class="mt-0 pt-0"
                                @click="statusItem.categoryId !== 6 ? setToJurnal(item.id) : setToIncome(item.id)"
                                v-model="item.checked"
                            />
                            <span class="item-text" @click.self="setTaskShowid(item.id)">{{
                                item.name ? `${item.name}` : 'Новая задача'
                            }}</span>
                        </div>
                        <div class="d-flex align-center">
                            <v-btn
                                @click="deleteTask(item.id)"
                                style="background: none"
                                class="mt-0"
                                text
                                icon
                                color="red lighten-2"
                            >
                                <svg-icon name="Todo_delete" class="ml-1 mr-1 menu__icon" height="20" width="24" />
                            </v-btn>
                        </div>
                    </div>
                    <TaskInput v-else-if="taskShowId === item.id" @setTask="setTask" :filters="filters" :statuses="statuses" :candidates="candidates" :task-item="taskItem" :tabId="id" v-on="$listeners" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import {ITaskItem, ITaskStatus, ITodoTask} from '@/entity/todo/todo.types';
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import TaskInput from './taskInput/TaskInput.vue';
import {PARENTCLASSES, TODOCOMPONENTS} from '@/constants';
import {ICandidate} from '../../../entity/candidates';
import {IStatuses} from '../../../entity/statuses/statuses.types';
import Filters from '../../../entity/filters/filters';

@Component({
    components: { TaskInput },
})
export default class DefaultTodoComponent extends Vue {
    @Prop() readonly tasks!: ITodoTask[];
    @Prop() readonly id!: number;
    @Prop() readonly statusItem!: ITaskStatus;
    @Prop() readonly candidates!: {[p: string]: ICandidate[]};
    @Prop() readonly statuses!: IStatuses[];
  @Prop() readonly filters!: Filters;
    taskShowId: number | null = null;
    showTextArea = false;
    checkbox = false;
    taskItem: ITaskItem = {
        name: '',
        checked: false,
        description: '',
        doDate: null,
        imagesLink: [],
        candidateId: null,
        candidateName: ''
    };
    newTask = false;

    @Watch('id')
    onChange(): void {
      this.showTextArea = false;
      this.taskShowId = null;
      this.setTaskToNull();
    }

    @Watch('tasks', {immediate: false})
    onChangeTasks(val: any, oldVal: any): void {
      for (let i = 1; i < this.tasks.length; i++) {
        this.tasks[i].hide = false;
      }
      if (val.length > oldVal.length && this.showTextArea) {
        this.tasks[0].hide = true;
        this.newTask = true;
      }
      if (!this.newTask) {
        this.tasks[0].hide = false;
      }
    }

    @Watch('showTextArea')
    onChangeShow(): void {
      if (!this.showTextArea) {
        this.tasks[0].hide = false;
        this.newTask = false;
      }
    }

    @Watch('taskShowId')
    onChangeId(val: number | null, oldVal: number | null): void {
      if (val) {
        const item = this.tasks.find((el) => el.id === this.taskShowId)!;
        if (item.doDate) {
          item!.doDate = Number(item!.doDate) * 1000;
        }
        this.taskItem = {
          name: item.name,
          checked: false,
          description: item.description,
          doDate: item.doDate ? item.doDate : null,
          imagesLink: item.imagesLink,
          candidateId: item.candidate ? item.candidate.candidate_id : null,
          candidateName: item.candidate ? item.candidate.candidate_name : '',
        }
      } else {
        this.setTaskToNull();
      }
    }

    include(className: string): boolean {
      return PARENTCLASSES.includes(className);
    }

    closeTask(e: any): void {
      if (this.include(e.target.classList[0]) && e.target.classList[0] !== 'add-task' && e.target.classList[0] !== 'v-dialog__content' && (this.showTextArea || this.taskShowId)) {
        const empty: number[] = [];
        for (const taskItemKey in this.taskItem) {
          //@ts-ignore
          if (this.taskItem[taskItemKey] === null || this.taskItem[taskItemKey] === '' || this.taskItem[taskItemKey] === false || this.taskItem[taskItemKey].length === 0) {
           empty.push(1);
          }
        }
        if (empty.length === Object.keys(this.taskItem).length) {
          this.setTask();
        }
        this.showTextArea = false;
        if (this.taskShowId) {
          this.taskShowId = null;
        }
        this.setTaskToNull();
      }
    }

    setTaskToNull(): void {
      this.taskItem = {
        name: '',
        checked: false,
        description: '',
        doDate: null,
        imagesLink: [],
        candidateId: null,
        candidateName: ''
      };
    }

    getIconName(id: number): string {
        return TODOCOMPONENTS.find((el) => el.id === id)!.iconName;
    }

    async setTask(): Promise<void> {
        if (this.showTextArea === true) {
          if (!this.newTask) {
            const date = Date.now();
            const el = {
              name: this.taskItem.name || null,
              do_date:
                  this.statusItem.categoryId === 2
                      ? date / 1000
                      : this.taskItem.doDate !== null
                      ? this.taskItem.doDate / 1000
                      : null,
              description: this.taskItem.description || null,
              category_id: this.taskItem.checked ? 6 : this.statusItem.categoryId,
              images_link: this.taskItem.imagesLink.length === 0 ? null : this.taskItem.imagesLink,
              candidate_id: this.taskItem.candidateId ? this.taskItem.candidateId : null
            };
            this.$emit('createTask', el,  this.taskItem.checked);
          } else {
            const el = {
              name: this.taskItem.name,
              description: this.taskItem.description,
              do_date: this.taskItem.doDate ? this.taskItem.doDate / 1000 : null,
              category_id:
                  this.taskItem.checked && this.statusItem.categoryId !== 6
                      ? 6
                      : this.taskItem.checked && this.statusItem.categoryId === 6
                      ? 1
                      : this.statusItem.categoryId,
              images_link: this.taskItem.imagesLink,
              candidate_id: this.taskItem.candidateId ? this.taskItem.candidateId : null
            };
            this.$emit('upDateTask', el, this.taskItem.checked, this.tasks[0].id, true);
          }
        } else {
          this.setTaskShowid(null);
      }
    }

    openCardToCreateTask(): void {
        this.taskShowId = null;
        this.showTextArea = this.showTextArea ? false : true;
    }

    setTaskShowid(id: number | null): void {
        this.showTextArea = false;

        if (this.taskShowId === id || id === null) {
                 const el = {
                    name: this.taskItem.name,
                    description: this.taskItem.description,
                   do_date: this.taskItem.doDate ? this.taskItem.doDate / 1000 : null,
                   category_id:
                        this.taskItem.checked && this.statusItem.categoryId !== 6
                            ? 6
                            : this.taskItem.checked && this.statusItem.categoryId === 6
                            ? 1
                            : this.statusItem.categoryId,
                   images_link: this.taskItem.imagesLink,
                   candidate_id: this.taskItem.candidateId ? this.taskItem.candidateId : null
                };
                this.$emit('upDateTask', el, this.taskItem.checked, this.taskShowId!);
        } else {
            this.taskShowId = id;
        }
    }

    deleteTask(id: number): void {
        this.$emit('deleteTask', id);
    }

    setToJurnal(id: number): void {
        const item = this.tasks.find((el) => el.id === id);
        const el = {
            name: item!.name,
            description: item!.description,
            category_id: 6,
        };

        this.$emit('toJurnalOrIncome', el, id);
        this.taskShowId = null;
    }

    setToIncome(id: number): void {
        const item = this.tasks.find((el) => el.id === id);
        const el = {
            name: item!.name,
            description: item!.description,
            category_id: 1,
        };

        this.$emit('toJurnalOrIncome', el, id);
        this.taskShowId = null;
    }
}
</script>


<style lang="scss" scoped>
.v-messages {
    display: none !important;
}

.item-text {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #101010;
    cursor: pointer;
}

.task-item-container:hover {
    background: #f2f2f2;
    border-radius: 12px;
}
</style>
