import Api from '@/repository/api';
import { ITodoRepository } from './TodoRepository.types';
import { TodoTask } from '@/entity/todo/todo';
import { TaskResponseType, TaskStatusResponceType } from '@/entity/todo/todo.types';
import { TodoStatus } from '@/entity/todo/todoStatus';

export class TodoRepository implements ITodoRepository {
    async fetchAll(data?: {id: number}): Promise<TodoTask[]> {
        const response = await Api.get(`candidateTasks/statuses/${data!.id.toString()}`)
        const respData = response.data as TaskResponseType[];
        return respData.map((el: TaskResponseType) => new TodoTask(el));
    }

    async fetchAllTaskStatus(): Promise<TodoStatus[]> {
        const responce = await Api.get('candidateTasks/statuses');
        const respData = responce.data as TaskStatusResponceType[];

        return respData.map((el: TaskStatusResponceType) => new TodoStatus(el));
    }

    async createTask(data: {name?: string, description?: string, do_date?: number, reminder_time?: number, candidate_id?: number, category_id: number, images_link?: string[] }): Promise<TaskResponseType> {
        const responce = await Api.post('candidateTasks', data);

        return responce.data as TaskResponseType;
    }

    async getCandidateTask(data: {id: number}): Promise<TodoTask> {
        const responce = await Api.get(`candidateTasks/${data.id}`);

        return new TodoTask(responce.data as TaskResponseType);
    }

    async deleteTask(data: {id: number}): Promise<void> {
        await Api.delete(`candidateTasks/${data.id}`);
    }

    getTime(createdAt: number): string {
        const date = new Date(createdAt * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
    }
}
