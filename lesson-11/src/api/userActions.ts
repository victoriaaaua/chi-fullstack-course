import axiosInstance from '../api/axiosInstance';
import { Login } from '../interfaces/Login';


export const doLogin = async ({ username, password }: Login): Promise<any> => {
    return axiosInstance.post('api/auth/login', {
        username,
        password
    });
};

export const getUserProfileData = async (): Promise<any> => {
    return await axiosInstance.get('users/my-profile');
};

export const doRegister = async ({ username, password }: Login): Promise<any> => {
    return axiosInstance.post('users/register', {
        username,
        password
    });
};