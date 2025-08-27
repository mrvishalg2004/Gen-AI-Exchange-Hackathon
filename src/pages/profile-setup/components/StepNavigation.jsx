import React from 'react';
import Button from '../../../components/ui/Button';


const StepNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onComplete,
  isNextDisabled = false,
  isCompleting = false 
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-border">
      <div className="flex items-center space-x-4">
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onPrevious}
            iconName="ChevronLeft"
            iconPosition="left"
            iconSize={16}
          >
            Previous
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <div className="flex space-x-1">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-soft ${
                index + 1 <= currentStep
                  ? 'bg-primary' :'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {isLastStep ? (
          <Button
            variant="default"
            onClick={onComplete}
            disabled={isNextDisabled || isCompleting}
            loading={isCompleting}
            iconName="Check"
            iconPosition="left"
            iconSize={16}
          >
            {isCompleting ? 'Completing...' : 'Complete Profile'}
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={onNext}
            disabled={isNextDisabled}
            iconName="ChevronRight"
            iconPosition="right"
            iconSize={16}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepNavigation;