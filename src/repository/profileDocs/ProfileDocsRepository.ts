import Api from '@/repository/api';
import {IProfileDocsRepository} from '@/repository/profileDocs/ProfileDocsRepository.types';
import {IProfileDocs, ProfileDocsResponseType} from '@/entity/profileDocs/profileDocs.types';
import ProfileDocs from '@/entity/profileDocs/profileDocs';
import {ProfileDocumentsRequestType} from '@/form/profile/documents/profileDocumentsForm.types';

export class ProfileDocsRepository implements IProfileDocsRepository {

    async fetchData(): Promise<IProfileDocs> {
        const response = await Api.get('/account-documents');
        const data = response.data as ProfileDocsResponseType;
        return new ProfileDocs(data);
    }

    async changeDoc(data: ProfileDocumentsRequestType): Promise<IProfileDocs> {
        const response = await Api.patch('/account-documents', data);
        const responseData = response.data as ProfileDocsResponseType;
        return new ProfileDocs(responseData);
    }
}
