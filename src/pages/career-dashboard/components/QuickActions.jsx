import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ selectedCareers, onExportRoadmap, onCompareSelected, onRefreshRecommendations }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExportRoadmap();
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefreshRecommendations();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-primary" />
          <h3 className="font-medium text-foreground">Quick Actions</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
          iconSize={16}
          loading={isRefreshing}
          onClick={handleRefresh}
          className="text-muted-foreground hover:text-foreground"
        >
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Compare Careers */}
        <Button
          variant="outline"
          size="sm"
          iconName="GitCompare"
          iconPosition="left"
          iconSize={16}
          onClick={onCompareSelected}
          disabled={selectedCareers?.length < 2}
          className="justify-start"
        >
          <span className="flex-1 text-left">
            Compare ({selectedCareers?.length})
          </span>
        </Button>

        {/* Export Roadmap */}
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          iconSize={16}
          loading={isExporting}
          onClick={handleExport}
          disabled={selectedCareers?.length === 0}
          className="justify-start"
        >
          <span className="flex-1 text-left">
            Export Roadmap
          </span>
        </Button>

        {/* View Bookmarks */}
        <Button
          variant="outline"
          size="sm"
          iconName="Bookmark"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          <span className="flex-1 text-left">
            View Bookmarks
          </span>
        </Button>

        {/* Learning Progress */}
        <Button
          variant="outline"
          size="sm"
          iconName="BookOpen"
          iconPosition="left"
          iconSize={16}
          className="justify-start"
        >
          <span className="flex-1 text-left">
            Learning Progress
          </span>
        </Button>
      </div>
      {/* Action Descriptions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
            <p>Select multiple careers to compare skills, salaries, and growth potential side by side.</p>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
            <p>Export personalized learning roadmaps as PDF to track your career development journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;