import { useCloudinaryWidget } from "@/hooks/useCloudinaryWidget";
import type { UploadedFile } from "@/types";
import { Music, Upload, Video, X } from "lucide-react";
import { Button } from "../ui/button";

interface DropZoneProps {
  onUploadSuccess: (file: UploadedFile) => void;
  uploadedFile: UploadedFile | null;
  onClear: () => void;
}

export default function DropZone({
  onUploadSuccess,
  uploadedFile,
  onClear,
}: DropZoneProps) {
  const { openWidget } = useCloudinaryWidget(onUploadSuccess);

  if (uploadedFile) {
    // show uploaded file details
    return (
      <div className="border border-[#26262c] rounded-sm p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#1a1a1e] rounded flex items-center justify-center">
            {uploadedFile.resourceType === "video" ? (
              <Video size={16} className="text-[#ff6b35]" />
            ) : (
              <Music size={16} className="text-[#ff6b35]" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white text-sm font-medium">{uploadedFile.publicId}</p>
            <p className="text-[#76766f] text-xs uppercase tracking-widest">{uploadedFile.resourceType} | {uploadedFile.duration ? ` ${Math.floor(uploadedFile.duration)}s` : ' uploaded'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-xs text-green-500 uppercase tracking-widest">Uploaded</span>
            <Button onClick={onClear} className="text-[#76766f] hover:cursor-pointer hover:text-white transition-colors">
                <X size={16} />
            </Button>
        </div>
      </div>
    );
  }

  // show drop zone
  return (
    <div className="relative border border-dashed border-[#26262c] rounded-sm p-24 flex flex-col items-center gap-6">
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ff6b35] border-dashed" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#ff6b35] border-dashed" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#ff6b35] border-dashed" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ff6b35] border-dashed" />
      {/* Upload Icon */}
      <div className="w-16 h-16 rounded-full border border-[#26262c] flex items-center justify-center">
        <Upload size={20} className="text-[#ff6b35]" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-white text-2xl font-light">Drop a take here</h3>
        <p className="text-[#76766f] text-sm tracking-wide">
          Video or Audio | up to 4 GB per file
        </p>
        <p className="text-[#4a4a4f] text-xs tracking-wide">
          Uploading a gear photo? It'll be routed to your Rig
        </p>
      </div>
      <div>
        <Button
          onClick={openWidget}
          className="bg-[#ff6b35] hover:cursor-pointer text-black hover:bg-[#ff6b35]/90 uppercase tracking-widest text-xs gap-2"
        >
          <Upload size={13} />
          Browse Files
        </Button>
      </div>
    </div>
  );
}
