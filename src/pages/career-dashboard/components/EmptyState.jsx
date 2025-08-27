import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'no-recommendations' }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-recommendations':
        return {
          icon: 'Target',
          title: 'No Career Recommendations Yet',
          description: 'Complete your profile to get personalized AI-powered career recommendations tailored to your skills and interests.',
          actionText: 'Complete Profile',
          actionLink: '/profile-setup',
          secondaryText: 'Chat with AI',
          secondaryLink: '/ai-chat-interface'
        };
      case 'no-matches':
        return {
          icon: 'Search',
          title: 'No Matches Found',
          description: 'Try adjusting your filters or expanding your search criteria to find more career opportunities.',
          actionText: 'Clear Filters',
          actionLink: null,
          secondaryText: 'Update Profile',
          secondaryLink: '/profile-setup'
        };
      case 'profile-incomplete':
        return {
          icon: 'User',
          title: 'Profile Incomplete',
          description: 'We need more information about your skills, education, and interests to provide accurate career recommendations.',
          actionText: 'Complete Profile',
          actionLink: '/profile-setup',
          secondaryText: 'Learn More',
          secondaryLink: '/learning-roadmap'
        };
      default:
        return {
          icon: 'AlertCircle',
          title: 'Something went wrong',
          description: 'We encountered an issue loading your career recommendations. Please try again.',
          actionText: 'Retry',
          actionLink: null,
          secondaryText: 'Contact Support',
          secondaryLink: null
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name={content?.icon} size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {content?.title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {content?.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        {content?.actionLink ? (
          <Link to={content?.actionLink}>
            <Button variant="default" size="default">
              {content?.actionText}
            </Button>
          </Link>
        ) : (
          <Button variant="default" size="default" onClick={() => window.location?.reload()}>
            {content?.actionText}
          </Button>
        )}
        
        {content?.secondaryLink ? (
          <Link to={content?.secondaryLink}>
            <Button variant="outline" size="default">
              {content?.secondaryText}
            </Button>
          </Link>
        ) : (
          <Button variant="outline" size="default">
            {content?.secondaryText}
          </Button>
        )}
      </div>
      {/* Additional Help */}
      <div className="mt-8 p-4 bg-muted rounded-lg max-w-md">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-sm font-medium text-foreground mb-1">Need Help?</p>
            <p className="text-xs text-muted-foreground">
              Our AI career advisor is available 24/7 to help you explore career paths and answer questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;