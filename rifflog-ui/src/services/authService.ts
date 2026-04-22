import apiClient from "../config/axiosConfig";
import type { AuthRequest, AuthResponse } from "../types";

// handle login and register API calls

export const requestLogin = async (request: AuthRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/login', request);
    return response.data;
}

export const requestRegistration = async (request: AuthRequest): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/auth/register', request);
    return response.data;
}