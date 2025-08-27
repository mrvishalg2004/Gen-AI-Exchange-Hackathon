import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillProgressCard = ({ skill, className = '' }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const getProgressTextColor = (progress) => {
    if (progress >= 80) return 'text-success';
    if (progress >= 50) return 'text-warning';
    return 'text-error';
  };

  const getSkillLevelIcon = (level) => {
    switch (level) {
      case 'Expert': return 'Crown';
      case 'Advanced': return 'TrendingUp';
      case 'Intermediate': return 'BarChart3';
      case 'Beginner': return 'Seedling';
      default: return 'Circle';
    }
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'text-warning';
      case 'Advanced': return 'text-success';
      case 'Intermediate': return 'text-primary';
      case 'Beginner': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-medium text-foreground">{skill?.name}</h3>
            <Icon 
              name={getSkillLevelIcon(skill?.currentLevel)} 
              size={14} 
              className={getSkillLevelColor(skill?.currentLevel)}
            />
          </div>
          <p className="text-sm text-muted-foreground">{skill?.category}</p>
        </div>
        
        <div className="text-right">
          <div className={`text-sm font-semibold ${getProgressTextColor(skill?.progress)}`}>
            {skill?.progress}%
          </div>
          <div className="text-xs text-muted-foreground">
            {skill?.currentLevel}
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full h-2 bg-muted rounded-full">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(skill?.progress)}`}
            style={{ width: `${skill?.progress}%` }}
          />
        </div>
      </div>
      {/* Skill Details */}
      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Target Level:</span>
          <span className="font-medium text-foreground">{skill?.targetLevel}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Time to Target:</span>
          <span className="font-medium text-foreground">{skill?.timeToTarget}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Active Courses:</span>
          <span className="font-medium text-foreground">{skill?.activeCourses}</span>
        </div>
      </div>
      {/* Next Milestone */}
      {skill?.nextMilestone && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground">Next:</span>
            <span className="text-xs font-medium text-foreground">{skill?.nextMilestone}</span>
          </div>
        </div>
      )}
      {/* Skill Impact */}
      <div className="mt-2">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={12} className="text-accent" />
          <span className="text-xs text-muted-foreground">Career Impact:</span>
          <div className="flex">
            {[...Array(5)]?.map((_, index) => (
              <Icon 
                key={index}
                name="Star" 
                size={10} 
                className={index < skill?.careerImpact ? 'text-accent fill-current' : 'text-muted'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillProgressCard;