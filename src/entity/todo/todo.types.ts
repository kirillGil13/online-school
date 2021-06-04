export interface ITodoTask {
    id: number;
    createdAt: string;
    name: string;
    description: string;
    doDate: number | string;
    reminderTime: number;
    categoryId: number;
    isDone: boolean;
    candidate: ITaskCandidate;
    imagesLink: string[];
    checked?: boolean;
}

export interface ITaskCandidate  {
    candidate_id: number;
    candidate_name: string;
}

export interface ITaskStatus {
    categoryId: number;
    categoryName: string;
    photoLink: string;
    taskCount: number;
    component: string;
}

export interface ITaskToDate {
    date: string;
    tasks: ITodoTask[];
}

export interface ITaskNewItem {
    name: string;
    checked: boolean;
    description: string;
    doDate: string | null;
    imagesLink: string[];
    candidateId: number | null;
}

export type TaskStatusResponceType = {
    category_id: number;
    category_name: string;
    photo_link: string;
    task_count: number;
}

export type TaskResponseType = {
    id: number;
    created_at: number;
    name: string;
    description: string;
    do_date: number;
    reminder_time: number;
    category_id: number;
    is_done: boolean;
    candidate: TaskCandidateItemResponseType;
    images_link: string[];
};
export type TaskCandidateItemResponseType = {
    candidate_id: number;
    candidate_name: string;
}

export type TaskRequestType = {
    name?: string;
    description?: string;
    do_date?: number;
    reminder_time?: number;
    candidate_id?: number;
    category_id: number;
    images_link?: string[];
}
