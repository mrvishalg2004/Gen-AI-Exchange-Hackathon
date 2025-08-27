import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customBreadcrumbs = null, className = '' }) => {
  const location = useLocation();

  const routeMap = {
    '/career-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/profile-setup': { label: 'Profile Setup', icon: 'User' },
    '/profile-management': { label: 'Profile Management', icon: 'Settings' },
    '/career-details': { label: 'Career Details', icon: 'Briefcase' },
    '/ai-chat-interface': { label: 'AI Chat', icon: 'MessageCircle' },
    '/learning-roadmap': { label: 'Learning Roadmap', icon: 'BookOpen' }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/career-dashboard', icon: 'Home' }];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const route = routeMap?.[currentPath];
      if (route) {
        breadcrumbs?.push({
          label: route?.label,
          path: currentPath,
          icon: route?.icon
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          const isFirst = index === 0;

          return (
            <li key={crumb?.path} className="flex items-center">
              {!isFirst && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-muted-foreground mx-1" 
                />
              )}
              {isLast ? (
                <span className="flex items-center space-x-1 text-foreground font-medium">
                  <Icon name={crumb?.icon} size={14} />
                  <span className="hidden sm:inline">{crumb?.label}</span>
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-soft"
                >
                  <Icon name={crumb?.icon} size={14} />
                  <span className="hidden sm:inline">{crumb?.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;