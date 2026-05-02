import { Button } from "@/components/ui/button";
import type { RigPhoto } from "@/types";
import { X } from "lucide-react";
import { useState } from "react";

const CATEGORY_PRESETS = [
  "Guitars",
  "Electric",
  "Acoustic",
  "Basses",
  "Amps",
  "Pedals",
  "Plugins",
  "Audio Interface",
  "Other",
];

interface RigEditModalProps {
  photo: RigPhoto;
  onSubmit: (categories: string[], description: string) => void;
  onClose: () => void;
}

export default function RigEditModal({
  photo,
  onSubmit,
  onClose,
}: RigEditModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    photo.category ? photo.category.split(",").map((c) => c.trim()) : [],
  );
  const [description, setDescription] = useState(photo.description ?? "");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#111113] border border-[#26262c] p-6 w-full max-w-sm flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-sm uppercase tracking-widest">
            Edit Photo
          </h2>
          <button
            onClick={onClose}
            className="text-[#76766f] hover:text-white hover:cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[#76766f] text-xs uppercase tracking-widest">
            Categories
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_PRESETS.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`text-xs px-2 py-1 border uppercase tracking-widest transition-colors hover:cursor-pointer ${
                  selectedCategories.includes(cat)
                    ? "border-[#ff6b35] text-[#ff6b35] bg-[#ff6b35]/10"
                    : "border-[#26262c] text-[#76766f] bg-transparent hover:border-[#ff6b35] hover:text-[#ff6b35]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[#76766f] text-xs uppercase tracking-widest">
            Description
          </p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. 2019 Gibson Les Paul Standard"
            rows={4}
            className="bg-transparent border border-[#26262c] text-white text-sm px-3 py-2 outline-none placeholder:text-[#4a4a4f] focus:border-[#ff6b35] transition-colors resize-y"
          />
        </div>

        <Button
          onClick={() => onSubmit(selectedCategories, description)}
          variant="outline"
          size="sm"
          className="border-[#ff6b35] text-[#ff6b35] bg-transparent hover:bg-[#ff6b35]/10 hover:text-[#ff6b35] hover:cursor-pointer uppercase tracking-widest text-xs w-full mt-1"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
