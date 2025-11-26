import { Client } from "./Cliente";

export type Call = {
    idCall: number;
    client: Client;
    startDate?: Date;
    endDate?: Date;
}