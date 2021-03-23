import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {IComments} from '@/entity/comments/comments.types';
import {CommentsFormRequestType} from '@/form/comments/commentsForm.types';
import {ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';

@Module({
    namespaced: true,
    name: 'comments',
    store,
    dynamic: true,
})
class CommentsModule extends VuexModule {
    comments: IComments[] = [];
    commentsLoaded = false;

    @Mutation
    setCommentsToEmpty(): void {
        this.comments = [];
    }

    @MutationAction
    async fetchAll(route: string): Promise<{ comments: IComments[]; commentsLoaded: boolean }> {
        const comments = await store.$repository.comments.fetchAll(route);
        let commentsLoaded = false;
        if (comments)
            commentsLoaded = true;
        return { comments, commentsLoaded };
    }

    @Action({rawError: true})
    async postComment(data: CommentsFormRequestType): Promise<ICommentsAnswers> {
        const response = await store.$repository.comments.postComment(data);
        return response;
    }

    @Action({rawError: true})
    async postAnswer(data: CommentsFormRequestType): Promise<ICommentsAnswers> {
        const response = await store.$repository.comments.postAnswer(data);
        return response;
    }

    @Action({rawError: true})
    async setLikeDislikeComment(data: {data: {is_like: boolean}; route: string}): Promise<boolean> {
        const response = await store.$repository.comments.setLikeDislikeComment(data.data, data.route);
        return response;
    }

    @Action({rawError: true})
    async setLikeDislikeAnswer(data: {data: {is_like: boolean}; route: string}): Promise<boolean> {
        const response = await store.$repository.comments.setLikeDislikeAnswer(data.data, data.route);
        return response;
    }

    @Action({rawError: true})
    async deleteLikeDislikeComment(route: string): Promise<boolean> {
        const response = await store.$repository.comments.deleteLikeDislikeComment(route);
        return response;
    }

    @Action({rawError: true})
    async deleteLikeDislikeAnswer(route: string): Promise<boolean> {
        const response = await store.$repository.comments.deleteLikeDislikeAnswer(route);
        return response;
    }
}

export const CommentsStore = getModule(CommentsModule);
