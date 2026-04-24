import { useEffect, useState } from "react";
import type { Recording } from "../types";
import { getAllRecordings } from "../services/recordingsService";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  }, [])

  return (
    <div className="min-h-screen bg-[#0b0b0c]">
      <p className="text-white">Dashboard</p>
    </div>
  );
}