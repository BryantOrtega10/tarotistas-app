import { User } from "./User";

export type Rating = {
    user: User;
    ratingDate?: string;
    rating: number;
};