interface CloudinaryWidget {
    open: () => void
    close: () => void
}

interface Window {
    cloudinary: {
        createUploadWidget: (
            options: object,
            callback: (error: unknown, result: CloudinaryResult) => void
        ) => CloudinaryWidget
    }
}

interface CloudinaryResult {
    event: string
    info: {
        secure_url: string
        public_id: string
        duration?: number
        resource_type: string
    }
}