import type { RigPhoto } from "@/types";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface RigPhotoCardProps {
  photo: RigPhoto;
  isAuthenticated: boolean;
  onDelete: (id: number) => void;
}

export default function RigPhotoCard({
  photo,
  isAuthenticated,
  onDelete,
}: RigPhotoCardProps) {
  return (
    <div className="bg-[#111113] border border-[#26262c] rounded-sm overflow-hidden group">
      <div className="relative aspect-square">
        <img
          src={photo.imageUrl}
          alt={photo.description || "Rig photo"}
          className="w-full h-full object-cover"
        />
        {isAuthenticated && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={() => onDelete(photo.id)}
              className="bg-red-900/80 text-red-400 border border-red-900 hover:bg-red-900 text-xs p-1.5 h-auto"
            >
              <Trash2 size={12} />
            </Button>
          </div>
        )}
      </div>
      <div className="px-3 py-2 flex flex-col gap-1">
        {photo.category && (
          <span className="text-[10px] text-[#ff6b35] uppercase tracking-widest">
            {photo.category}
          </span>
        )}
        {photo.description && (
          <p className="text-xs text-[#b8b7b3]">{photo.description}</p>
        )}
      </div>
    </div>
  );
}
