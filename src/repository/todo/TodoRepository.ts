import Api from '@/repository/api';
import { ITodoRepository } from './TodoRepository.types';
import { TodoTask } from '@/entity/todo/todo';
import {
    ITaskStatus,
    ITodoTask,
    TaskRequestType,
    TaskResponseType,
    TaskStatusResponceType
} from '@/entity/todo/todo.types';
import { TodoStatus } from '@/entity/todo/todoStatus';

export class TodoRepository implements ITodoRepository {
    async fetchAll(data?: {id: number}): Promise<TodoTask[]> {
        const response = await Api.get(`candidateTasks/statuses/${data!.id.toString()}`)
        const respData = response.data as TaskResponseType[];
        return respData.map((el: TaskResponseType) => new TodoTask(el));
    }

    async fetchAllTaskStatus(): Promise<ITaskStatus[]> {
        const response = await Api.get('candidateTasks/statuses');
        const respData = response.data as TaskStatusResponceType[];

        return respData.map((el: TaskStatusResponceType) => new TodoStatus(el));
    }

    async createTask(data: TaskRequestType): Promise<ITodoTask> {
        const response = await Api.post('candidateTasks', data);
        return new TodoTask(response.data);
    }

    async getCandidateTask(data: {id: number}): Promise<ITodoTask> {
        const response = await Api.get(`candidateTasks/${data.id}`);
        return new TodoTask(response.data as TaskResponseType);
    }

    async deleteTask(data: {id: number}): Promise<void> {
        await Api.delete(`candidateTasks/${data.id}`);
    }

    async updateCandidateTask(data: {data: TaskRequestType; route: number}): Promise<ITodoTask> {
        const response = await Api.patch(`candidateTasks/${data.route}`, data.data);
        const request = response.data as TaskResponseType;
        return new TodoTask(request);
    }

    getTime(createdAt: number): string {
        const date = new Date(createdAt * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
    }
}
