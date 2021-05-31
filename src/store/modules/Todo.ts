import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import {CandidateRequestType, ICandidate} from '@/entity/candidates';
import {CandidateFormRequestType, CandidatePhoneRequestType, CandidateStatusCount} from '@/form/candidate/candidateForm.types';
import {CodeRequestType} from '@/form/code/codeForm.types';
import { TodoTask } from '@/entity/todo/todo';

@Module({
    namespaced: true,
    name: 'todoTask',
    store,
    dynamic: true,
})
class CandidatesModule extends VuexModule {
    todoTask: TodoTask[] = []

    @Action({commit: 'setTodoTask', rawError: true})
    async fetchAllTask(data?: {id: number}): Promise<{todoTask:TodoTask[]}> {
        const todoTask = await store.$repository.todo.fetchAll(data);
       
        return {todoTask};
    }


    @Mutation
    setTodoTask(data:{todoTask: TodoTask[]}) {
        this.todoTask = data.todoTask;
    }

}

export const CandidatesStore = getModule(CandidatesModule);
