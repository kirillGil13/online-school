import { TodoTask } from '@/entity/todo/todo';
import { ITaskStatus, ITodoTask, TaskResponseType } from '@/entity/todo/todo.types';
import { TodoStatus } from '@/entity/todo/todoStatus';

export interface ITodoRepository {
    fetchAll(data?: {id: number}): Promise<ITodoTask[]>;
    fetchAllTaskStatus(): Promise<ITaskStatus[]>
    createTask(data: {name?: string, description?: string, do_date?: number, reminder_time?: number, candidate_id?: number, category_id: number, images_link?: string[] }): Promise<TaskResponseType>;
    getCandidateTask(data: {id: number}): Promise<ITodoTask>;
    deleteTask(data: {id: number}): Promise<void>;
    updateCandidateTask(data: {id: number, name?: string, description?: string, do_date?: number, reminder_time?: number, candidate_id?: number, category_id: number, images_link?: string[] }): Promise<ITodoTask>;
}
