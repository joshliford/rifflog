import type { UploadedFile } from "@/types";

export const useCloudinaryWidget = (onSuccess: (file: UploadedFile) => void) => {
    const openWidget = () => {

        const widget = window.cloudinary.createUploadWidget({
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
            resourceType: 'auto',
            maxFiles: 1,
            styles: {
                palette: {
                    window: '#0b0b0c',
                    windowBorder: '#26262c',
                    tabIcon: '#ff6b35',
                    menuIcons: '#76766f',
                    textDark: '#ffffff',
                    textLight: '#ffffff',
                    link: '#ff6b35',
                    action: '#ff6b35',
                    inactiveTabIcon: '#76766f',
                    error: '#ff4444',
                    inProgress: '#ff6b35',
                    complete: '#22c55e',
                    sourceBg: '#111113',
                },
            }
        }, (_error: unknown, result: CloudinaryResult) => {
            if (result?.event === 'success') {
                onSuccess({
                    url: result.info.secure_url,
                    publicId: result.info.public_id,
                    duration: result.info.duration ?? null,
                    resourceType: result.info.resource_type
                })
            }
        })
        widget.open()
    }
    return { openWidget }
}