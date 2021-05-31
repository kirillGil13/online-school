export interface ITodoTask {
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
}

export interface ITaskCandidate  {
    candidate_id: number;
    candidate_name: string;
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
