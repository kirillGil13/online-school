export type PaginationRequestType = {
    name?: string;
    minCost?: number;
    maxCost?: number;
    accountId?: number;
    courseLevelId?: number;
    limit?: number;
    skip?: number;
    statusId?: number;
    isFiction?: boolean;
    infoPackId?: number;
    search?: string;
    sort?: string;
    orderBy?: string;
}
