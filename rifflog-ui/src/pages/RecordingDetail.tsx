import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  deleteRecording,
  getRecordingById,
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
    <main className="grid grid-cols-3 gap-8 min-h-screen bg-[#0b0b0c] py-12 px-10">
      {/* left side media player, notes, and admin modifiction buttons */}
      <div className="col-span-2 flex flex-col gap-6">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="flex items-center bg-[#ff6b35] hover:cursor-pointer text-black hover:bg-[#ff6b35]/90 uppercase tracking-widest text-xs gap-2 border-none w-fit"
        >
          <ChevronLeft size={14} />
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
        {recording?.mediaType === 'VIDEO' || recording?.mediaType === 'BOTH' ? (
          <video
            src={recording.videoUrl ?? undefined}
            controls
            className="w-full border border-[#76766f] bg-black"
          />
        ) : null}
        {recording?.mediaType === 'AUDIO' || recording?.mediaType === 'BOTH' ? (
          <audio
            src={recording.audioUrl ?? undefined}
            controls
            className="w-full"
            style={{ colorScheme: 'dark' }}
          />
        ) : null}
        {recording?.notes && (
          <div className="mt-12">
            <p className="text-[#959592] text-sm">Notes by Josh</p>
            <p className="text-white text-lg mt-4 leading-tight">{recording.notes}</p>
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
                {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
        </div>
    )}
      </div>

      <div className="col-span-1 flex flex-col gap-4">
        {/* right side top session card */}
        <div></div>

        {/* right side middle gear card */}
        <div></div>

        {/* right side bottom amp sim card/screenshot */}
        <div></div>
      </div>
    </main>
  );
}
