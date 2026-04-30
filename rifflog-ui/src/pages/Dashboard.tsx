import { useEffect, useState } from "react";
import type { Recording } from "../types";
import { getAllRecordings } from "../services/recordingsService";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import RecordingCard from "../components/recordings/RecordingCard";
import { useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchRecordingData = async () => {
      try {
        const recordingData = await getAllRecordings();
        setRecordings(recordingData);
      } catch (error) {
        setError("Failed to load recordings data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecordingData();
  }, []);

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const filteredRecordings = searchQuery
    ? recordings.filter(
        (recording) =>
          recording.title.toLowerCase().includes(searchQuery) ||
          recording.tags?.toLowerCase().includes(searchQuery) ||
          recording.gearUsed?.toLowerCase().includes(searchQuery) ||
          recording.notes?.toLowerCase().includes(searchQuery),
      )
    : recordings;

  if (isLoading) {
    return <LoadingSpinner page="Dashboard" />;
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
    <main className="min-h-screen bg-[#0b0b0c]">
      {filteredRecordings.length === 0 && recordings.length > 0 ? (
        <div className="flex justify-center px-10 py-12">
          <p className="text-gray-500">No recordings match your search.</p>
        </div>
      ) : recordings.length === 0 ? (
        <div className="flex justify-center px-10 py-12">
          <p className="text-gray-500">
            No recordings yet. Upload one to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-12">
          {filteredRecordings.map((recording) => (
            <RecordingCard key={recording.id} recording={recording} />
          ))}
        </div>
      )}
    </main>
  );
}
