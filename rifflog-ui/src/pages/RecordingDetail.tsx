import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  deleteRecording,
  getRecordingById,
  updateRecording,
} from "@/services/recordingsService";
import type { Recording } from "@/types";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RecordingDetail() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recording, setRecording] = useState<Recording | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { isAuthenticated } = useAuth();

  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  function formatDuration(seconds: number | null): string {
    if (!seconds) return "--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const handleDelete = async () => {
    if (!recording) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete this recording?",
    );
    if (!confirmed) return;
    try {
      setIsDeleting(true);
      await deleteRecording(recording.id);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete recording", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const openScreenshotUpload = () => {
    if (!recording) return;
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        resourceType: "image",
        maxFiles: 1,
      },
      async (_error: unknown, result: CloudinaryResult) => {
        if (result?.event === "success") {
          const updatedRequest = {
            title: recording.title,
            recordedAt: recording.recordedAt,
            mediaType: recording.mediaType,
            audioUrl: recording.audioUrl,
            videoUrl: recording.videoUrl,
            cloudinaryPublicId: recording.cloudinaryPublicId,
            gearUsed: recording.gearUsed,
            notes: recording.notes,
            tags: recording.tags,
            duration: recording.duration,
            tuning: recording.tuning,
            key: recording.key,
            ampSimScreenshotUrl: result.info.secure_url,
          };
          await updateRecording(recording.id, updatedRequest);
          setRecording((prev) =>
            prev
              ? {
                  ...prev,
                  ampSimScreenshotUrl: result.info.secure_url,
                }
              : prev,
          );
        }
      },
    );
    widget.open();
  };

  useEffect(() => {
    const fetchRecordingById = async () => {
      try {
        const recordingData = await getRecordingById(Number(id));
        setRecording(recordingData);
      } catch (error) {
        setError("Failed to load recording data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecordingById();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner page="Recording Detail" />;
  }

  if (error) {
    return (
      <div className="flex flex-col bg-[#0b0b0c] min-h-screen">
        <p className="flex justify-center text-red-500 text-2xl mt-20">
          {error}
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#0b0b0c] py-12 px-10 gap-6">
      {/* back button + title above the grid */}
      <div className="flex flex-col gap-6">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="flex items-center bg-transparent border-[#ff6b35] text-[#ff6b35] hover:bg-[#ff6b35]/10 hover:text-[#ff6b35] hover:cursor-pointer uppercase tracking-widest text-xs gap-1.5 w-fit"
        >
          <ChevronLeft size={13} />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-white text-4xl tracking-wide">
            {recording?.title}
          </h1>
          <p className="text-xs text-[#76766f] mt-1">
            {recording ? formatDate(recording.recordedAt) : ""}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* left side media player, notes, and admin modifiction buttons */}
        <div className="col-span-2 flex flex-col gap-6">
          {recording?.mediaType === "VIDEO" ||
          recording?.mediaType === "BOTH" ? (
            <video
              src={recording.videoUrl ?? undefined}
              controls
              className="w-full aspect-video border border-[#76766f] bg-black"
            />
          ) : null}
          {recording?.mediaType === "AUDIO" ||
          recording?.mediaType === "BOTH" ? (
            <audio
              src={recording.audioUrl ?? undefined}
              controls
              className="w-full"
              style={{ colorScheme: "dark" }}
            />
          ) : null}
          {recording?.notes && (
            <div className="mt-12">
              <p className="text-[#959592] text-sm">Notes by Josh</p>
              <p className="text-white text-lg mt-4 leading-tight">
                {recording.notes}
              </p>
            </div>
          )}
          {isAuthenticated && (
            <div className="flex gap-3 pt-4 border-t border-[#26262c]">
              <Button
                onClick={() => navigate(`/admin/edit/${recording?.id}`)}
                className="border-[#26262c] text-[#76766f] bg-transparent text-xs uppercase tracking-widest hover:cursor-pointer"
              >
                <Pencil size={13} />
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-900/30 text-red-400 border border-red-900 hover:bg-red-900/50 text-xs uppercase tracking-widest hover:cursor-pointer"
              >
                <Trash2 size={13} />
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          )}
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          {/* right side top session card */}
          <div className="bg-[#111113] border border-[#26262c] flex flex-col px-4 py-3 gap-4">
            <p className="text-[#76766f] text-sm">Session Log</p>
            <div className="flex justify-between">
              <p className="text-[#76766f] text-sm">Recorded Date</p>
              <p className="text-white text-sm">
                {formatDate(String(recording?.recordedAt))}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#76766f] text-sm">Tuning</p>
              <p className="text-white text-sm">{recording?.tuning || "-"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#76766f] text-sm">Key</p>
              <p className="text-white text-sm">{recording?.key || "-"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#76766f] text-sm">Duration</p>
              <p className="text-white text-sm">
                {formatDuration(recording?.duration ?? null)}
              </p>
            </div>
            {recording?.tags && (
              <div className="flex flex-wrap gap-2 pt-2">
                {recording.tags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 border bg-transparent border-[#ff6b35] text-[#ff6b35] rounded-sm uppercase tracking-widest"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* right side middle gear card */}
          {recording?.gearUsed && (
            <div className="bg-[#111113] border border-[#26262c] flex flex-col px-4 py-3 gap-4">
              <p className="text-[#76766f] text-sm">Gear Used</p>
              <ul className="flex flex-col gap-2">
                {recording.gearUsed.split(",").map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-white"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#ff6b35] shrink-0" />
                    {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* right side bottom amp sim card/screenshot */}
          <div className="bg-[#111113] border border-[#26262c] flex flex-col px-4 py-3 gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[#76766f] text-sm">Amp Sim Screenshot</p>
              {isAuthenticated && (
                <button
                  onClick={openScreenshotUpload}
                  className="text-[10px] text-[#ff6b35] hover:cursor-pointer uppercase tracking-widest hover:text-[#ff6b35]/70 transition-colors"  
                >
                  {recording?.ampSimScreenshotUrl ? 'Replace' : 'Upload'}
                </button>
              )}
            </div>
            {recording?.ampSimScreenshotUrl ? (
              <img
                src={recording.ampSimScreenshotUrl}
                alt="Amp sim screenshot"
                className="w-full rounded-sm border border-[#26262c]"
              />
            ) : (
              <p className="text-sm text-[#4a4a4f] text-center">
                {isAuthenticated ? 'Upload an amp sim screenshot' : 'No amp sim screenshot uploaded'}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
