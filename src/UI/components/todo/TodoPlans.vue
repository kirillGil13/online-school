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
        <div class="items-add-place" v-if="showTextArea">
            <!-- <form-group class="width" field="review" :form="form" show-custom-error > -->
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
        <div class="plans-items pl-4">
            <div class="d-flex flex-column plans-item" style="width: 100%">
                <div class="d-flex align-baseline" style="width: 100%">
                    <div class="plans-items__task-date">2</div> 
                    <div class="plans-items__task-date-text">Tomorow</div>
                </div>
                <div class="d-flex flex-column mt-7">
                    <div class="d-flex align-center">
                        <v-checkbox  hide-details class="mt-0 pa-0" />
                        <span class="plans-items__task-text" >Task</span>
                    </div>
                    
                </div>
            </div>
             <div class="d-flex flex-column plans-item" style="width: 100%">
                <div class="d-flex align-baseline" style="width: 100%">
                    <div class="plans-items__task-date">2</div> 
                    <div class="plans-items__task-date-text">Tomorow</div>
                </div>
                <div class="d-flex flex-column mt-7">
                    <div class="d-flex align-center">
                        <v-checkbox  hide-details class="mt-0 pa-0" />
                        <span class="plans-items__task-text" >Task</span>
                    </div>
                    
                </div>
            </div>
             <div class="d-flex flex-column plans-item" style="width: 100%">
                <div class="d-flex align-baseline" style="width: 100%">
                    <div class="plans-items__task-date">2</div> 
                    <div class="plans-items__task-date-text">Tomorow</div>
                </div>
                <div class="d-flex flex-column mt-7">
                    <div class="d-flex align-center">
                        <v-checkbox  hide-details class="mt-0 pa-0" />
                        <span class="plans-items__task-text" >Task</span>
                    </div>
                    
                </div>
            </div>
             <div class="d-flex flex-column plans-item" style="width: 100%">
                <div class="d-flex align-baseline" style="width: 100%">
                    <div class="plans-items__task-date">2</div> 
                    <div class="plans-items__task-date-text">Tomorow</div>
                </div>
                <div class="d-flex flex-column mt-7">
                    <div class="d-flex align-center">
                        <v-checkbox  hide-details class="mt-0 pa-0" />
                        <span class="plans-items__task-text" >Task</span>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TodoTask } from '@/entity/todo/todo';
import { TodoStore } from '@/store/modules/Todo';
import { ITodoTask } from '@/entity/todo/todo.types';
import TaskInput from './taskInput/TaskInput.vue';
@Component({
    components: { TaskInput },
})
export default class TodoPlans extends Vue {
    @Prop() readonly tasks!: TodoTask[];
    @Prop() readonly id!: number;
    taskShowId: number | null = null;
    showTextArea = false;
    checkbox = false;
    newTask = {
        title: '',
        checked: false,
        description: '',
    };

    get taskToUpdate(): ITodoTask | null {
        const taskToUpdate = {
            ...this.taskById,
            checked: false,
        };

        //@ts-ignore
        return taskToUpdate;
    }

    get taskById(): ITodoTask | null {
        return TodoStore.taskById;
    }

    setTaskById(id: number): void {
        TodoStore.getCandidateTask({ id: id });
    }

    setTask(): void {
        if (this.showTextArea === true) {
            if (this.newTask.checked) {
                const el = {
                    checked: true,
                    name: this.newTask.title,
                    description: this.newTask.description,
                    category_id: 6,
                };
                this.$emit('createTask', el);
            } else {
                const el = {
                    checked: false,
                    name: this.newTask.title,
                    description: this.newTask.description,
                    category_id: this.id,
                };
                this.$emit('createTask', el);
            }

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

    setTaskShowid(id: number | null): void {
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
}
</script>


<style lang="scss" scoped>

.plans-items {
    width: 100%;
    padding-left: 8px;
    margin-top: 36px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    flex-direction: column;

   .plans-item {
       margin-top: 40px;

       &:nth-child(1) {
           margin-top: 0px !important;
       }
   }
    
    &__task-date {
        font-size: 30px;font-weight: bold;
        color:rgb(95, 115, 156);
    }

    &__task-date-text {
        width: 100%;
        margin-left: 4px;
        border-top: 1px solid rgb(95, 115, 156);
        font-size: 16px;
        text-transform: lowercase;
        font-weight: bold;
        color:rgb(95, 115, 156);
    }

    &__task-text {
        font-weight: bold;
        color:rgb(95, 115, 156);
    }
}
</style>
