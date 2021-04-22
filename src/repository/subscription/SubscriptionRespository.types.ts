
export interface ISubscriptionRepository {
    subscribe(): Promise<boolean>;
    delete(): Promise<boolean>;
}
