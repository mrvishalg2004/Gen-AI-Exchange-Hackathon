import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressHeader = ({ currentStep, totalSteps, stepTitles }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-card border-b border-border sticky top-16 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold text-foreground">Profile Setup</h1>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="hidden md:flex items-center justify-between">
          {stepTitles?.map((title, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={stepNumber} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-soft ${
                      isCompleted
                        ? 'bg-success text-success-foreground'
                        : isCurrent
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center max-w-20 ${
                      isCurrent
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {title}
                  </span>
                </div>
                {index < stepTitles?.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-4 transition-soft ${
                      isCompleted
                        ? 'bg-success' :'bg-muted'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Step Indicator */}
        <div className="md:hidden flex items-center justify-center space-x-2">
          <Icon name="User" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            {stepTitles?.[currentStep - 1]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;