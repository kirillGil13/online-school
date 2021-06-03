<template>
    <div class="d-flex todo__items" style="width: 100%" @click.self="setTask">
        <div class="items-title">
            <svg-icon :name="getIconName(statusItem.categoryId)" style="width: 28px; height: 28px" />
            <span class="title-text">{{ statusItem.categoryName }}</span>
        </div>
      <template v-if="statusItem.categoryId !== 6">
        <div class="items-btn-add px-4" @click="openCardToCreateTask">
          <v-icon class="items-icon-plus" small color="#426DF6">mdi-plus</v-icon>
          <span class="btn-add-text">Добавить задачу</span>
        </div>
        <TaskInput v-if="showTextArea" :new-task="newTask" :task-to-update="taskToUpdate" :isNewTask="true"/>
      </template>
        <div class="items-check-boxes">
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
                    <TaskInput v-else :new-task="item" :task-to-update="taskToUpdate" :isNewTask="false"/>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import {ITaskStatus, ITodoTask, TaskRequestType} from '@/entity/todo/todo.types';
import { TodoStore } from '@/store/modules/Todo';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TaskInput from './taskInput/TaskInput.vue';
import { TODOCOMPONENTS } from '@/constants';
import {ICandidate} from '../../../entity/candidates';

@Component({
    components: { TaskInput },
})
export default class DefaultTodoComponent extends Vue {
    @Prop() readonly tasks!: ITodoTask[];
    @Prop() readonly id!: number;
    @Prop() readonly statusItem!: ITaskStatus;
    @Prop() readonly candidates!: {[p: string]: ICandidate[]};
    taskShowId: number | null = null;
    showTextArea = false;
    checkbox = false;
    newTask = {
        name: '',
        checked: false,
        description: '',
        doDate: new Date().toISOString().substr(0, 10),
        imagesLink: []
    };

    get taskById(): ITodoTask | null {
        return TodoStore.taskById;
    }

    get taskToUpdate(): ITodoTask | null {
        return this.tasks.find((el) => el.id === this.taskShowId)!;
    }

    getIconName(id: number): string {
        return TODOCOMPONENTS.find((el) => el.id === id)!.iconName;
    }

    setTaskById(id: number): void {
        TodoStore.getCandidateTask({ id: id });
    }

    setTask(): void {
        if (this.showTextArea === true) {
            const date = Date.now();
            console.log(this.newTask.doDate)

            const el = {
                checked: this.newTask.checked ? true : false,
                name: this.newTask.name || null,
                do_date: this.statusItem.categoryId === 2 ? date / 1000 : null,
                description: this.newTask.description || null,
                category_id: this.newTask.checked ? 6 : this.statusItem.categoryId,
                images_link: this.newTask.imagesLink.length === 0 ? null : this.newTask.imagesLink
            };
            this.$emit('createTask', el);

            this.showTextArea = false;

            this.newTask = {
                name: '',
                checked: false,
                description: '',
                doDate: new Date().toISOString().substr(0, 10),
                imagesLink: []
            };
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
            if (this.taskToUpdate !== null) {
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
            id: id,
            name: item!.name,
            description: item!.description,
            category_id: 6,
        };

        TodoStore.ToJurnalOrIncome(el!);
        this.taskShowId = null;
    }

    setToIncome(id: number): void {
        const item = this.tasks.find((el) => el.id === id);
        const el = {
            id: id,
            name: item!.name,
            description: item!.description,
            category_id: 1,
        };

        TodoStore.ToJurnalOrIncome(el!);
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
    background: #F2F2F2;
    border-radius: 12px;
}
</style>
