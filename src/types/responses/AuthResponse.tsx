import { User } from "../../models/User.model";

export interface RegisterResponse{
    success: boolean;
    message: string;
    data: {
        token: string;
        status: number;
        user: User;
    }    
}

export interface CompleteRegisterResponse{
    success: boolean;
    message: string;
    data: {
        status: number;
    }    
}

export interface LoginResponse{
    success: boolean;
    message: string;
    data: {
        token: string;
        status: number;
        user: User;
    }   
}