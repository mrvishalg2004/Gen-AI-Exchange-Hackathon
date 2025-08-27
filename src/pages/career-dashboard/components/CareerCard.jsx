import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerCard = ({ career, onBookmark, onCompare, isBookmarked = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getMatchBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success/10 border-success/20';
    if (percentage >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(salary);
  };

  const handleBookmark = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onBookmark(career?.id);
  };

  const handleCompare = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onCompare(career?.id);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-soft-hover transition-soft overflow-hidden">
      {/* Card Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">
              {career?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{career?.industry}</p>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold text-primary">
                {formatSalary(career?.averageSalary)}
              </span>
              <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getMatchBgColor(career?.matchPercentage)}`}>
                <span className={getMatchColor(career?.matchPercentage)}>
                  {career?.matchPercentage}% Match
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 ml-3">
            <Button
              variant="ghost"
              size="sm"
              iconName={isBookmarked ? "Bookmark" : "BookmarkPlus"}
              iconSize={16}
              onClick={handleBookmark}
              className={`${isBookmarked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="GitCompare"
              iconSize={16}
              onClick={handleCompare}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>

        {/* Skills Preview */}
        <div className="space-y-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Required Skills</p>
            <div className="flex flex-wrap gap-1">
              {career?.requiredSkills?.slice(0, 3)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
              {career?.requiredSkills?.length > 3 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                  +{career?.requiredSkills?.length - 3} more
                </span>
              )}
            </div>
          </div>

          {career?.missingSkills?.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Skills to Learn</p>
              <div className="flex flex-wrap gap-1">
                {career?.missingSkills?.slice(0, 2)?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-md"
                  >
                    {skill}
                  </span>
                ))}
                {career?.missingSkills?.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                    +{career?.missingSkills?.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Expandable Details */}
      {isExpanded && (
        <div className="px-4 pb-3 border-t border-border animate-slide-up">
          <div className="pt-3 space-y-3">
            {/* Market Demand */}
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Market Demand</p>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="h-2 bg-success rounded-full transition-all duration-500"
                    style={{ width: `${career?.marketDemand}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">{career?.marketDemand}%</span>
              </div>
            </div>

            {/* Growth Projection */}
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Growth Projection</p>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm text-foreground">{career?.growthProjection}</span>
              </div>
            </div>

            {/* All Required Skills */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">All Required Skills</p>
              <div className="flex flex-wrap gap-1">
                {career?.requiredSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning Resources */}
            {career?.learningResources?.length > 0 && (
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Learning Resources</p>
                <div className="space-y-2">
                  {career?.learningResources?.slice(0, 2)?.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                      <div className="flex items-center space-x-2">
                        <Icon name="BookOpen" size={14} className="text-primary" />
                        <span className="text-sm text-foreground">{resource?.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="ExternalLink"
                        iconSize={12}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Card Footer */}
      <div className="p-4 pt-0 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isExpanded ? 'Less Details' : 'View Details'}
        </Button>
        
        <Link to={`/career-details?id=${career?.id}`}>
          <Button variant="default" size="sm">
            Explore Path
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CareerCard;