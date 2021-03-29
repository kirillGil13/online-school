import Api from '@/repository/api';
import {DialogsResponseType, IDialogs} from '@/entity/dialogs/dialogs.types';
import {IDialogsRepository} from '@/repository/dialogs/DialogsRepository.types';
import Dialogs from '@/entity/dialogs/dialogs';

export class DialogsRepository implements IDialogsRepository {
    async fetchAll(): Promise<IDialogs[]> {
        const response = await Api.get('/dialogs');
        const data = response.data as DialogsResponseType[];
        return data.map((dialog: DialogsResponseType) => new Dialogs(dialog));
    }
}
