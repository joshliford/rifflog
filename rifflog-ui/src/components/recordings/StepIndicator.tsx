import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  editMode: boolean;
}

const steps = [
  { number: 1, label: "CHOOSE FILES" },
  { number: 2, label: "DESCRIBE" },
  { number: 3, label: "PUBLISH" },
];

export default function StepIndicator({
  currentStep,
  editMode,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center w-full border border-[#26262c]">
      {steps.map((step) => {
        const isComplete =
          editMode && step.number === 1 ? true : currentStep > step.number;
        const isCurrent = currentStep === step.number;
        return (
          <div
            key={step.number}
            className={`flex items-center gap-3 flex-1 px-6 py-4 border-r border-[#26262c] last:border-r-0`}
          >
            {/* Badge */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                    ${isComplete || isCurrent ? "bg-[#ff6b35] text-white" : "bg-[#26262c] text-[#76766f]"}
                `}
            >
              {isComplete ? <Check size={12} /> : step.number}
            </div>
            {/* Label */}
            <span
              className={`text-xs tracking-widest font-medium uppercase
                    ${isComplete || isCurrent ? "text-white" : "text-[#76766f]"}
                `}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
