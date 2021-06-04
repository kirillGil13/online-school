<template>
    <div class="d-flex todo__items" style="width: 100%">
        <div class="items-title">
            <svg-icon :name="getIconName(statusItem.categoryId)" style="width: 28px; height: 28px" />
            <span class="title-text">{{ statusItem.categoryName }}</span>
        </div>
        <div class="add-task" v-if="statusItem.categoryId !== 6">
            <div class="items-btn-add px-4" @click="openCardToCreateTask">
                <v-icon class="items-icon-plus" small color="#426DF6">mdi-plus</v-icon>
                <span class="btn-add-text">Добавить задачу</span>
            </div>
            <TaskInput v-if="showTextArea" :statuses="statuses" :candidates="candidates" :tabId="id" :new-task="newTask" :task-to-update="taskToUpdate" :isNewTask="true" />
        </div>

        <div class="items-check-boxes" :style="{marginTop: statusItem.categoryId === 6 && '2rem'}" v-click-outside="setTask">
            <template v-for="item in tasks">
                <div class="d-flex flex-column mt-1 px-2 task-item-container" :key="item.id">
                    <div class="d-flex align-center justify-space-between" v-if="taskShowId !== item.id">
                        <div class="d-flex align-end">
                            <v-checkbox
                                hide-details
                                class="mt-0"
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
                    <TaskInput v-else :statuses="statuses" :candidates="candidates" :new-task="item" :tabId="id" :task-to-update="taskToUpdate" :isNewTask="false" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import {ITaskNewItem, ITaskStatus, ITodoTask} from '@/entity/todo/todo.types';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TaskInput from './taskInput/TaskInput.vue';
import { TODOCOMPONENTS } from '@/constants';
import {ICandidate} from '../../../entity/candidates';
import {IStatuses} from '../../../entity/statuses/statuses.types';

@Component({
    components: { TaskInput },
})
export default class DefaultTodoComponent extends Vue {
    @Prop() readonly tasks!: ITodoTask[];
    @Prop() readonly id!: number;
    @Prop() readonly statusItem!: ITaskStatus;
    @Prop() readonly taskById!: ITodoTask;
    @Prop() readonly candidates!: {[p: string]: ICandidate[]};
    @Prop() readonly statuses!: IStatuses[];
    taskShowId: number | null = null;
    showTextArea = false;
    checkbox = false;
    newTask: ITaskNewItem = {
        name: '',
        checked: false,
        description: '',
        doDate: null,
        imagesLink: [],
        candidateId: null
    };

    get include(): (HTMLElement | null)[] {
      return [document.querySelector('.v-dialog__content')];
    }

    get taskToUpdate(): ITodoTask | null {
        return this.tasks.find((el) => el.id === this.taskShowId)!;
    }

    getIconName(id: number): string {
        return TODOCOMPONENTS.find((el) => el.id === id)!.iconName;
    }

    setTaskById(id: number): void {
        this.$emit('setTaskById', id)
    }

    setTask(e: any): void {
      if (e.target.classList[0] === 'content-main' && e.target.classList[0] !== 'add-task' && e.target.classList[0] !== 'v-dialog__content' && (this.showTextArea || this.taskShowId)) {
        if (this.showTextArea === true) {
          const date = Date.now();

          const el = {
            name: this.newTask.name || null,
            do_date:
                this.statusItem.categoryId === 2
                    ? date / 1000
                    : this.newTask.doDate !== null
                    ? Date.parse(this.newTask.doDate!) / 1000
                    : null,
            description: this.newTask.description || null,
            category_id: this.newTask.checked ? 6 : this.statusItem.categoryId,
            images_link: this.newTask.imagesLink.length === 0 ? null : this.newTask.imagesLink,
            candidate_id: this.newTask.candidateId ? this.newTask.candidateId : null
          };

          this.$emit('createTask', el,  this.newTask.checked);

          this.showTextArea = false;

          this.newTask = {
            name: '',
            checked: false,
            description: '',
            doDate: null,
            imagesLink: [],
            candidateId: null
          };
        } else {
          this.setTaskShowid(null);
        }
      }
    }

    openCardToCreateTask(): void {
        this.taskShowId = null;
        this.showTextArea = this.showTextArea ? false : true;
    }

    setTaskShowid(id: number | null): void {
        this.showTextArea = false;

        if (this.taskShowId === id || id === null) {
            if (this.taskToUpdate !== null) {
                 const el = {
                    name: this.taskToUpdate.name,
                    description: this.taskToUpdate.description,
                    category_id:
                        this.taskToUpdate.checked && this.statusItem.categoryId !== 6
                            ? 6
                            : this.taskToUpdate.checked && this.statusItem.categoryId === 6
                            ? 1
                            : this.statusItem.categoryId,
                   images_link: this.taskToUpdate.imagesLink,
                   candidate_id: this.taskToUpdate.candidate ? this.taskToUpdate.candidate.candidate_id : null
                };
                this.$emit('upDateTask', el, this.taskToUpdate.checked, this.taskShowId!);
                this.taskShowId = null;
            }
        } else {
            this.taskShowId = id;
            this.setTaskById(id);
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
