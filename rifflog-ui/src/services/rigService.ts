import apiClient from "@/config/axiosConfig";
import type { RigPhoto, RigPhotoRequest } from "@/types";

export const getAllRigPhotos = async (): Promise<RigPhoto[]> => {
    const response = await apiClient.get("/api/rig");
    return response.data;
}

export const createRigPhoto = async (request: RigPhotoRequest): Promise<RigPhoto> => {
    const response = await apiClient.post("/api/rig", request);
    return response.data;
}

export const deleteRigPhoto = async (id: number): Promise<void> => {
    await apiClient.delete(`/api/rig/${id}`);
} 