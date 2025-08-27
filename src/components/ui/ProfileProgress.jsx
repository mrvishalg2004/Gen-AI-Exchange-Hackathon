import React from 'react';
import Icon from '../AppIcon';

const ProfileProgress = ({ 
  completionPercentage = 0, 
  showInHeader = false, 
  className = '' 
}) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 50) return 'text-warning';
    return 'text-error';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const getProgressMessage = (percentage) => {
    if (percentage >= 100) return 'Profile Complete';
    if (percentage >= 80) return 'Almost Done';
    if (percentage >= 50) return 'Good Progress';
    return 'Getting Started';
  };

  if (showInHeader) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="relative w-8 h-8">
          <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="16"
              cy="16"
              r="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 14}`}
              strokeDashoffset={`${2 * Math.PI * 14 * (1 - completionPercentage / 100)}`}
              className={`transition-all duration-300 ${getProgressColor(completionPercentage)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xs font-medium ${getProgressColor(completionPercentage)}`}>
              {Math.round(completionPercentage)}%
            </span>
          </div>
        </div>
        <span className="text-sm text-muted-foreground hidden sm:inline">
          Profile
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="User" size={20} className="text-primary" />
          <h3 className="font-medium text-foreground">Profile Completion</h3>
        </div>
        <span className={`text-sm font-medium ${getProgressColor(completionPercentage)}`}>
          {Math.round(completionPercentage)}%
        </span>
      </div>

      <div className="space-y-3">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ease-out ${getProgressBgColor(completionPercentage)}`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {getProgressMessage(completionPercentage)}
          </span>
          {completionPercentage < 100 && (
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>2-3 min remaining</span>
            </div>
          )}
        </div>

        {completionPercentage < 100 && (
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Complete your profile to get more accurate career recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileProgress;