import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onToggleSidebar, onClearChat, messageCount, isTyping }) => {
  return (
    <div className="sticky top-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between p-4">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Menu"
            iconSize={18}
            onClick={onToggleSidebar}
            className="text-muted-foreground hover:text-foreground lg:hidden"
          />
          
          {/* AI Avatar & Status */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={20} color="white" />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                isTyping ? 'bg-warning animate-pulse' : 'bg-success'
              }`} />
            </div>
            
            <div>
              <h1 className="text-lg font-semibold text-foreground">AI Career Advisor</h1>
              <p className="text-sm text-muted-foreground">
                {isTyping ? 'Typing...' : 'Online • Ready to help'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Message Count */}
          {messageCount > 0 && (
            <div className="hidden sm:flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="MessageSquare" size={16} />
              <span>{messageCount} messages</span>
            </div>
          )}

          {/* Desktop Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="PanelLeftOpen"
            iconSize={16}
            onClick={onToggleSidebar}
            className="hidden lg:flex text-muted-foreground hover:text-foreground"
          />

          {/* Clear Chat */}
          {messageCount > 1 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Trash2"
              iconSize={16}
              onClick={onClearChat}
              className="text-muted-foreground hover:text-error"
            />
          )}

          {/* More Options */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground"
            />
            
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-soft-hover opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-soft z-50">
              <Link
                to="/career-dashboard"
                className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-soft first:rounded-t-md"
              >
                <Icon name="LayoutDashboard" size={16} />
                <span>Go to Dashboard</span>
              </Link>
              
              <Link
                to="/profile-setup"
                className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-soft"
              >
                <Icon name="User" size={16} />
                <span>Update Profile</span>
              </Link>
              
              <Link
                to="/learning-roadmap"
                className="flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-soft last:rounded-b-md"
              >
                <Icon name="BookOpen" size={16} />
                <span>Learning Roadmap</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;