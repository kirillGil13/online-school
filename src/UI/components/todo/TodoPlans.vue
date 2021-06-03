<template>
    <div class="d-flex todo__items" style="width: 100%" @click.self="setTask">
        <div class="items-title">
            <svg-icon name="Plans" style="width: 28px; height: 28px" />
            <span class="title-text">Планы</span>
        </div>
        <div class="items-btn-add px-4" @click="showTextArea = true">
            <v-icon class="items-icon-plus" small color="#426DF6">mdi-plus</v-icon>
            <span class="btn-add-text">Добавить задачу</span>
        </div>
        <TaskInput
            v-if="showTextArea"
            :tabId="id"
            :new-task="newTask"
            :task-to-update="taskToUpdate"
            :isNewTask="true"
        />

        <div class="plans-items pl-4">
            <div class="d-flex flex-column plans-item" style="width: 100%">
                <div class="d-flex align-baseline" style="width: 100%">
                    <div class="plans-items__task-date">22</div>
                    <div class="plans-items__task-date-text">Завтра</div>
                </div>
                <div class="d-flex flex-column mt-7">
                    <!-- <div class="d-flex align-center handle">
                            <v-checkbox hide-details class="mt-0 pa-0" />
                            <span class="plans-items__task-text">Task</span>
                        </div> -->
                    <draggable v-model="tasks" class="list-group" handle=".handle" tag="div">
                        <template v-for="(item, key) in tasks">
                            <div class="d-flex flex-column mt-1 px-2 task-item-container " :key="key">
                                <div class="d-flex align-center justify-space-between handle" v-if="taskShowId !== item.id">
                                    <div class="d-flex align-end">
                                        <v-checkbox
                                            hide-details
                                            class="mt-0"
                                            @click="
                                                statusItem.categoryId !== 6
                                                    ? setToJurnal(item.id)
                                                    : setToIncome(item.id)
                                            "
                                            v-model="item.checked"
                                        />
                                        <span class="item-text " @click.self="setTaskShowid(item.id)">{{
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
                                            <svg-icon
                                                name="Todo_delete"
                                                class="ml-1 mr-1 menu__icon"
                                                height="20"
                                                width="24"
                                            />
                                        </v-btn>
                                    </div>
                                </div>
                                <TaskInput
                                    v-else
                                    :new-task="item"
                                    :tabId="id"
                                    :task-to-update="taskToUpdate"
                                    :isNewTask="false"
                                />
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ITaskStatus, ITodoTask } from '@/entity/todo/todo.types';
import draggable from 'vuedraggable';
import TaskInput from './taskInput/TaskInput.vue';
import { TodoStore } from '@/store/modules/Todo';

@Component({
    components: { TaskInput, draggable },
})
export default class TodoPlans extends Vue {
    @Prop() readonly statusItem!: ITaskStatus;
    @Prop() readonly id!: number;
    @Prop() readonly taskById!: ITodoTask;
    @Prop() readonly activeTab!: number;
    array = [...this.tasks]
    taskShowId: number | null = null;

    showTextArea = false;
    checkbox = false;
    newTask = {
        name: '',
        checked: false,
        description: '',
        doDate: null,
    };

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

    set tasks(value: ITodoTask[]) {
        TodoStore.setDraggableTasks(value)
    }

    get taskToUpdate(): ITodoTask | null {
        const taskToUpdate = {
            ...this.taskById,
            checked: false,
        };

        //@ts-ignore
        return taskToUpdate;
    }

    setTaskById(id: number): void {
        this.$emit('setTaskById', id);
    }

    setTask(): void {
        if (this.showTextArea === true) {
            const date = Date.now();

            const el = {
                checked: this.newTask.checked ? true : false,
                name: this.newTask.name || null,
                do_date:
                    this.statusItem.categoryId === 2
                        ? date / 1000
                        : this.newTask.doDate !== null
                        ? Date.parse(this.newTask.doDate!) / 1000
                        : null,
                description: this.newTask.description || null,
                category_id: this.newTask.checked ? 6 : this.statusItem.categoryId,
            };

            this.$emit('createTask', el);

            this.showTextArea = false;

            this.newTask = {
                name: '',
                checked: false,
                description: '',
                doDate: null,
            };
        } else {
            this.setTaskShowid(null);
        }
    }

    setTaskShowid(id: number | null): void {
        if (this.taskShowId === id || id === null) {
            if (this.taskToUpdate !== null) {
                const el = {
                    checked: this.taskToUpdate.checked,
                    id: this.taskShowId!,
                    name: this.taskToUpdate.name,
                    description: this.taskToUpdate.description,
                    category_id: this.taskToUpdate.checked ? 6 : this.statusItem.categoryId,
                };
                this.$emit('upDateTask', el);
                this.taskShowId = null;
            } else {
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

        this.$emit('toJurnalOrIncome', el);
        this.taskShowId = null;
    }
}
</script>


<style lang="scss" scoped>
.plans-items {
    width: 100%;
    padding-left: 8px;
    margin-top: 33px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    flex-direction: column;

    .plans-item {
        margin-top: 26px;

        &:nth-child(1) {
            margin-top: 0px !important;
        }
    }

    &__task-date {
        font-weight: bold;
        font-weight: bold;
        font-size: 36px;
        color: #060516;
    }

    &__task-date-text {
        width: 100%;
        margin-left: 4px;
        border-top: 1px solid rgba(66, 109, 246, 0.12);
        font-size: 16px;
        color: #5f739c;
    }

    &__task-text {
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #101010;
    }
}
</style>
