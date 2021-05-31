import { TodoTask } from '@/entity/todo/todo';
import { TaskResponseType } from '@/entity/todo/todo.types';
import { TodoStatus } from '@/entity/todo/todoStatus';

export interface ITodoRepository {
    fetchAll(data?: {id: number}): Promise<TodoTask[]>;
    fetchAllTaskStatus(): Promise<TodoStatus[]>
    createTask(data: {name?: string, description?: string, do_date?: number, reminder_time?: number, candidate_id?: number, category_id: number, images_link?: string[] }): Promise<TaskResponseType>;
    getCandidateTask(data: {id: number}): Promise<TodoTask>;
    deleteTask(data: {id: number}): Promise<void>;
}
