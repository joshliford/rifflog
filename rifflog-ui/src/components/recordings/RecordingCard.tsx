import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Clock, Guitar, Tag, Video } from "lucide-react";
import type { Recording } from "../../types";

function formatDuration(seconds: number | null): string {
  if (!seconds) return "--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function RecordingCard({ recording }: { recording: Recording }) {
  const tags = recording.tags
    ? recording.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <Link to={`/recordings/${recording.id}`}>
      <Card className="bg-[#111113] border-[#26262c] hover:border-[#ff6b35]/50 transition-colors cursor-pointer group">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-white text-base font-semibold leading-snug group-hover:text-[#ff6b35] transition-colors">
              {recording.title}
            </CardTitle>
            <span className="shrink-0 text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#26262c] text-[#76766f]">
              {recording.mediaType}
            </span>
          </div>
          <p className="text-xs text-[#76766f]">{formatDate(recording.recordedAt)}</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          {recording.gearUsed && (
            <div className="flex items-center gap-1.5 text-xs text-[#b8b7b3]">
              <Guitar size={12} className="text-[#76766f] shrink-0" />
              <span className="truncate">{recording.gearUsed}</span>
            </div>
          )}

          {recording.duration !== null && (
            <div className="flex items-center gap-1.5 text-xs text-[#b8b7b3]">
              <Clock size={12} className="text-[#76766f] shrink-0" />
              <span>{formatDuration(recording.duration)}</span>
            </div>
          )}

          {recording.notes && (
            <p className="text-xs text-[#76766f] line-clamp-2 mt-1">{recording.notes}</p>
          )}

          {tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap mt-1">
              <Tag size={11} className="text-[#76766f] shrink-0" />
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a1e] border border-[#26262c] text-[#76766f]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {(recording.audioUrl || recording.videoUrl) && (
            <div className="flex items-center gap-1.5 mt-1">
              <Video size={12} className="text-[#ff6b35] shrink-0" />
              <span className="text-[10px] text-[#ff6b35]">Media attached</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}