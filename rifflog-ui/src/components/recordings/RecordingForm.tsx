import { useEffect, useState } from "react";
import StepIndicator from "./StepIndicator";
import { Button } from "../ui/button";
import type { RecordingRequest, UploadedFile } from "@/types";
import DropZone from "./DropZone";
import DescribeForm from "./DescribeForm";
import {
  createRecording,
  getRecordingById,
  updateRecording,
} from "@/services/recordingsService";
import { useNavigate, useParams } from "react-router-dom";
import PublishStep from "./PublishStep";

export default function RecordingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const editMode = !!id;

  useEffect(() => {
    if (!editMode) return;
    const fetchRecording = async () => {
      try {
        const recordingData = await getRecordingById(Number(id));
        setFormData({
          title: recordingData.title,
          recordedAt: recordingData.recordedAt,
          tuning: recordingData.tuning || "",
          key: recordingData.key || "",
          notes: recordingData.notes || "",
          selectedTags: recordingData.tags
            ? recordingData.tags.split(",").map((tag) => tag.trim())
            : [],
          selectedGear: recordingData.gearUsed
            ? recordingData.gearUsed.split(",").map((item) => item.trim())
            : [],
          customTag: "",
        });
        setUploadedFile({
          url: recordingData.audioUrl || recordingData.videoUrl || "",
          publicId: recordingData.cloudinaryPublicId || "",
          duration: recordingData.duration,
          resourceType: recordingData.mediaType === "VIDEO" ? "video" : "audio",
        });
        setCurrentStep(2);
      } catch (error) {
        console.error("Failed to load recording", error);
      }
    };
    fetchRecording();
  }, [id]);

  const handleUploadSuccess = (file: UploadedFile) => {
    if (file.resourceType === "image") {
      navigate("/rig", { state: { uploadedImage: file } });
      return;
    }
    setUploadedFile(file);
  };

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

  const handleSubmit = async () => {
    if (!uploadedFile) return;

    const mediaType = uploadedFile.resourceType === "video" ? "VIDEO" : "AUDIO";

    const request: RecordingRequest = {
      title: formData.title,
      recordedAt: formData.recordedAt,
      mediaType,
      audioUrl: uploadedFile.resourceType === "audio" ? uploadedFile.url : null,
      videoUrl: uploadedFile.resourceType === "video" ? uploadedFile.url : null,
      cloudinaryPublicId: uploadedFile.publicId,
      gearUsed: formData.selectedGear.join(", "),
      notes: formData.notes || null,
      tags: formData.selectedTags.join(", "),
      duration: uploadedFile.duration,
      tuning: formData.tuning || null,
      key: formData.key || null,
    };

    try {
      setIsSubmitting(true);
      if (editMode) {
        await updateRecording(Number(id), request);
      } else {
        await createRecording(request);
      }
      navigate("/");
    } catch (error) {
      console.error("Failed to publish recording", error);
    } finally {
      setIsSubmitting(false);
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
            {editMode
              ? "Edit take"
              : uploadedFile
                ? uploadedFile.resourceType === "video"
                  ? "Log a new video take"
                  : "Log a new audio take"
                : "Log a video or audio take"}
            <span className="text-[#ff6b35]">.</span>
          </h4>
        </div>
      </div>
      <StepIndicator currentStep={currentStep} editMode={editMode} />
      <div className="flex-1 py-12">
        {currentStep === 1 && (
          <DropZone
            onUploadSuccess={handleUploadSuccess}
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
          <PublishStep uploadedFile={uploadedFile} formData={formData} />
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
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#ff6b35] text-white hover:bg-[#ff6b35]/90 hover:cursor-pointer"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
