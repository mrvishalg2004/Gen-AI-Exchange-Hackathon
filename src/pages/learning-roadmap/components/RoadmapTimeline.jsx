import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const RoadmapTimeline = ({ roadmapData, selectedCareer, onMilestoneClick }) => {
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  const toggleMilestone = (milestoneId) => {
    setExpandedMilestone(expandedMilestone === milestoneId ? null : milestoneId);
    if (onMilestoneClick) {
      onMilestoneClick(milestoneId);
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-success';
    if (progress > 0) return 'bg-warning';
    return 'bg-muted';
  };

  const getProgressTextColor = (progress) => {
    if (progress === 100) return 'text-success';
    if (progress > 0) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
      <div className="space-y-6">
        {roadmapData?.milestones?.map((milestone, index) => (
          <div key={milestone?.id} className="relative">
            {/* Timeline Node */}
            <div className="hidden md:flex absolute left-0 w-12 h-12 items-center justify-center">
              <div className={`w-8 h-8 rounded-full border-2 border-background flex items-center justify-center ${getProgressColor(milestone?.progress)}`}>
                {milestone?.progress === 100 ? (
                  <Icon name="Check" size={16} color="white" />
                ) : (
                  <span className="text-xs font-medium text-white">
                    {index + 1}
                  </span>
                )}
              </div>
            </div>

            {/* Milestone Content */}
            <div className="md:ml-16 bg-card border border-border rounded-lg overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-muted/50 transition-soft"
                onClick={() => toggleMilestone(milestone?.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-foreground">{milestone?.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(milestone?.difficulty)}`}>
                        {milestone?.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {milestone?.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{milestone?.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Target" size={12} />
                        <span>Impact: {milestone?.skillImpact}/10</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="BookOpen" size={12} />
                        <span>{milestone?.courses?.length} courses</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getProgressTextColor(milestone?.progress)}`}>
                        {milestone?.progress}%
                      </div>
                      <div className="w-16 h-2 bg-muted rounded-full mt-1">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${getProgressColor(milestone?.progress)}`}
                          style={{ width: `${milestone?.progress}%` }}
                        />
                      </div>
                    </div>
                    <Icon 
                      name={expandedMilestone === milestone?.id ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedMilestone === milestone?.id && (
                <div className="border-t border-border bg-muted/30 p-4 animate-slide-up">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Skills You'll Learn</h4>
                      <div className="flex flex-wrap gap-2">
                        {milestone?.skills?.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Prerequisites</h4>
                      <div className="flex flex-wrap gap-2">
                        {milestone?.prerequisites?.map((prereq, prereqIndex) => (
                          <span 
                            key={prereqIndex}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md border"
                          >
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;