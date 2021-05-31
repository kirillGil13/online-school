import { TODOCOMPONENTS } from '@/constants';
import { ITaskStatus, TaskStatusResponceType} from './todo.types';

export class TodoStatus implements ITaskStatus {
   categoryId: number;
   categoryName: string;
   photoLink: string;
   taskCount: number;
   component: string;

    constructor(data: TaskStatusResponceType) {
        this.categoryId = data.category_id;
        this.categoryName = data.category_name;
        this.photoLink = data.photo_link;
        this.taskCount = data.task_count;
        this.component = TODOCOMPONENTS.find(el => el.value === this.categoryName)!.component;
    }
}
