import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversationSidebar = ({ conversations, currentConversation, onSelectConversation, onNewConversation, onDeleteConversation, isOpen, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations?.filter(conv =>
    conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    conv?.preview?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date?.toLocaleDateString();
  };

  const groupConversationsByDate = (conversations) => {
    const groups = {};
    conversations?.forEach(conv => {
      const dateKey = formatDate(conv?.lastActivity);
      if (!groups?.[dateKey]) groups[dateKey] = [];
      groups?.[dateKey]?.push(conv);
    });
    return groups;
  };

  const conversationGroups = groupConversationsByDate(filteredConversations);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col w-80 bg-card border-r border-border transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconSize={16}
              onClick={onToggle}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
          
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={onNewConversation}
            fullWidth
          >
            New Chat
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <Input
            type="search"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(conversationGroups)?.map(([dateGroup, convs]) => (
            <div key={dateGroup} className="p-4">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                {dateGroup}
              </h3>
              <div className="space-y-1">
                {convs?.map((conversation) => (
                  <div
                    key={conversation?.id}
                    onClick={() => onSelectConversation(conversation?.id)}
                    className={`group relative p-3 rounded-lg cursor-pointer transition-soft ${
                      currentConversation === conversation?.id
                        ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {conversation?.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {conversation?.preview}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {conversation?.messageCount} messages
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(conversation?.lastActivity)}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Trash2"
                        iconSize={12}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onDeleteConversation(conversation?.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-error transition-soft"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {filteredConversations?.length === 0 && (
            <div className="p-8 text-center">
              <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {searchQuery ? 'Try a different search term' : 'Start a new chat to begin'}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-200 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-card border-r border-border shadow-elevation-3 animate-slide-up">
            {/* Mobile Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  iconSize={16}
                  onClick={onToggle}
                  className="text-muted-foreground hover:text-foreground"
                />
              </div>
              
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={() => {
                  onNewConversation();
                  onToggle();
                }}
                fullWidth
              >
                New Chat
              </Button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-border">
              <Input
                type="search"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="w-full"
              />
            </div>

            {/* Mobile Conversations List */}
            <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
              {Object.entries(conversationGroups)?.map(([dateGroup, convs]) => (
                <div key={dateGroup} className="p-4">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    {dateGroup}
                  </h3>
                  <div className="space-y-1">
                    {convs?.map((conversation) => (
                      <div
                        key={conversation?.id}
                        onClick={() => {
                          onSelectConversation(conversation?.id);
                          onToggle();
                        }}
                        className={`group relative p-3 rounded-lg cursor-pointer transition-soft ${
                          currentConversation === conversation?.id
                            ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-foreground truncate">
                              {conversation?.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {conversation?.preview}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {conversation?.messageCount} messages
                              </span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(conversation?.lastActivity)}
                              </span>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="xs"
                            iconName="Trash2"
                            iconSize={12}
                            onClick={(e) => {
                              e?.stopPropagation();
                              onDeleteConversation(conversation?.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-error transition-soft"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {filteredConversations?.length === 0 && (
                <div className="p-8 text-center">
                  <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    {searchQuery ? 'No conversations found' : 'No conversations yet'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {searchQuery ? 'Try a different search term' : 'Start a new chat to begin'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConversationSidebar;