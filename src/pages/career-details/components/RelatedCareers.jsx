import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedCareers = ({ careers }) => {
  const getMatchPercentage = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="GitBranch" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Related Career Paths</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {careers?.map((career, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:shadow-soft-hover transition-soft">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Briefcase" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">{career?.title}</h3>
                  <p className="text-xs text-muted-foreground">{career?.category}</p>
                </div>
              </div>
              <div className={`text-xs font-medium ${getMatchPercentage(career?.matchPercentage)}`}>
                {career?.matchPercentage}% match
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Salary:</span>
                <span className="text-foreground font-medium">{career?.salaryRange}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Growth:</span>
                <span className="text-foreground font-medium">{career?.growthRate}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Overlapping Skills:</p>
              <div className="flex flex-wrap gap-1">
                {career?.overlappingSkills?.slice(0, 3)?.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {career?.overlappingSkills?.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    +{career?.overlappingSkills?.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>{career?.transitionTime}</span>
              </div>
              <Link
                to={`/career-details?career=${encodeURIComponent(career?.title)}`}
                className="text-xs text-primary hover:text-primary/80 transition-soft"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Explore more career options based on your skills and interests
        </p>
        <Button variant="outline" iconName="Search" iconPosition="left">
          Browse All Careers
        </Button>
      </div>
    </div>
  );
};

export default RelatedCareers;