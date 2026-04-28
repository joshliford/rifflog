import type { UploadedFile } from "@/types";

interface PublishStepProps {
  uploadedFile: UploadedFile | null;
  formData: {
    title: string;
    recordedAt: string;
    tuning: string;
    key: string;
    notes: string;
    selectedTags: string[];
    selectedGear: string[];
  };
}

export default function PublishStep({
  uploadedFile,
  formData,
}: PublishStepProps) {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <p className="text-xs text-[#76766f] uppercase tracking-widest border-b border-[#26262c] pb-4">
        Review &amp; Publish
      </p>

      {/* File */}
      <div className="flex flex-col gap-3">
        <p className="text-xs text-[#76766f] uppercase tracking-widest">File</p>
        {uploadedFile ? (
          <div className="flex flex-col gap-2">
            {uploadedFile.resourceType === "video" && (
              <video
                src={uploadedFile.url}
                controls
                className="w-full max-w-xl rounded-sm border border-[#26262c] bg-black"
              />
            )}
            {uploadedFile.resourceType === "audio" && (
              <audio
                src={uploadedFile.url}
                controls
                className="w-full max-w-xl"
                style={{ colorScheme: "dark" }}
              />
            )}
            <p className="text-xs text-[#76766f]">
              {uploadedFile.resourceType.toUpperCase()}
              {uploadedFile.duration != null &&
                ` · ${Math.floor(uploadedFile.duration / 60)}:${String(Math.round(uploadedFile.duration % 60)).padStart(2, "0")}`}
            </p>
          </div>
        ) : (
          <p className="text-sm text-[#4a4a4f]">No file uploaded</p>
        )}
      </div>

      {/* Title & Date */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-[#76766f] uppercase tracking-widest">
            Title
          </p>
          <p className="text-sm text-white">
            {formData.title || <span className="text-[#4a4a4f]">—</span>}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-[#76766f] uppercase tracking-widest">
            Date Recorded
          </p>
          <p className="text-sm text-white">
            {formData.recordedAt || <span className="text-[#4a4a4f]">—</span>}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-[#76766f] uppercase tracking-widest">
            Tuning
          </p>
          <p className="text-sm text-white">
            {formData.tuning || <span className="text-[#4a4a4f]">—</span>}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-[#76766f] uppercase tracking-widest">
            Key
          </p>
          <p className="text-sm text-white">
            {formData.key || <span className="text-[#4a4a4f]">—</span>}
          </p>
        </div>
      </div>

      {/* Notes */}
      {formData.notes && (
        <div className="flex flex-col gap-1">
          <p className="text-xs text-[#76766f] uppercase tracking-widest">
            Notes
          </p>
          <p className="text-sm text-[#b8b7b3] whitespace-pre-wrap">
            {formData.notes}
          </p>
        </div>
      )}

      {/* Tags */}
      {formData.selectedTags.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[#76766f] uppercase tracking-widest">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {formData.selectedTags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-1 rounded-sm border border-[#ff6b35] text-[#ff6b35] uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Gear */}
      {formData.selectedGear.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[#76766f] uppercase tracking-widest">
            Gear Used
          </p>
          <ul className="flex flex-col gap-1">
            {formData.selectedGear.map((gear) => (
              <li key={gear} className="ml-4 list-disc text-sm text-[#b8b7b3]">
                {gear}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
