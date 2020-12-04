
export interface ILoginForm{
    phone: string;
    countryCode: string;
    request: LoginRequestType;
    fullPhone: string;
}

export type LoginRequestType = {
    phone: string;
}