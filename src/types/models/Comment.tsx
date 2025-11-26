import { User } from "./User";

export type Comment = {
    user: User;
    message: string;
    replyMessage?: string;
    messageDate?: string;
};