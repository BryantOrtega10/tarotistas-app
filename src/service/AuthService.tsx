import { CompleteAccountRequest, CompleteRegisterRequest, LoginRequest, RegisterRequest } from '../types/requests/RegisterRequest';
import { CompleteAccountResponse, CompleteRegisterResponse, LoginResponse, RegisterResponse } from '../types/responses/AuthResponse';
import { base64ToBlob } from '../utils/base64ToBlob';
import axios from './AxiosInstance';
import { AUTH_ENDPOINTS } from './endpoints';



export const AuthService = {
    async postRegister(request: RegisterRequest): Promise<RegisterResponse>  {
         try {
            const formData = new FormData();
            formData.append('nombre', request.nombre);
            formData.append('email', request.email);
            formData.append('password', request.password);
            formData.append('repeatPassword', request.repeatPassword);
            if (request.image) {
                const contentType = request.image.match(/^data:(.*);base64/)?.[1] || 'image/jpeg';
                const blob = base64ToBlob(request.image, contentType);
                formData.append('image', blob, 'photo.jpg');
            }
            const response = await axios.post<RegisterResponse>(AUTH_ENDPOINTS.REGISTRO_TAROTISTA, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (error: any) {
            console.log(error)
            throw error;
        }
        
    },
    async postCompleteRegister(request: CompleteRegisterRequest): Promise<CompleteRegisterResponse>  {
         try {
            const response = await axios.post<CompleteRegisterResponse>(AUTH_ENDPOINTS.COMPLETAR_REGISTRO_TAROTISTA, request);
            return response.data;
        } catch (error: any) {
            console.log(error)
            throw error;
        }
        
    },
    async postLogin(request: LoginRequest): Promise<LoginResponse>  {
         try {
            const response = await axios.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN_TAROTISTA, request);
            return response.data;
        } catch (error: any) {
            console.log(error)
            console.log("err")
            throw error;
        }
        
    },
    async postCompleteAccount(request: CompleteAccountRequest): Promise<CompleteAccountResponse>  {
         try {
            const response = await axios.post<CompleteAccountResponse>(AUTH_ENDPOINTS.COMPLETAR_CUENTA_TAROTISTA, request);
            return response.data;
        } catch (error: any) {
            console.log(error)
            throw error;
        }
        
    },
    

    
}