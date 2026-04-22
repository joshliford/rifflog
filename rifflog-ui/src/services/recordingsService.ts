import apiClient from "../config/axiosConfig";
import type { Recording, RecordingRequest } from "../types";

// handle all recording related API calls

export const getAllRecordings = async (): Promise<Recording[]> => {
    const response = await apiClient.get('/api/recordings');
    return response.data;
}

export const getRecordingById = async (id: number): Promise<Recording> => {
    const response = await apiClient.get(`/api/recordings/${id}`);
    return response.data;
}

export const createRecording = async (request: RecordingRequest): Promise<Recording> => {
    const response = await apiClient.post('/api/recordings', request);
    return response.data;
}

export const updateRecording = async (id: number, request: RecordingRequest): Promise<Recording> => {
    const response = await apiClient.patch(`/api/recordings/${id}`, request);
    return response.data;
}

export const deleteRecording = async (id: number): Promise<void> => {
    await apiClient.delete(`/api/recordings/${id}`);
}