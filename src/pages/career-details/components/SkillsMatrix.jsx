import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillsMatrix = ({ skills }) => {
  const getSkillColor = (level) => {
    if (level >= 80) return 'text-success';
    if (level >= 50) return 'text-warning';
    return 'text-error';
  };

  const getSkillBgColor = (level) => {
    if (level >= 80) return 'bg-success';
    if (level >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const getSkillStatus = (current, required) => {
    const gap = required - current;
    if (gap <= 0) return { status: 'Proficient', icon: 'CheckCircle', color: 'text-success' };
    if (gap <= 20) return { status: 'Developing', icon: 'Clock', color: 'text-warning' };
    return { status: 'Needs Development', icon: 'AlertCircle', color: 'text-error' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Skills Assessment</h2>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Proficient</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Developing</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-muted-foreground">Gap</span>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {skills?.map((skill, index) => {
          const skillInfo = getSkillStatus(skill?.currentLevel, skill?.requiredLevel);
          return (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-foreground">{skill?.name}</h3>
                  <div className={`flex items-center space-x-1 ${skillInfo?.color}`}>
                    <Icon name={skillInfo?.icon} size={16} />
                    <span className="text-sm font-medium">{skillInfo?.status}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {skill?.currentLevel}% / {skill?.requiredLevel}%
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Level</span>
                  <span className={getSkillColor(skill?.currentLevel)}>{skill?.currentLevel}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getSkillBgColor(skill?.currentLevel)}`}
                    style={{ width: `${skill?.currentLevel}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm mt-3">
                  <span className="text-muted-foreground">Required Level</span>
                  <span className="text-foreground">{skill?.requiredLevel}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${skill?.requiredLevel}%` }}
                  />
                </div>
              </div>
              {skill?.learningResources && skill?.learningResources?.length > 0 && (
                <div className="pt-3 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-2">Recommended Learning:</p>
                  <div className="flex flex-wrap gap-2">
                    {skill?.learningResources?.map((resource, resourceIndex) => (
                      <a
                        key={resourceIndex}
                        href={resource?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs hover:bg-primary/20 transition-soft"
                      >
                        <Icon name="ExternalLink" size={12} />
                        <span>{resource?.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Lightbulb" size={20} className="text-warning" />
            <h3 className="font-medium text-foreground">Skill Development Tips</h3>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Focus on skills with the largest gaps first for maximum impact</li>
            <li>• Practice hands-on projects to reinforce theoretical knowledge</li>
            <li>• Join online communities and forums related to your target skills</li>
            <li>• Consider mentorship or coaching for accelerated learning</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillsMatrix;