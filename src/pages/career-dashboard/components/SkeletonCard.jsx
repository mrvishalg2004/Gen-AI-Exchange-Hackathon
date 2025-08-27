import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden animate-pulse">
      {/* Card Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
            <div className="flex items-center space-x-4">
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-16"></div>
            </div>
          </div>
          <div className="flex items-center space-x-1 ml-3">
            <div className="w-8 h-8 bg-muted rounded"></div>
            <div className="w-8 h-8 bg-muted rounded"></div>
          </div>
        </div>

        {/* Skills Preview */}
        <div className="space-y-2">
          <div>
            <div className="h-3 bg-muted rounded mb-1 w-20"></div>
            <div className="flex flex-wrap gap-1">
              <div className="h-6 bg-muted rounded w-16"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-6 bg-muted rounded w-14"></div>
            </div>
          </div>

          <div>
            <div className="h-3 bg-muted rounded mb-1 w-24"></div>
            <div className="flex flex-wrap gap-1">
              <div className="h-6 bg-muted rounded w-18"></div>
              <div className="h-6 bg-muted rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 pt-0 flex items-center justify-between">
        <div className="h-8 bg-muted rounded w-24"></div>
        <div className="h-8 bg-muted rounded w-20"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;