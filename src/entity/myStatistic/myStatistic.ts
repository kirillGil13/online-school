import {IMyStatistic, IMyStatisticItem, MyStatisticResponseType} from '@/entity/myStatistic/myStatistic.types';

export default class MyStatistic implements IMyStatistic {
    purchasesCount: IMyStatisticItem;
    purchasesIncomeCurrent: IMyStatisticItem;
    viewCountCurrent: IMyStatisticItem;
    ratingCurrent: IMyStatisticItem;

    constructor(data: MyStatisticResponseType) {
        this.purchasesCount = data.purchasesCount;
        this.purchasesIncomeCurrent = data.purchasesIncomeCurrent;
        this.viewCountCurrent = data.viewCountCurrent;
        this.ratingCurrent = data.ratingCurrent;
    }
}