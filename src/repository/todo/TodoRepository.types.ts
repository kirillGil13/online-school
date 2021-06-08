import { TodoTask } from '@/entity/todo/todo';
import {ITaskStatus, ITodoTask, TaskRequestType, TaskResponseType} from '@/entity/todo/todo.types';
import { TodoStatus } from '@/entity/todo/todoStatus';

export interface ITodoRepository {
    fetchAll(data?: {id: number}): Promise<ITodoTask[]>;
    fetchAllTaskStatus(): Promise<ITaskStatus[]>;
    createTask(data: TaskRequestType): Promise<ITodoTask>;
    getCandidateTask(data: {id: number}): Promise<ITodoTask>;
    deleteTask(data: {id: number}): Promise<void>;
    updateCandidateTask(data: { data: TaskRequestType; route: number }): Promise<ITodoTask>;
}
