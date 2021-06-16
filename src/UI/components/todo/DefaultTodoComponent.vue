<template>
    <div class="d-flex todo__items" style="width: 100%">
        <div class="items-title pb-9" :class="[$adaptive.isMobile && 'pl-2']">
            <svg-icon :name="getIconName(statusItem.categoryId)" style="width: 28px; height: 28px" />
            <span class="title-text">{{ statusItem.categoryName }}</span>
        </div>
        <div class="add-task" v-if="statusItem.categoryId !== 6">
            <div class="items-btn-add" style="padding-left: 10px" @click="openCardToCreateTask">
                <v-icon class="items-icon-plus" small color="#426DF6">mdi-plus</v-icon>
                <span class="btn-add-text">Добавить задачу</span>
            </div>
            <TaskInput
                v-if="showTextArea"
                @setTask="setTask"
                :filters="filters"
                :statuses="statuses"
                :candidates="candidates"
                :tabId="id"
                :task-item="taskItem"
                v-on="$listeners"
            />
        </div>
        <div class="items-check-boxes" v-click-outside="closeTask">
            <template v-for="item in tasks">
                <div class="d-flex flex-column mt-2" :key="item.id" v-if="!item.hide">
                    <div
                        class="d-flex align-center justify-space-between task-item-container px-2"
                        v-if="taskShowId !== item.id"
                        @click.self="setTaskShowid(item.id)" style="cursor: pointer"
                    >
                        <div class="d-flex align-end">
                            <v-checkbox
                                hide-details
                                class="mt-0 pt-0"
                                @click.stop="statusItem.categoryId !== 6 ? setToJurnal(item.id) : setToIncome(item.id)"
                                v-model="item.checked"
                            />
                            <span class="item-text">{{
                                item.name ? `${item.name}` : 'Новая задача'
                            }}</span>
                        </div>
                        <div class="d-flex align-center">
                            <v-btn
                                @click.stop="deleteTask(item.id)"
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
                    <TaskInput
                        v-else-if="taskShowId === item.id"
                        @setTask="setTask"
                        :filters="filters"
                        :statuses="statuses"
                        :candidates="candidates"
                        :task-item="taskItem"
                        :tabId="id"
                        v-on="$listeners"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { ITaskItem, ITaskStatus, ITodoTask } from '@/entity/todo/todo.types';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import TaskInput from './taskInput/TaskInput.vue';
import { PARENTCLASSES, TODOCOMPONENTS } from '@/constants';
import { ICandidate } from '../../../entity/candidates';
import { IStatuses } from '../../../entity/statuses/statuses.types';
import Filters from '../../../entity/filters/filters';
import {LoginForm} from '../../../form/login';
import {TodoStore} from '../../../store/modules/Todo';

@Component({
    components: { TaskInput },
})
export default class DefaultTodoComponent extends Vue {
    @Prop() readonly tasks!: ITodoTask[];
    @Prop() readonly id!: number;
    @Prop() readonly statusItem!: ITaskStatus;
    @Prop() readonly taskById!: ITodoTask;
    @Prop() readonly candidates!: { [p: string]: ICandidate[] };
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
        reminderTime: null,
        candidateName: '',
    };
    newTask = false;

    @Watch('id')
    onChangeComponent(): void {
      this.showTextArea = false;
      if (this.taskShowId) {
        this.taskShowId = null;
      }
      this.setTaskToNull();
    }

    @Watch('tasks', { immediate: false })
    onChangeTasks(val: any, oldVal: any): void {
      if (this.tasks.length !== 0) {
        if (val.length > oldVal.length && this.showTextArea) {
          this.newTask = true;
        }
      }
    }

    @Watch('showTextArea')
    onChangeShow(): void {
        if (!this.showTextArea) {
            for (let i = 0; i < this.tasks.length; i++) {
                this.tasks[i].hide = false;
            }
            this.newTask = false;
        }
    }

    @Watch('taskShowId')
    async onChangeId(val: number | null, oldVal: number | null): Promise<void> {
        if (val) {
            const item =  this.tasks.find((el) => el.id === this.taskShowId)!;
            let doDate = this.tasks.find((el) => el.id === this.taskShowId)!.doDate;
            let time = this.tasks.find((el) => el.id === this.taskShowId)!.reminderTime;
            if (time) {
                const hours = Math.floor((time as number) / 60 / 60);
                const minuts = Math.floor((time as number) / 60) - hours * 60;
                time = `${hours}:${minuts < 10 ? `0${minuts}` : minuts}`;
            }
            if (doDate) {
                doDate = Number(doDate * 1000);
            }
            await TodoStore.handleTasks({date: +this.taskItem.doDate!, category: this.statusItem.categoryId, checked: this.taskItem.checked, id: oldVal});
            this.taskItem = {
                name: item.name,
                checked: item.checked!,
                description: item.description,
                doDate: doDate ? doDate : null,
                imagesLink: item.imagesLink,
                reminderTime: time ? time : null,
                candidateId: item.candidate ? item.candidate.candidate_id : null,
                candidateName: item.candidate ? item.candidate.candidate_name : '',
            };
        } else {
            this.setTaskToNull();
        }
    }

    get updatedTaskId(): number | null {
      return TodoStore.updatedTaskId;
    }

    include(className: string): boolean {
        return PARENTCLASSES.includes(className);
    }

    closeTask(e: any): void {
        if (
            this.include(e.target.classList[0]) &&
            e.target.classList[0] !== 'add-task' &&
            e.target.classList[0] !== 'v-dialog__content' &&
            (this.showTextArea || this.taskShowId)
        ) {
            this.showTextArea = false;
            if (this.taskShowId) {
                TodoStore.handleTasks({date: +this.taskItem.doDate!, category: this.statusItem.categoryId, checked: this.taskItem.checked, id: this.taskShowId!});
                this.taskShowId = null;
            } else if (!this.showTextArea) {
                TodoStore.handleTasks({date: +this.taskItem.doDate!, category: this.statusItem.categoryId, checked: this.taskItem.checked, id: this.updatedTaskId!});
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
            candidateName: '',
            reminderTime: null,
        };
    }

    getIconName(id: number): string {
        return TODOCOMPONENTS.find((el) => el.id === id)!.iconName;
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

    setTask(): void {
        if (this.showTextArea === true) {
          this.updateTask(this.updatedTaskId!);
        } else {
          this.setTaskShowid(null);
        }
    }

  setTaskShowid(id: number | null): void {
    this.showTextArea = false;
    if (this.taskShowId === id || id === null) {
      this.updateTask(this.taskShowId!);
    } else {
      this.taskShowId = id;
    }
  }

    openCardToCreateTask(): void {
        this.taskShowId = null;
        this.showTextArea = !this.showTextArea;
        const date = Math.floor(new Date().getTime() / 1000);
        const el = {
            name: null,
            do_date: this.statusItem.categoryId === 2 ? date : null,
            reminder_time: null,
            description: null,
            category_id: this.statusItem.categoryId,
            images_link: null,
            candidate_id: null,
        };
        this.taskItem.doDate = date * 1000;
        if (this.showTextArea) {
          this.$emit('createTask', el, false);
        }
    }

  updateTask(id: number): void {
    let time = null;
    if (this.taskItem.reminderTime && typeof this.taskItem.reminderTime !== 'number') {
      time =
          Number((this.taskItem.reminderTime! as string).split(':')[0]) * 3600 +
          Number((this.taskItem.reminderTime! as string).split(':')[1]) * 60;
    }
    const el = {
      name: this.taskItem.name,
      description: this.taskItem.description,
      do_date: this.taskItem.doDate ? Math.floor((this.taskItem.doDate as number) / 1000) : null,
      category_id: this.statusItem.categoryId,
      images_link: this.taskItem.imagesLink,
      reminder_time: this.taskItem.reminderTime ? time : null,
      candidate_id: this.taskItem.candidateId ? this.taskItem.candidateId : null,
    };
    if (this.statusItem.categoryId !== 2) {
        el.do_date = null;
    }
    this.$emit('upDateTask', el, this.taskItem.checked, id, this.newTask);
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
