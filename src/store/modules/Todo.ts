import {getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {ITaskStatus, ITodoTask, TaskRequestType} from '@/entity/todo/todo.types';
import Vue from 'vue';

@Module({
    namespaced: true,
    name: 'todoTask',
    store,
    dynamic: true,
})
class TodoModule extends VuexModule {
    todoTasks: ITodoTask[] = [];
    tasksStatuses: ITaskStatus[] = [];
    updatedTaskId: number | null = null;
    todoTasksLoaded = false;
    taskById: ITodoTask | null = null;


    @Mutation
    setDraggableTasks(array: ITodoTask[]): void {
        this.todoTasks = [...array];
    }

    @Mutation
    handleTasks(data: { category: number; id: number | null; taskCat: number}): void {
        const idx = this.todoTasks.findIndex(el => el.id === data.id);
        console.log(data.category, data.taskCat);
        if (data.category !== data.taskCat) {
            this.todoTasks.splice(idx, 1);
        }
    }

    @Mutation
    setTaskCount(data: {id: number; delete: boolean}): void {
        const index = this.tasksStatuses.findIndex(item => item.categoryId === data.id);
        if (data.delete) {
            Vue.set(this.tasksStatuses[index], this.tasksStatuses[index].taskCount, this.tasksStatuses[index].taskCount -= 1);
        } else {
            Vue.set(this.tasksStatuses[index], this.tasksStatuses[index].taskCount, this.tasksStatuses[index].taskCount += 1);
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
        return {todoTasks, todoTasksLoaded};
    }

    @MutationAction
    async fetchAllTaskStatus(): Promise<{tasksStatuses: ITaskStatus[]}> {
        const tasksStatuses = await store.$repository.todo.fetchAllTaskStatus();

        return {tasksStatuses};
    }

    @MutationAction
    async createTask(data: {data: TaskRequestType; checked: boolean}): Promise<{todoTasks: ITodoTask[]; updatedTaskId: number | null}> {
        const task = await store.$repository.todo.createTask(data.data);
        task.hide = true;
        //@ts-ignore
        const todoTasks: ITodoTask[] = [ ...store.state.todoTask.todoTasks];
        for (let i = 0; i < todoTasks.length; i++) {
            todoTasks[i].hide = false;
        }
        const date = new Date(Date.now()).toISOString().substr(0, 10);
        const itemDate = new Date(data.data.do_date! * 1000).toISOString().substr(0, 10);


        if (!(data.data.category_id === 2 && date !== itemDate) && !(data.data.category_id === 3 && date === itemDate)) {
            if(!data.checked) {
                todoTasks.unshift(task);
            }
        }
        const updatedTaskId = task.id;
        return {todoTasks, updatedTaskId};
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
    async updateCandidateTask(data: {data: TaskRequestType; checked: boolean; route: number; newTask?: boolean; category: number}): Promise<{todoTasks: ITodoTask[]}> {
        const upDateTask = await store.$repository.todo.updateCandidateTask({data: data.data, route: data.route});
          //@ts-ignore
        const todoTasks: ITodoTask[] = [...store.state.todoTask.todoTasks]
        const idx = todoTasks.findIndex(el => el.id === data.route);
        if (data.newTask) {
            upDateTask.hide = true;
        }
        todoTasks[idx] = {
            ...upDateTask
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
