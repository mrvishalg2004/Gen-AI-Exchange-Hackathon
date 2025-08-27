import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Career Matches',
      value: stats?.totalMatches,
      icon: 'Target',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Avg Match Score',
      value: `${stats?.averageMatch}%`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Skills to Learn',
      value: stats?.skillsToLearn,
      icon: 'BookOpen',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Bookmarked',
      value: stats?.bookmarked,
      icon: 'Bookmark',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground truncate">{item?.label}</p>
              <p className="text-lg font-semibold text-foreground">{item?.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;