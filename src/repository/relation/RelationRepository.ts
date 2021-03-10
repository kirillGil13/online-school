import Api from '@/repository/api';
import {IRelationRepository} from '@/repository/relation/RelationRepository.types';
import {RelationLikeDislikeRequestType} from '@/entity/common/relation.types';

export class RelationRepository implements IRelationRepository {
    async postFavourite(param: string): Promise<boolean> {
        const response = await Api.post(`/courses/${param}/favourites`);
        return response.data;
    }
    async postLikeDislike(param: string, relation: RelationLikeDislikeRequestType): Promise<boolean> {
        const response = await Api.post(`/courses/${param}/likes-dislikes`, relation);
        return response.data;
    }
    async deleteFavourite(param: string): Promise<boolean> {
        const response = await Api.delete(`/courses/${param}/favourites`);
        return response.data;
    }
    async deleteLikeDislike(param: string): Promise<boolean> {
        const response = await Api.delete(`/courses/${param}/likes-dislikes`);
        return response.data;
    }
}