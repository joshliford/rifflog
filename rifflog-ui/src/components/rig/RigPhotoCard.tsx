import type { RigPhoto } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface RigPhotoCardProps {
  photo: RigPhoto;
  isAuthenticated: boolean;
  onDelete: (id: number) => void;
  onExpand: (url: string) => void;
  onEdit: (photo: RigPhoto) => void;
}

function withQuality(url: string): string {
  return url.replace("/upload/", "/upload/q_auto,f_auto/");
}

export default function RigPhotoCard({
  photo,
  isAuthenticated,
  onDelete,
  onExpand,
  onEdit,
}: RigPhotoCardProps) {
  return (
    <div className="bg-[#111113] border border-[#26262c] rounded-sm overflow-hidden group">
      <div
        className="relative w-full bg-[#0b0b0c] cursor-zoom-in"
        onClick={() => onExpand(withQuality(photo.imageUrl))}
      >
        <img
          src={withQuality(photo.imageUrl)}
          alt={photo.description || "Rig photo"}
          className="w-full h-auto object-contain"
        />
        {isAuthenticated && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(photo);
              }}
              className="bg-[#111113]/80 text-[#76766f] border border-[#26262c] hover:text-[#ff6b35] hover:border-[#ff6b35] text-xs p-1.5 h-auto"
            >
              <Pencil size={12} />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(photo.id);
              }}
              className="bg-red-900/80 text-red-400 border border-red-900 hover:bg-red-900 text-xs p-1.5 h-auto"
            >
              <Trash2 size={12} />
            </Button>
          </div>
        )}
      </div>
      <div className="px-3 py-2 flex flex-col gap-1">
        {photo.category && (
          <div className="flex flex-wrap gap-1">
            {photo.category.split(",").map((cat) => (
              <span
                key={cat}
                className="text-[10px] text-[#ff6b35] uppercase tracking-widest"
              >
                {cat.trim()}
              </span>
            ))}
          </div>
        )}
        {photo.description && (
          <p className="text-xs text-[#b8b7b3] whitespace-pre-wrap">{photo.description}</p>
        )}
      </div>
    </div>
  );
}

