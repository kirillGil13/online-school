import {Action, getModule, Module, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {CommentsFormRequestType} from '@/form/comments/commentsForm.types';
import {ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';
import {CommentsChangeRequestType} from '@/form/commentsChange/commentsChangeForm.types';

@Module({
    namespaced: true,
    name: 'commentsAnswers',
    store,
    dynamic: true,
})
class CommentsAnswersModule extends VuexModule {

    @Action({rawError: true})
    async postAnswer(data: CommentsFormRequestType): Promise<ICommentsAnswers> {
        const response = await store.$repository.commentsAnswers.postAnswer(data);
        return response;
    }

    @Action({rawError: true})
    async deleteAnswer(route: string): Promise<boolean> {
        const response = await store.$repository.commentsAnswers.deleteAnswer(route);
        return response;
    }

    @Action({rawError: true})
    async patchAnswer(data: {data: CommentsChangeRequestType; route: string}): Promise<ICommentsAnswers> {
        const response = await store.$repository.commentsAnswers.patchAnswer(data.data, data.route);
        return response;
    }

    @Action({rawError: true})
    async setLikeDislikeAnswer(data: {data: {is_like: boolean}; route: string}): Promise<boolean> {
        const response = await store.$repository.commentsAnswers.setLikeDislikeAnswer(data.data, data.route);
        return response;
    }

    @Action({rawError: true})
    async deleteLikeDislikeAnswer(route: string): Promise<boolean> {
        const response = await store.$repository.commentsAnswers.deleteLikeDislikeAnswer(route);
        return response;
    }
}

export const CommentsAnswersStore = getModule(CommentsAnswersModule);
