import "./stepper.css";
import { useState } from "react";

// Move steps outside component to avoid recreation on each render
const STEPS = [
  {
    id: 1,
    label: "Personal Info",
    content: <div>Personal Information Content</div>,
  },
  {
    id: 2,
    label: "Account Info", 
    content: <div>Account Info Content</div>,
  },
  {
    id: 3,
    label: "Payment",
    content: <div>Payment Content</div>,
  },
  {
    id: 4,
    label: "Confirmation",
    content: <div>Confirmation Content</div>,
  },
  {
    id: 5,
    label: "Review",
    content: <div>Review Content</div>,
  },
] as const;

function Stepper() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
  };

  const isStepActive = (stepIndex: number) => currentStepIndex >= stepIndex;
  const isStepCurrent = (stepIndex: number) => currentStepIndex === stepIndex;

  return (
    <div className="stepper-container">
      <div className="stepper">
        {/* Step Navigation */}
        <div className="step-navigation">
          {STEPS.map((step, index) => (
            <div key={step.id} className="step-item">
              <div
                className={`step-number ${isStepActive(index) ? "active" : ""} ${
                  isStepCurrent(index) ? "current" : ""
                }`}
                onClick={() => handleStepClick(index)}
                role="button"
                tabIndex={0}
                aria-label={`Go to step ${step.id}: ${step.label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleStepClick(index);
                  }
                }}
              >
                {step.id}
              </div>
              
              {/* Connecting Line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`step-line ${isStepActive(index) ? "active" : ""}`}
                />
              )}
              
              {/* Step Label */}
              <div
                className={`step-label ${isStepCurrent(index) ? "active" : ""}`}
                onClick={() => handleStepClick(index)}
                role="button"
                tabIndex={0}
                aria-label={`Go to step ${step.id}: ${step.label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleStepClick(index);
                  }
                }}
              >
                {step.label}
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="step-content-container">
          {STEPS[currentStepIndex]?.content}
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          <button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
            aria-label="Go to previous step"
          >
            Previous
          </button>
          <button
            className="nav-button next-button"
            onClick={handleNext}
            disabled={currentStepIndex === STEPS.length - 1}
            aria-label="Go to next step"
          >
            {currentStepIndex === STEPS.length - 1 ? "Complete" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stepper;