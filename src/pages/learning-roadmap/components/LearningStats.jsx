import React from 'react';
import Icon from '../../../components/AppIcon';

const LearningStats = ({ stats, className = '' }) => {
  const statItems = [
    {
      key: 'totalHours',
      label: 'Total Hours',
      value: stats?.totalHours,
      icon: 'Clock',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      key: 'completedCourses',
      label: 'Completed Courses',
      value: stats?.completedCourses,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      key: 'skillsLearned',
      label: 'Skills Learned',
      value: stats?.skillsLearned,
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      key: 'currentStreak',
      label: 'Current Streak',
      value: `${stats?.currentStreak} days`,
      icon: 'Flame',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      key: 'certificatesEarned',
      label: 'Certificates',
      value: stats?.certificatesEarned,
      icon: 'Award',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      key: 'averageRating',
      label: 'Avg. Rating',
      value: `${stats?.averageRating}/5`,
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BarChart3" size={20} className="text-primary" />
        <h3 className="font-semibold text-foreground">Learning Statistics</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statItems?.map((item) => (
          <div key={item?.key} className="text-center">
            <div className={`w-12 h-12 rounded-full ${item?.bgColor} flex items-center justify-center mx-auto mb-2`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="text-lg font-bold text-foreground mb-1">
              {item?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {item?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Weekly Progress */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-foreground">This Week</h4>
          <span className="text-sm text-muted-foreground">
            {stats?.weeklyProgress?.hoursThisWeek}h / {stats?.weeklyProgress?.weeklyGoal}h
          </span>
        </div>
        
        <div className="w-full h-2 bg-muted rounded-full mb-2">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ 
              width: `${Math.min((stats?.weeklyProgress?.hoursThisWeek / stats?.weeklyProgress?.weeklyGoal) * 100, 100)}%` 
            }}
          />
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Weekly Goal Progress</span>
          <span>
            {Math.round((stats?.weeklyProgress?.hoursThisWeek / stats?.weeklyProgress?.weeklyGoal) * 100)}%
          </span>
        </div>
      </div>
      {/* Recent Achievement */}
      {stats?.recentAchievement && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="Trophy" size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">
                Latest Achievement
              </div>
              <div className="text-xs text-muted-foreground">
                {stats?.recentAchievement}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningStats;