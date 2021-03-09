import {RelationLikeDislikeRequestType} from '@/entity/common/relation.types';

export interface IRelationRepository {
    postFavourite(param: string): Promise<boolean>;
    postLikeDislike(param: string, relation: RelationLikeDislikeRequestType): Promise<boolean>;
    deleteFavourite(param: string): Promise<boolean>;
    deleteLikeDislike(param: string): Promise<boolean>;
}