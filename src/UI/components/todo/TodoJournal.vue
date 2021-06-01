<template>
    <div class="d-flex todo__items" style="width: 100%">
        <div class="items-title">
            <svg-icon name="Archive" style="width: 5%; height: 100%" />
            <span class="title-text">Журнал</span>
        </div>
        <div class="items-check-boxes">
            <template v-for="item in tasks">
                <div class="d-flex flex-column mt-1" :key="item.id">
                    <div class="d-flex align-center justify-space-between" v-if="taskShowId !== item.id">
                        <div class="d-flex align-center">
                            <v-checkbox
                                hide-details
                                class="mt-0"
                                v-model="item.checked"
                                @click="setToIncome(item.id)"
                            />
                            <span @click.self="setTaskShowid(item.id)">{{
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
                  <TaskInput v-else :new-task="item" :task-to-update="taskToUpdate"/>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { TodoTask } from '@/entity/todo/todo';
import { ITodoTask } from '@/entity/todo/todo.types';
import { TodoStore } from '@/store/modules/Todo';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import TaskInput from '../taskInput/TaskInput.vue';
@Component({
  components: {TaskInput}
})
export default class TodoJournal extends Vue {
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

    get taskById(): ITodoTask | null {
        return TodoStore.taskById;
    }

    get taskToUpdate(): ITodoTask | null {
        const taskToUpdate = {
            ...this.taskById,
            checked: true,
        };

        //@ts-ignore
        return taskToUpdate;
    }

    setTaskById(id: number): void {
        TodoStore.getCandidateTask({ id: id });
    }

    async setTaskShowid(id: number | null): Promise<void> {
        if (this.taskShowId === id || id === null) {
            if(this.taskToUpdate !== null) {
                const el = {
                    id: this.taskShowId!,
                    name: this.taskToUpdate.name,
                    description: this.taskToUpdate.description,
                    category_id: this.id
                }


                await TodoStore.updateCandidateTask(el!);
                this.taskShowId = null;
            }else {
                this.taskShowId = null;
            }
        } else {
            this.taskShowId = id;
            await this.setTaskById(id);
        }
    }

    deleteTask(id: number): void {
      this.$emit('deleteTask', id);
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
</style>
