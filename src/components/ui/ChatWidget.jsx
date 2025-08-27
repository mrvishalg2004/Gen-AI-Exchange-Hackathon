import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ChatWidget = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I\'m your AI career advisor. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I understand you're looking for career guidance. Based on your profile, I can help you explore career paths, identify skill gaps, and create learning roadmaps. What specific area would you like to focus on?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Desktop Chat Widget */}
      <div className={`hidden md:block fixed bottom-6 right-6 z-200 ${className}`}>
        {isOpen && (
          <div className="mb-4 w-80 h-96 bg-card border border-border rounded-lg shadow-elevation-3 animate-scale-in">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">AI Career Advisor</h3>
                  <p className="text-xs text-success">Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Minimize2"
                iconSize={16}
                onClick={toggleChat}
                className="text-muted-foreground hover:text-foreground"
              />
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3">
              {messages?.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p>{message?.content}</p>
                    <p className={`text-xs mt-1 opacity-70`}>
                      {formatTime(message?.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e?.target?.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your career..."
                  className="flex-1 px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  variant="default"
                  size="sm"
                  iconName="Send"
                  iconSize={16}
                  onClick={handleSendMessage}
                  disabled={!inputValue?.trim()}
                />
              </div>
            </div>
          </div>
        )}

        {/* Chat Toggle Button */}
        <Button
          variant="default"
          size="lg"
          iconName={isOpen ? "X" : "MessageCircle"}
          iconSize={20}
          onClick={toggleChat}
          className="rounded-full shadow-elevation-2 hover:shadow-elevation-3 transition-soft"
        />
      </div>
      {/* Mobile Chat Widget */}
      <div className="md:hidden">
        {isOpen && (
          <div className="fixed inset-0 z-200 bg-background animate-slide-up">
            {/* Mobile Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={20} color="white" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">AI Career Advisor</h3>
                  <p className="text-sm text-success">Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                iconSize={20}
                onClick={toggleChat}
                className="text-muted-foreground hover:text-foreground"
              />
            </div>

            {/* Mobile Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ height: 'calc(100vh - 140px)' }}>
              {messages?.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg ${
                      message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message?.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {formatTime(message?.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Mobile Chat Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e?.target?.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your career..."
                  className="flex-1 px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button
                  variant="default"
                  size="default"
                  iconName="Send"
                  iconSize={18}
                  onClick={handleSendMessage}
                  disabled={!inputValue?.trim()}
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Chat Toggle Button */}
        {!isOpen && (
          <Button
            variant="default"
            size="lg"
            iconName="MessageCircle"
            iconSize={20}
            onClick={toggleChat}
            className="fixed bottom-20 right-4 z-200 rounded-full shadow-elevation-2"
          />
        )}
      </div>
    </>
  );
};

export default ChatWidget;