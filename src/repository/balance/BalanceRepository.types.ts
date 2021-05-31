export interface IBalanceRepository {
    fetchData(): Promise<number>;
}
