import {ITodoTask, ITaskCandidate, TaskResponseType, TaskCandidateItemResponseType} from './todo.types';

export class TodoTask implements ITodoTask {
    id: number;
    createdAt: string;
    name: string;
    description: string;
    doDate: number;
    reminderTime: number;
    categoryId: number;
    isDone: boolean;
    candidate: ITaskCandidate;
    imagesLink: string[];

    constructor(data: TaskResponseType) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.doDate = data.do_date;
        this.reminderTime = data.reminder_time;
        this.createdAt = this.getTime(data.created_at);
        this.categoryId = data.category_id;
        this.isDone = data.is_done;
        this.candidate = data.candidate;
        this.imagesLink = data.images_link;
    }

    getTime(createdAt: number): string {
        const date = new Date(createdAt * 1000)
        return date.toLocaleString().slice(0,5) + date.toLocaleString().slice(10,17)
    }
}
