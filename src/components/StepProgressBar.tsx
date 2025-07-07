
import React from 'react';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep, totalSteps, onStepClick }) => {
  const handleStepClick = (stepNumber: number) => {
    if (onStepClick) {
      onStepClick(stepNumber);
    }
  };

  return (
    <div className="mb-6 w-full">
      <div className="text-sm text-gray-600 mb-2">
        Step {currentStep} of {totalSteps}
      </div>
      <div className="flex w-full items-center">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div
                onClick={() => handleStepClick(stepNumber)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold text-white cursor-pointer transition-all hover:opacity-90 z-10
                  ${isActive
                    ? 'bg-blue-600'
                    : isCompleted
                    ? 'bg-green-600'
                    : 'bg-gray-400'
                  }
                `}
              >
                <span className="relative z-10 font-bold text-xs">{stepNumber}</span>
              </div>
              {stepNumber < totalSteps && (
                <div 
                  className={`flex-1 h-1 mx-1 rounded-full
                    ${stepNumber < currentStep ? 'bg-green-600' : 'bg-gray-300'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgressBar;
