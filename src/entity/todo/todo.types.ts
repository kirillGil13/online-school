export interface ITodoTask {
    id: number;
    createdAt: string;
    name: string;
    description: string;
    doDate: number | null;
    reminderTime: number;
    categoryId: number;
    isDone: boolean;
    candidate: ITaskCandidate;
    imagesLink: string[];
    checked?: boolean;
    hide: boolean;
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

export interface ITaskItem {
    name: string;
    checked: boolean;
    description: string;
    doDate: number | null;
    imagesLink: string[];
    candidateId: number | null;
    candidateName: string | null;
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
    do_date: number | null;
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
    name: string | null;
    description: string | null;
    do_date: number | null;
    reminder_time: number | null;
    candidate_id: number | null;
    category_id: number;
    images_link: string[] | null;
}
