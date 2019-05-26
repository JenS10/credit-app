export interface ICredit {
    id?: number;
    client_id: number;
    value: number;
    payment_date: string;
    status: boolean;
    paid: boolean;
    date_application: string;
}
