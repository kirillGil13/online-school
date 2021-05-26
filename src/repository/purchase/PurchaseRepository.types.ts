
export interface IPurchaseRepository {
    buyTinkoff(id: number): Promise<string>;
}
