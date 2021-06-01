import {getModule, Module, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import { TodoTask } from '@/entity/todo/todo';
import { TodoStatus } from '@/entity/todo/todoStatus';
import { ITaskStatus, ITodoTask } from '@/entity/todo/todo.types';

@Module({
    namespaced: true,
    name: 'todoTask',
    store,
    dynamic: true,
})
class TodoModule extends VuexModule {
    todoTasks: ITodoTask[] = [];
    tasksStatuses: ITaskStatus[] = [];
    taskById: ITodoTask | null = null;

    @MutationAction
    async fetchAllTask(data?: {id: number}): Promise<{todoTasks:ITodoTask[]}> {
        const todoTasks = await store.$repository.todo.fetchAll(data);
       
        return {todoTasks};
    }

    @MutationAction
    async fetchAllTaskStatus(): Promise<{tasksStatuses: ITaskStatus[]}> {
        const tasksStatuses = await store.$repository.todo.fetchAllTaskStatus();

        return {tasksStatuses};
    }

    @MutationAction
    async createTask(data: { checked?: boolean ,name?: string, description?: string, do_date?: number, reminder_time?: number, candidate_id?: number, category_id: number, images_link?: string[] }): Promise<{todoTasks: ITodoTask[]}> {

        const {checked, ...info} = data;
        const task = await store.$repository.todo.createTask(info);
        //@ts-ignore
        const todoTasks: TodoTask[] = [...store.state.todoTask.todoTasks]

        if(!checked) {
            todoTasks.push(new TodoTask(task))    
        }

        
        

        return {todoTasks};
    }


    @MutationAction
    async getCandidateTask(data: {id: number}): Promise<{taskById: ITodoTask | null }> {
        const taskById = await store.$repository.todo.getCandidateTask(data);

        return {taskById}
    }

    @MutationAction
    async deletedTask(data: {id: number}): Promise<{todoTasks: ITodoTask[]}> {
        await store.$repository.todo.deleteTask(data);

        //@ts-ignore
        const todoTasks = [...store.state.todoTask.todoTasks];
        const idx = todoTasks.findIndex(el => el.id === data.id);

        todoTasks.splice(idx, 1)
        return {todoTasks}
    }

    @MutationAction
    async updateCandidateTask(data: {id: number, name?: string, description?: string, do_date?: number, reminder_time?: number, candidate_id?: number, category_id: number, images_link?: string[] }): Promise<{todoTasks: ITodoTask[]}> {
        const upDateTask = await store.$repository.todo.updateCandidateTask(data);

          //@ts-ignore
        const todoTasks: ITodoTask[] = [...store.state.todoTask.todoTasks]
        const idx = todoTasks.findIndex(el => el.id === data.id);
        todoTasks[idx] = {
            ...upDateTask
        }
        return {todoTasks}
    }

    @MutationAction
    async ToJurnalOrIncome(data: {id: number, name?: string, description?: string, do_date?: number, reminder_time?: number, candidate_id?: number, category_id: number, images_link?: string[] }): Promise<{todoTasks: ITodoTask[]}> {
        await store.$repository.todo.updateCandidateTask(data);
        //@ts-ignore
        const todoTasks = [...store.state.todoTask.todoTasks];
        const idx = todoTasks.findIndex(el => el.id === data.id);
        console.log(idx)

        todoTasks.splice(idx, 1);

        return {todoTasks}
    }
    

}

export const TodoStore = getModule(TodoModule);
