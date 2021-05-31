import {IProfileDocs} from '@/entity/profileDocs/profileDocs.types';
import {ProfileDocumentsRequestType} from '@/form/profile/documents/profileDocumentsForm.types';

export interface IProfileDocsRepository {
    fetchData(): Promise<IProfileDocs>;
    changeDoc(data: ProfileDocumentsRequestType): Promise<IProfileDocs>;
}
