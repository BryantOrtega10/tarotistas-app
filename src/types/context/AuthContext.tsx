import { User } from "../../models/User.model";

export type AuthContextType = {
    loggedInUser: User | null;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (user: User) => void;
};