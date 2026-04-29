export type MediaType = "AUDIO" | "VIDEO" | "BOTH";

export interface Recording {
  id: number;
  title: string;
  recordedAt: string;
  createdAt: string;
  mediaType: MediaType;
  audioUrl: string | null;
  videoUrl: string | null;
  cloudinaryPublicId: string | null;
  gearUsed: string | null;
  notes: string | null;
  tags: string | null;
  duration: number | null;
  tuning: string | null;
  key: string | null;
  ampSimScreenshotUrl: string | null;
}

export interface RecordingRequest {
  title: string;
  recordedAt: string;
  mediaType: "AUDIO" | "VIDEO" | "BOTH";
  audioUrl: string | null;
  videoUrl: string | null;
  cloudinaryPublicId: string | null;
  gearUsed: string | null;
  notes: string | null;
  tags: string | null;
  duration: number | null;
  tuning: string | null;
  key: string | null;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export interface UploadedFile {
  url: string;
  publicId: string;
  duration: number | null;
  resourceType: string;
}

export interface RigPhoto {
  id: number;
  imageUrl: string;
  cloudinaryPublicId: string;
  description: string | null;
  category: string | null;
  createdAt: string;
}

export interface RigPhotoRequest {
  imageUrl: string;
  cloudinaryPublicId: string;
  description: string | null;
  category: string | null;
}
