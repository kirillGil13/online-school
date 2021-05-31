import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import { TodoTask } from '@/entity/todo/todo';
import { TodoStatus } from '@/entity/todo/todoStatus';

@Module({
    namespaced: true,
    name: 'todoTask',
    store,
    dynamic: true,
})
class TodoModule extends VuexModule {
    todoTasks: TodoTask[] = [];
    tasksStatuses: TodoStatus[] = [];
    taskById: TodoTask | null = null;

    @MutationAction
    async fetchAllTask(data?: {id: number}): Promise<{todoTasks:TodoTask[]}> {
        const todoTasks = await store.$repository.todo.fetchAll(data);
       
        return {todoTasks};
    }

    @MutationAction
    async fetchAllTaskStatus(): Promise<{tasksStatuses: TodoStatus[]}> {
        const tasksStatuses = await store.$repository.todo.fetchAllTaskStatus();

        return {tasksStatuses};
    }

    @MutationAction
    async createTask(data: {name?: string, description?: string, do_date?: number, reminder_time?: number, candidate_id?: number, category_id: number, images_link?: string[] }): Promise<{todoTasks: TodoTask[]}> {
        const task = await store.$repository.todo.createTask(data);

        //@ts-ignore
        const todoTasks: TodoTask[] = [...store.state.todoTask.todoTasks]
        todoTasks.push(new TodoTask(task))

        return {todoTasks};
    }


    @MutationAction
    async getCandidateTask(data: {id: number}): Promise<{taskById: TodoTask}> {
        const taskById = await store.$repository.todo.getCandidateTask(data);

        return {taskById}
    }

    @MutationAction
    async deletedTask(data: {id: number}): Promise<{todoTasks: TodoTask[]}> {
        await store.$repository.todo.deleteTask(data);

        //@ts-ignore
        const todoTasks = [...store.state.todoTask.todoTasks];
        const idx = todoTasks.findIndex(el => el.id === data.id);

        todoTasks.splice(idx, 1)
        return {todoTasks}
    }
    

}

export const TodoStore = getModule(TodoModule);
