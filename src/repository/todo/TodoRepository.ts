import Api from '@/repository/api';
import { ITodoRepository } from './TodoRepository.types';
import { TodoTask } from '@/entity/todo/todo';
import { TaskResponseType } from '@/entity/todo/todo.types';

export class TodoRepository implements ITodoRepository {
    async fetchAll(data?: {id: number}): Promise<TodoTask[]> {
        const response = await Api.get(`candidateTasks/${data!.id}`)
        const respData = response.data as TaskResponseType[];
        return respData.map((el: TaskResponseType) => new TodoTask(el));
    }

    getTime(createdAt: number): string {
        const date = new Date(createdAt * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
    }
}
