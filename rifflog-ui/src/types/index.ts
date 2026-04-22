export type MediaType = 'AUDIO' | 'VIDEO' | 'BOTH'

export interface Recording {
    id: number
    title: string
    recordedAt: string
    createdAt: string
    mediaType: MediaType
    audioUrl: string | null
    videoUrl: string | null
    cloudinaryPublicId: string | null
    gearUsed: string | null
    notes: string | null
    tags: string | null
    duration: number | null
}

export interface RecordingRequest {
    title: string
    recordedAt: string
    mediaType: 'AUDIO' | 'VIDEO' | 'BOTH'
    audioUrl: string | null
    videoUrl: string | null
    cloudinaryPublicId: string | null
    gearUsed: string | null
    notes: string | null
    tags: string | null
    duration: number | null
}

export interface AuthRequest {
    username: string
    password: string
}

export interface AuthResponse {
    token: string
}