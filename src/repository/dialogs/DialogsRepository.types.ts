import {IDialogs} from '@/entity/dialogs/dialogs.types';

export interface IDialogsRepository {
    fetchAll(): Promise<IDialogs[]>;
}
