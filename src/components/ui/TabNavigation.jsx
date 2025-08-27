import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TabNavigation = ({ className = '' }) => {
  const location = useLocation();

  const tabs = [
    { label: 'Dashboard', path: '/career-dashboard', icon: 'LayoutDashboard' },
    { label: 'Profile', path: '/profile-setup', icon: 'User' },
    { label: 'Learning', path: '/learning-roadmap', icon: 'BookOpen' },
    { label: 'Chat', path: '/ai-chat-interface', icon: 'MessageCircle' }
  ];

  const isActivePath = (path) => {
    if (path === '/profile-setup' && (location?.pathname === '/profile-management' || location?.pathname === '/profile-setup')) {
      return true;
    }
    return location?.pathname === path;
  };

  return (
    <>
      {/* Desktop Tab Navigation */}
      <nav className={`hidden md:flex items-center space-x-1 bg-card border-b border-border ${className}`}>
        {tabs?.map((tab) => (
          <Link
            key={tab?.path}
            to={tab?.path}
            className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-soft min-h-[48px] ${
              isActivePath(tab?.path)
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </Link>
        ))}
      </nav>
      {/* Mobile Bottom Tab Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-100 bg-card border-t border-border shadow-elevation-2">
        <div className="flex items-center justify-around">
          {tabs?.map((tab) => (
            <Link
              key={tab?.path}
              to={tab?.path}
              className={`flex flex-col items-center justify-center py-2 px-1 min-h-[56px] flex-1 transition-soft ${
                isActivePath(tab?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={20} />
              <span className="text-xs font-medium mt-1">{tab?.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default TabNavigation;