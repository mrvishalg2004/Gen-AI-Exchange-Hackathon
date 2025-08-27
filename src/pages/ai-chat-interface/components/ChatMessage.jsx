import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, onQuickReply, onCardClick }) => {
  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderRichContent = (content) => {
    if (content?.type === 'career-card') {
      return (
        <div className="mt-3 p-4 bg-card border border-border rounded-lg cursor-pointer hover:shadow-soft-hover transition-soft" onClick={() => onCardClick(content?.data)}>
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-foreground">{content?.data?.title}</h4>
            <span className="text-sm font-medium text-success">${content?.data?.salary}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{content?.data?.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
              {content?.data?.match}% match
            </span>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
        </div>
      );
    }

    if (content?.type === 'skill-assessment') {
      return (
        <div className="mt-3 p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-accent" />
            <h4 className="font-medium text-foreground">Skill Gap Analysis</h4>
          </div>
          <div className="space-y-2">
            {content?.data?.skills?.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{skill?.name}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div 
                      className="h-2 bg-accent rounded-full transition-all duration-300"
                      style={{ width: `${skill?.level}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{skill?.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (content?.type === 'learning-resources') {
      return (
        <div className="mt-3 space-y-2">
          {content?.data?.resources?.map((resource, index) => (
            <div key={index} className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="BookOpen" size={14} className="text-secondary" />
                <h5 className="text-sm font-medium text-foreground">{resource?.title}</h5>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{resource?.provider}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-secondary">{resource?.duration}</span>
                <Button variant="outline" size="xs">View Course</Button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return <p className="whitespace-pre-wrap">{content?.text || content}</p>;
  };

  return (
    <div className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] md:max-w-[70%] ${message?.type === 'user' ? 'order-2' : 'order-1'}`}>
        {message?.type === 'ai' && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={12} color="white" />
            </div>
            <span className="text-xs text-muted-foreground">AI Career Advisor</span>
          </div>
        )}
        
        <div className={`p-4 rounded-2xl ${
          message?.type === 'user' ?'bg-primary text-primary-foreground rounded-br-md' :'bg-card border border-border rounded-bl-md'
        }`}>
          {typeof message?.content === 'object' ? renderRichContent(message?.content) : (
            <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
          )}
          
          <div className={`flex items-center justify-between mt-2 pt-2 border-t ${
            message?.type === 'user' ? 'border-primary-foreground/20' : 'border-border'
          }`}>
            <span className={`text-xs ${
              message?.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}>
              {formatTime(message?.timestamp)}
            </span>
            
            {message?.type === 'ai' && (
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="xs" iconName="ThumbsUp" iconSize={12} />
                <Button variant="ghost" size="xs" iconName="ThumbsDown" iconSize={12} />
              </div>
            )}
          </div>
        </div>

        {message?.quickReplies && message?.quickReplies?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message?.quickReplies?.map((reply, index) => (
              <button
                key={index}
                onClick={() => onQuickReply(reply)}
                className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full border border-border transition-soft"
              >
                {reply}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;