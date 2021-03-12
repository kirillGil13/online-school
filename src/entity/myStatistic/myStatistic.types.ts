export interface IMyStatistic {
    purchasesCount: IMyStatisticItem;
    purchasesIncomeCurrent: IMyStatisticItem;
    viewCountCurrent: IMyStatisticItem;
    ratingCurrent: IMyStatisticItem;
}
export interface IMyStatisticItem {
    current: number;
    change: number;
    isIncrease: boolean;
}

export type MyStatisticResponseType = {
    purchasesCount: MyStatisticItemResponseType;
    purchasesIncomeCurrent: MyStatisticItemResponseType;
    viewCountCurrent: MyStatisticItemResponseType;
    ratingCurrent: MyStatisticItemResponseType;
}

export type MyStatisticItemResponseType = {
    current: number;
    change: number;
    isIncrease: boolean;
}

export type MyStatisticRequestType = {
    timestampStart: number;
    timestampFinish: number;
}