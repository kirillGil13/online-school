import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {CommentsRequestType, IComments} from '@/entity/comments/comments.types';
import {CommentsFormRequestType} from '@/form/comments/commentsForm.types';
import {ICommentsAnswers} from '@/entity/commentsAnswers/commentsAnswers.types';
import {CommentsChangeRequestType} from '@/form/commentsChange/commentsChangeForm.types';

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
        this.commentsLoaded = false;
        this.comments = [];
    }

    @Mutation
    setComments(data: {comments: IComments[]; commentsLoaded: boolean}): void {
        this.comments = this.comments.concat(data.comments);
        this.commentsLoaded = data.commentsLoaded;
    }

    @Action({commit: 'setComments'})
    async fetchAll(data: {route: string; pagination?: CommentsRequestType}): Promise<{ comments: IComments[]; commentsLoaded: boolean }> {
        const formData = new FormData();
        let commentsLoaded = false;
        if (data.pagination) {
            if (data.pagination.skip)
                formData.append('skip', data.pagination.skip.toString());
            if (data.pagination.limit)
                formData.append('limit', data.pagination.limit.toString());
        }
        const comments = await store.$repository.comments.fetchAll(data.route, formData);
        if (comments) {
            commentsLoaded = true;
        }
        return {comments, commentsLoaded};
    }

    @Action({rawError: true})
    async postComment(data: CommentsFormRequestType): Promise<ICommentsAnswers> {
        const response = await store.$repository.comments.postComment(data);
        return response;
    }

    @Action({rawError: true})
    async deleteComment(route: string): Promise<boolean> {
        const response = await store.$repository.comments.deleteComment(route);
        return response;
    }

    @Action({rawError: true})
    async patchComment(data: {data: CommentsChangeRequestType; route: string}): Promise<ICommentsAnswers> {
        const response = await store.$repository.comments.patchComment(data.data, data.route);
        return response;
    }

    @Action({rawError: true})
    async setLikeDislikeComment(data: {data: {is_like: boolean}; route: string}): Promise<boolean> {
        const response = await store.$repository.comments.setLikeDislikeComment(data.data, data.route);
        return response;
    }

    @Action({rawError: true})
    async deleteLikeDislikeComment(route: string): Promise<boolean> {
        const response = await store.$repository.comments.deleteLikeDislikeComment(route);
        return response;
    }
}

export const CommentsStore = getModule(CommentsModule);
