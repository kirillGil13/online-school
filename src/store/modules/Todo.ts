import {getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import { TodoTask } from '@/entity/todo/todo';
import {ITaskStatus, ITodoTask, TaskRequestType} from '@/entity/todo/todo.types';

@Module({
    namespaced: true,
    name: 'todoTask',
    store,
    dynamic: true,
})
class TodoModule extends VuexModule {
    todoTasks: ITodoTask[] = [];
    tasksStatuses: ITaskStatus[] = [];
    todoTasksLoaded = false;
    taskById: ITodoTask | null = null;


    @Mutation
    setDraggableTasks(array: ITodoTask[]) {
        this.todoTasks = [...array];
    }

    @Mutation
    setTaskCount(data: {id: number; delete: boolean}): void {
        const index = this.tasksStatuses.findIndex(item => item.categoryId === data.id);
        if (data.delete) {
            this.tasksStatuses[index].taskCount -= 1;
        } else {
            this.tasksStatuses[index].taskCount += 1;
        }
    }

    @Mutation
    setTaskImages(data: {id: number; image: string}): void {
        if(this.todoTasks.find(item => item.id === data.id)!.imagesLink === null) {
            this.todoTasks.find(item => item.id === data.id)!.imagesLink = [];
        }
        this.todoTasks.find(item => item.id === data.id)!.imagesLink.push(data.image);
    }

    @MutationAction
    async fetchAllTask(data?: {id: number}): Promise<{todoTasks: ITodoTask[]; todoTasksLoaded: boolean}> {
        let todoTasksLoaded = false;
        const todoTasks = await store.$repository.todo.fetchAll(data);
        todoTasksLoaded = true;
        console.log(todoTasksLoaded)
        return {todoTasks, todoTasksLoaded};
    }

    @MutationAction
    async fetchAllTaskStatus(): Promise<{tasksStatuses: ITaskStatus[]}> {
        const tasksStatuses = await store.$repository.todo.fetchAllTaskStatus();

        return {tasksStatuses};
    }

    @MutationAction
    async createTask(data: {data: TaskRequestType; checked: boolean}): Promise<{todoTasks: ITodoTask[]}> {
        const task = await store.$repository.todo.createTask(data.data);
        //@ts-ignore
        const todoTasks: ITodoTask[] = [...store.state.todoTask.todoTasks]
        if(!data.checked) {
            todoTasks.unshift(new TodoTask(task))
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
    async updateCandidateTask(data: {data: TaskRequestType; checked: boolean; route: number}): Promise<{todoTasks: ITodoTask[]}> {
        const upDateTask = await store.$repository.todo.updateCandidateTask({data: data.data, route: data.route});
          //@ts-ignore
        const todoTasks: ITodoTask[] = [...store.state.todoTask.todoTasks]
        const idx = todoTasks.findIndex(el => el.id === data.route);
        todoTasks[idx] = {
            ...upDateTask
        }

        if(data.checked) {
            todoTasks.splice(idx, 1);
        }
        return {todoTasks}
    }

    @MutationAction
    async ToJurnalOrIncome(data: {data: TaskRequestType; route: number}): Promise<{todoTasks: ITodoTask[]}> {
        await store.$repository.todo.updateCandidateTask(data);
        //@ts-ignore
        const todoTasks = [...store.state.todoTask.todoTasks];
        const idx = todoTasks.findIndex(el => el.id === data.route);

        todoTasks.splice(idx, 1);

        return {todoTasks}
    }
}

export const TodoStore = getModule(TodoModule);
