import React, { useState, useRef, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isTyping, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const suggestions = [
    "What career paths match my skills?",
    "How can I transition to tech?",
    "What skills should I learn next?",
    "Show me salary trends for my field",
    "Help me create a learning roadmap"
  ];

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    textareaRef?.current?.focus();
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        setMessage(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition?.start();
    }
  };

  return (
    <div className="border-t border-border bg-card">
      {/* Quick Suggestions */}
      {message === '' && (
        <div className="p-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-lg border border-border transition-soft"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Input Area */}
      <div className="p-4">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your career..."
              disabled={disabled || isTyping}
              className="w-full px-4 py-3 pr-12 bg-input border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-ring text-sm placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            
            {/* Voice Input Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName={isRecording ? "MicOff" : "Mic"}
              iconSize={16}
              onClick={handleVoiceInput}
              disabled={disabled || isTyping}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                isRecording ? 'text-error animate-pulse' : 'text-muted-foreground hover:text-foreground'
              }`}
            />
          </div>

          {/* Send Button */}
          <Button
            variant="default"
            size="default"
            iconName="Send"
            iconSize={16}
            onClick={handleSend}
            disabled={!message?.trim() || disabled || isTyping}
            className="rounded-2xl px-4 py-3 min-w-[48px] h-12"
          />
        </div>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span>AI is thinking...</span>
          </div>
        )}

        {/* Character Count */}
        {message?.length > 0 && (
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>Tip: Press Enter to send, Shift+Enter for new line</span>
            <span>{message?.length}/1000</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;