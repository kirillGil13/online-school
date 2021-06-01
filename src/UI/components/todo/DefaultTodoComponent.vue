<template>
    <div class="d-flex todo__items" style="width: 100%" @click.self="setTask">
        <div class="items-title">
            <svg-icon :name="getIconName(statusItem.categoryId)" style="width: 28px; height: 28px" />
            <span class="title-text">{{ statusItem.categoryName }}</span>
        </div>
        <template v-if="statusItem.categoryId !== 6">
            <div class="items-btn-add" @click="openCardToCreateTask">
                <v-icon class="items-icon-plus" small color="#426DF6">mdi-plus</v-icon>
                <span class="btn-add-text">Добавить задачу</span>
            </div>
            <div class="items-add-place" v-if="showTextArea">
                <div class="items-add-place-text">
                    <div class="items-add-place-text__title d-flex">
                        <v-checkbox class="ma-0 pa-0" hide-details v-model="newTask.checked" />
                        <v-text-field
                            class="ma-0 pa-0"
                            hide-details
                            v-model="newTask.title"
                            placeholder="Название задачи"
                        />
                    </div>
                    <div class="items-add-place-text__actions">
                        <div class="items-add-place-text__set-items-add-place ml-8">
                            <v-textarea
                                ref="contentTextArea"
                                no-resize
                                id="message"
                                placeholder="Заметки"
                                rows="5"
                                hide-details
                                type="text"
                                v-model="newTask.description"
                            />
                        </div>
                        <div class="items-add-place-text__like-dislike d-flex">
                            <div>
                                <svg-icon name="Picture_outline" class="menu__icon" height="24" width="24" />
                            </div>
                            <div>
                                <svg-icon name="Users_outline" class="ml-4 mr-1 menu__icon" height="24" width="28" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div class="items-check-boxes">
            <template v-for="item in tasks">
                <div class="d-flex flex-column mt-1" :key="item.id">
                    <div class="d-flex align-center justify-space-between" v-if="taskShowId !== item.id">
                        <div class="d-flex align-center">
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
                        <div>
                            <v-btn
                                @click="deleteTask(item.id)"
                                style="background: none"
                                text
                                icon
                                color="red lighten-2"
                            >
                                <svg-icon name="Todo_delete" class="ml-1 mr-1 menu__icon" height="24" width="28" />
                            </v-btn>
                        </div>
                    </div>
                    <TaskInput v-else :new-task="item" :task-to-update="taskToUpdate" />
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { ITodoTask} from '@/entity/todo/todo.types';
import { TodoStore } from '@/store/modules/Todo';
import { Component, Prop, Vue } from 'vue-property-decorator';
import TaskInput from '../taskInput/TaskInput.vue';
import { TODOCOMPONENTS } from '@/constants';

@Component({
    components: { TaskInput },
})
export default class DefaultTodoComponent extends Vue {
    @Prop() readonly tasks!: ITodoTask[];
    @Prop() readonly id!: number;
    @Prop() readonly statusItem!: any;
    taskShowId: number | null = null;
    showTextArea = false;
    checkbox = false;
    newTask = {
        title: '',
        checked: false,
        description: '',
    };

    get taskById(): ITodoTask | null {
        return TodoStore.taskById;
    }

    get taskToUpdate(): ITodoTask | null {
        const taskToUpdate = {
            ...this.taskById,
            checked: false,
        };

        //@ts-ignore
        return taskToUpdate;
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

            const el = {
                checked: this.newTask.checked ? true : false,
                name: this.newTask.title,
                do_date: this. statusItem.categoryId === 1 ? date : null,
                description: this.newTask.description,
                category_id: 6,
            };
            
            this.$emit('createTask', el);

            this.showTextArea = false;

            this.newTask = {
                title: '',
                checked: false,
                description: '',
            };
        } else {
            this.setTaskShowid(null);
        }
    }

    openCardToCreateTask(): void  {
        this.taskShowId = null;
        this.showTextArea = this.showTextArea ? false : true;
    }

    setTaskShowid(id: number | null): void {
        this.showTextArea = false;

        if (this.taskShowId === id || id === null) {
            if (this.taskToUpdate !== null) {
                const el = {
                    id: this.taskShowId!,
                    name: this.taskToUpdate.name,
                    description: this.taskToUpdate.description,
                    category_id: this.id,
                };

                TodoStore.updateCandidateTask(el!);
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
}
</style>
