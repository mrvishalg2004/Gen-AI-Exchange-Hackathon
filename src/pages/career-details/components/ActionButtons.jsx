import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ career, onSave, onCompare, onStartLearning }) => {
  const [isSaved, setIsSaved] = useState(career?.isSaved || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(career?.id);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Error saving career:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${career?.title} - Career Details`,
          text: `Check out this career path: ${career?.title}`,
          url: window.location?.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard?.writeText(window.location?.href);
        // You could show a toast notification here
        console.log('Link copied to clipboard');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Button
            variant="default"
            size="lg"
            iconName="Play"
            iconPosition="left"
            onClick={onStartLearning}
            className="flex-1 sm:flex-none"
          >
            Start Learning Path
          </Button>

          <Button
            variant={isSaved ? "default" : "outline"}
            size="lg"
            iconName={isSaved ? "BookmarkCheck" : "Bookmark"}
            iconPosition="left"
            onClick={handleSave}
            loading={isLoading}
            className="flex-1 sm:flex-none"
          >
            {isSaved ? 'Saved' : 'Save Career'}
          </Button>

          <Button
            variant="outline"
            size="lg"
            iconName="GitCompare"
            iconPosition="left"
            onClick={onCompare}
            className="flex-1 sm:flex-none"
          >
            Compare
          </Button>
        </div>

        {/* Secondary Actions */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="lg"
            iconName="Share"
            onClick={handleShare}
            className="px-3"
          />
          
          <Button
            variant="ghost"
            size="lg"
            iconName="Download"
            onClick={() => {
              // Handle export functionality
              console.log('Exporting career roadmap...');
            }}
            className="px-3"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">2,847</span>
            </div>
            <p className="text-xs text-muted-foreground">People interested</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="BookOpen" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">12</span>
            </div>
            <p className="text-xs text-muted-foreground">Learning resources</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">6-8 months</span>
            </div>
            <p className="text-xs text-muted-foreground">Avg. preparation</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Icon name="Star" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">4.2/5</span>
            </div>
            <p className="text-xs text-muted-foreground">Satisfaction rating</p>
          </div>
        </div>
      </div>

      {/* Call to Action Message */}
      <div className="mt-4 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Ready to get started?</h4>
            <p className="text-sm text-muted-foreground">
              Begin your learning journey with our AI-powered recommendations and track your progress towards your career goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;