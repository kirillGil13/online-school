import { TodoTask } from '@/entity/todo/todo';

export interface ITodoRepository {
    fetchAll(data?: {id: number}): Promise<TodoTask[]>;
}
