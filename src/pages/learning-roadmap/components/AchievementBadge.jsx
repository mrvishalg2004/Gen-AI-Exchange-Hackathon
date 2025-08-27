import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ achievement, isUnlocked = false, className = '' }) => {
  const getBadgeColor = (type) => {
    switch (type) {
      case 'milestone': return 'bg-primary text-primary-foreground';
      case 'streak': return 'bg-warning text-warning-foreground';
      case 'completion': return 'bg-success text-success-foreground';
      case 'skill': return 'bg-secondary text-secondary-foreground';
      case 'time': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'milestone': return 'Flag';
      case 'streak': return 'Flame';
      case 'completion': return 'CheckCircle';
      case 'skill': return 'Star';
      case 'time': return 'Clock';
      default: return 'Award';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`
        flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300
        ${isUnlocked 
          ? 'border-transparent bg-card shadow-soft hover:shadow-soft-hover' 
          : 'border-dashed border-muted bg-muted/30'
        }
      `}>
        {/* Badge Icon */}
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
          ${isUnlocked 
            ? getBadgeColor(achievement?.type)
            : 'bg-muted text-muted-foreground'
          }
        `}>
          <Icon 
            name={getBadgeIcon(achievement?.type)} 
            size={20} 
            className={isUnlocked ? '' : 'opacity-50'}
          />
        </div>

        {/* Badge Title */}
        <h3 className={`
          font-medium text-center text-sm mb-1
          ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}
        `}>
          {achievement?.title}
        </h3>

        {/* Badge Description */}
        <p className={`
          text-xs text-center line-clamp-2
          ${isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}
        `}>
          {achievement?.description}
        </p>

        {/* Achievement Progress */}
        {achievement?.progress !== undefined && (
          <div className="w-full mt-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className={isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'}>
                Progress
              </span>
              <span className={isUnlocked ? 'text-foreground' : 'text-muted-foreground'}>
                {achievement?.current}/{achievement?.target}
              </span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full">
              <div 
                className={`
                  h-full rounded-full transition-all duration-500
                  ${isUnlocked ? getBadgeColor(achievement?.type)?.replace('text-', 'bg-')?.split(' ')?.[0] : 'bg-muted-foreground/30'}
                `}
                style={{ width: `${achievement?.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Unlock Date */}
        {isUnlocked && achievement?.unlockedDate && (
          <div className="mt-2 text-xs text-muted-foreground">
            Unlocked {formatDate(achievement?.unlockedDate)}
          </div>
        )}

        {/* Lock Overlay for Locked Badges */}
        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <Icon name="Lock" size={16} className="text-muted-foreground" />
          </div>
        )}

        {/* Shine Effect for Newly Unlocked */}
        {isUnlocked && achievement?.isNew && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-lg pointer-events-none" />
        )}
      </div>
      {/* Tooltip on Hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-md shadow-soft-hover text-xs text-popover-foreground opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 whitespace-nowrap">
        <div className="font-medium">{achievement?.title}</div>
        <div className="text-muted-foreground mt-1">{achievement?.description}</div>
        {achievement?.reward && (
          <div className="text-primary mt-1">Reward: {achievement?.reward}</div>
        )}
        {/* Tooltip Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
      </div>
    </div>
  );
};

export default AchievementBadge;