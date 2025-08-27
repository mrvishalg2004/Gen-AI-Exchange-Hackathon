import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningRoadmap = ({ roadmap }) => {
  const [expandedPhase, setExpandedPhase] = useState(0);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPhaseIcon = (phase, index) => {
    if (phase?.completed) return 'CheckCircle';
    if (index === 0) return 'Play';
    return 'Circle';
  };

  const getPhaseIconColor = (phase, index) => {
    if (phase?.completed) return 'text-success';
    if (index === 0) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Map" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Learning Roadmap</h2>
        </div>
        <div className="text-sm text-muted-foreground">
          Total Duration: {roadmap?.totalDuration}
        </div>
      </div>
      <div className="space-y-4">
        {roadmap?.phases?.map((phase, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <div
              className="p-4 cursor-pointer hover:bg-muted/50 transition-soft"
              onClick={() => setExpandedPhase(expandedPhase === index ? -1 : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getPhaseIcon(phase, index)} 
                    size={20} 
                    className={getPhaseIconColor(phase, index)} 
                  />
                  <div>
                    <h3 className="font-medium text-foreground">{phase?.title}</h3>
                    <p className="text-sm text-muted-foreground">{phase?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(phase?.difficulty)}`}>
                    {phase?.difficulty}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {phase?.duration}
                  </div>
                  <Icon 
                    name={expandedPhase === index ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground" 
                  />
                </div>
              </div>

              {phase?.completed && (
                <div className="mt-2 flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-success">Completed on {phase?.completedDate}</span>
                </div>
              )}
            </div>

            {expandedPhase === index && (
              <div className="border-t border-border p-4 bg-muted/20">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Learning Objectives:</h4>
                    <ul className="space-y-1">
                      {phase?.objectives?.map((objective, objIndex) => (
                        <li key={objIndex} className="flex items-start space-x-2 text-sm">
                          <Icon name="Target" size={14} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-3">Recommended Courses:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase?.courses?.map((course, courseIndex) => (
                        <div key={courseIndex} className="bg-card border border-border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-foreground text-sm">{course?.title}</h5>
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" size={12} className="text-warning fill-current" />
                              <span className="text-xs text-muted-foreground">{course?.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{course?.provider}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Icon name="Clock" size={12} />
                              <span>{course?.duration}</span>
                            </div>
                            <a
                              href={course?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-soft"
                            >
                              <span>View Course</span>
                              <Icon name="ExternalLink" size={12} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {phase?.projects && phase?.projects?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Practice Projects:</h4>
                      <div className="space-y-2">
                        {phase?.projects?.map((project, projectIndex) => (
                          <div key={projectIndex} className="flex items-start space-x-2 text-sm">
                            <Icon name="Code" size={14} className="text-secondary mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-foreground font-medium">{project?.title}</span>
                              <p className="text-muted-foreground">{project?.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Progress: </span>
              <span className="font-medium text-foreground">
                {roadmap?.phases?.filter(p => p?.completed)?.length} of {roadmap?.phases?.length} phases
              </span>
            </div>
            <div className="w-32 bg-muted rounded-full h-2">
              <div
                className="h-2 bg-primary rounded-full transition-all duration-500"
                style={{ 
                  width: `${(roadmap?.phases?.filter(p => p?.completed)?.length / roadmap?.phases?.length) * 100}%` 
                }}
              />
            </div>
          </div>
          <Button variant="default" iconName="Play" iconPosition="left">
            Start Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap;