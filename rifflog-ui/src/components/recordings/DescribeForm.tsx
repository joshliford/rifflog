import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface DescribeFormProps {
  formData: {
    title: string;
    recordedAt: string;
    tuning: string;
    key: string;
    selectedGear: string[];
    selectedTags: string[];
    customTag: string;
    notes: string;
  };
  onFieldChange: (field: string, value: string) => void;
  onTagToggle: (tag: string) => void;
  onGearToggle: (gear: string) => void;
  onCustomTagAdd: () => void;
}

const GEAR_PRESETS = [
  "2025 PRS Custom 24",
  "1997 MIJ Fender 60s Strat Reissue",
  "2014 Taylor 214ce",
  "Chorus",
  "Reverb",
  "Overdrive",
  "Boost/Compressor",
  "Delay",
  "Neural DSP: Mayer",
  "Neural DSP: Nolly X",
  "Neural DSP: Mesa Boogie",
];

const TAG_PRESETS = [
  "BLUES",
  "COVER",
  "ACOUSTIC",
  "PRACTICE",
  "RIFF",
  "ORIGINAL",
  "ROCK",
  "METAL",
  "CLEAN",
  "HEAVY",
  "RHYTHM",
  "LEAD",
];

const inputClass =
  "bg-[#111113] border border-[#26262c] text-white px-3 py-2 rounded-sm text-sm placeholder:text-[#4a4a4f] focus:outline-none focus:border-[#ff6b35]";

export default function DescribeForm({
  formData,
  onFieldChange,
  onTagToggle,
  onGearToggle,
  onCustomTagAdd,
}: DescribeFormProps) {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-xs text-[#76766f] uppercase tracking-widest border-b border-[#26262c] pb-4">
        Describe the take
      </p>

      {/* Row 1: Title · Tuning · Key */}
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 flex flex-col gap-2">
          <Label className="text-xs text-[#76766f] uppercase tracking-widest">Title</Label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => onFieldChange("title", e.target.value)}
            placeholder="SRV Blues - Take 2..."
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-xs text-[#76766f] uppercase tracking-widest">Tuning</Label>
          <Input
            type="text"
            value={formData.tuning}
            onChange={(e) => onFieldChange("tuning", e.target.value)}
            placeholder="E Standard"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-xs text-[#76766f] uppercase tracking-widest">Key</Label>
          <Input
            type="text"
            value={formData.key}
            onChange={(e) => onFieldChange("key", e.target.value)}
            placeholder="Em"
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2: Date Recorded */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#76766f] uppercase tracking-widest">Date Recorded</label>
        <input
          type="date"
          value={formData.recordedAt}
          onChange={(e) => onFieldChange("recordedAt", e.target.value)}
          style={{ colorScheme: 'dark' }}
          className={`${inputClass} w-48`}
        />
      </div>

      {/* Row 3: Notes, Tags, and Gear */}
      <div className="grid grid-cols-3 gap-8">
        {/* Notes */}
        <div className="flex flex-col gap-2">
          <Label className="text-xs text-[#76766f] uppercase tracking-widest">Notes</Label>
          <textarea
            value={formData.notes}
            onChange={(e) => onFieldChange("notes", e.target.value)}
            placeholder="What were you going for? What worked? What didn't?..."
            rows={10}
            className={`${inputClass} resize-none w-full`}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-3">
          <Label className="text-xs text-[#76766f] uppercase tracking-widest">Tags</Label>
          <div className="flex flex-wrap gap-2">
            {[
              ...TAG_PRESETS,
              ...formData.selectedTags.filter((t) => !TAG_PRESETS.includes(t)),
            ].map((tag) => {
              const isSelected = formData.selectedTags.includes(tag);
              return (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  onClick={() => onTagToggle(tag)}
                  className={`text-xs px-3 py-1.5 rounded-sm border uppercase tracking-widest transition-colors cursor-pointer ${
                    isSelected
                      ? "border-[#ff6b35] text-[#ff6b35] bg-[#ff6b35]/10 hover:bg-[#ff6b35]/10 hover:text-[#ff6b35]"
                      : "border-[#26262c] bg-transparent text-[#76766f] hover:border-[#76766f] hover:text-[#b8b7b3] hover:bg-transparent"
                  }`}
                >
                  {tag}
                </Button>
              );
            })}
          </div>
          <div className="flex gap-2 items-center mt-1">
            <Input
              type="text"
              value={formData.customTag}
              onChange={(e) => onFieldChange("customTag", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onCustomTagAdd()}
              placeholder="Add a custom tag..."
              className={`flex-1 ${inputClass} text-xs`}
            />
            <Button
              onClick={onCustomTagAdd}
              variant="outline"
              size="sm"
              className="text-xs px-3 border border-[#26262c] bg-transparent text-[#76766f] rounded-sm hover:border-[#ff6b35] hover:text-[#ff6b35] hover:bg-transparent transition-colors uppercase tracking-widest cursor-pointer"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Gear Used */}
        <div className="flex flex-col gap-3">
          <Label className="text-xs text-[#76766f] uppercase tracking-widest">Gear Used</Label>
          <div className="flex flex-col gap-3">
            {GEAR_PRESETS.map((gear) => {
              const isSelected = formData.selectedGear.includes(gear);
              return (
                <label
                  key={gear}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onGearToggle(gear)}
                    className="w-4 h-4 rounded-sm border border-[#26262c] bg-[#111113] accent-[#ff6b35] cursor-pointer shrink-0"
                  />
                  <span
                    className={`text-sm transition-colors ${
                      isSelected
                        ? "text-white"
                        : "text-[#76766f] group-hover:text-[#b8b7b3]"
                    }`}
                  >
                    {gear}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}