import { useState } from "react";
import StepIndicator from "./StepIndicator";
import { Button } from "../ui/button";
import type { UploadedFile } from "@/types";
import DropZone from "./DropZone";
import DescribeForm from "./DescribeForm";

export default function RecordingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    recordedAt: "",
    tuning: "",
    key: "",
    notes: "",
    selectedTags: [] as string[],
    selectedGear: [] as string[],
    customTag: "",
  });

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => {
      const exists = prev.selectedTags.includes(tag);
      return {
        ...prev,
        selectedTags: exists
          ? prev.selectedTags.filter((t) => t !== tag)
          : [...prev.selectedTags, tag],
      };
    });
  };

  const handleGearToggle = (gear: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedGear: prev.selectedGear.includes(gear)
        ? prev.selectedGear.filter((g) => g !== gear)
        : [...prev.selectedGear, gear],
    }));
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomTagAdd = () => {
    const tag = formData.customTag.trim().toUpperCase();
    if (tag && !formData.selectedTags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        selectedTags: [...prev.selectedTags, tag],
        customTag: "",
      }));
    }
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const canProceed = () => {
    if (currentStep === 1) return uploadedFile !== null;
    if (currentStep === 2)
      return formData.title !== "" && formData.recordedAt !== "";
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col px-24 py-12 bg-[#0b0b0c]">
      <div className="flex flex-col px-6 py-12 gap-3">
        <p className="text-sm text-[#76766f]">New Upload</p>
        <div className="flex">
          <h4 className="text-3xl text-white font-light tracking-tight">
            Log a new take<span className="text-[#ff6b35]">.</span>
          </h4>
        </div>
      </div>
      <StepIndicator currentStep={currentStep} />
      <div className="flex-1 py-12">
        {currentStep === 1 && (
          <DropZone
            onUploadSuccess={setUploadedFile}
            uploadedFile={uploadedFile}
            onClear={() => setUploadedFile(null)}
          />
        )}
        {currentStep === 2 && (
          <DescribeForm
            formData={formData}
            onFieldChange={handleFieldChange}
            onTagToggle={handleTagToggle}
            onGearToggle={handleGearToggle}
            onCustomTagAdd={handleCustomTagAdd}
          />
        )}
        {currentStep === 3 && (
          <div className="text-[#76766f]">Step 3 - Publish</div>
        )}
      </div>
      {/* Navigation */}
      <div className="flex justify-between items-center py-6 border-t border-[#26262c]">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="border-[#26262c] bg-[#0b0b0c] text-[#76766f] hover:cursor-pointer hover:bg-[#1e1e1e] hover:text-white"
            >
              Previous Step
            </Button>
          )}
        </div>
        <div>
          {currentStep < 3 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-[#ff6b35] text-white hover:bg-[#ff6b35]/90 hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next Step
            </Button>
          ) : (
            <Button className="bg-[#ff6b35] text-white hover:bg-[#ff6b35]/90 hover:cursor-pointer">
              Publish Take
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
