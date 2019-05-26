export interface IClient {
    id?: number;
    name: string;
    lastname: string;
    identification: number;
    email: string;
}

export interface IClientCredit {
    client_id?: number;
    id?: number;
    name: string;
    lastname: string;
    identification: number;
    email: string;
    value: number;
    payment_date: string;
    status: boolean;
    paid: boolean;
    date_application: string;
}

