import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ChatWidget from '../../components/ui/ChatWidget';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ConversationSidebar from './components/ConversationSidebar';
import ChatHeader from './components/ChatHeader';
import WelcomeScreen from './components/WelcomeScreen';
import Icon from '../../components/AppIcon';
import geminiService from '../../services/geminiService';
import openaiService from '../../services/openaiService';
import apiKeyDiagnostic from '../../services/apiKeyDiagnostic';

const AIChatInterface = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(1);
  const [apiError, setApiError] = useState(null);
  const [apiStatus, setApiStatus] = useState({ checked: false, valid: false });

  // Check API key validity on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        let status;
        const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
        const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
        
        console.log('API Keys available:', {
          openai: !!openaiKey && openaiKey.length > 10,
          gemini: !!geminiKey && geminiKey.length > 10
        });
        
        // Use Gemini if available, otherwise try OpenAI
        if (geminiKey && geminiKey.length > 10) {
          console.log('Using Gemini service for validation');
          status = await geminiService.validateApiKey();
        } else if (openaiKey && openaiKey.length > 10) {
          console.log('Using OpenAI service for validation');
          status = await openaiService.validateApiKey();
        } else {
          status = { valid: false, reason: 'No valid API key configured' };
        }
        
        setApiStatus({
          checked: true,
          valid: status.valid,
          details: status,
          service: (geminiKey && geminiKey.length > 10) ? 'Gemini' : 'OpenAI'
        });
        
        if (!status.valid) {
          setApiError(`API validation failed: ${status.reason || 'Unknown error'}`);
        } else {
          console.log('✅ API validation successful!');
          setApiError(null);
        }
      } catch (error) {
        console.error('Error validating API:', error);
        setApiStatus({
          checked: true,
          valid: false,
          details: { error: error.message }
        });
        setApiError(`API validation error: ${error.message}`);
      }
    };
    
    checkApiStatus();
  }, []);

  // Enhanced user profile with resume data support
  const getUserProfile = () => {
    // Try to get profile data from localStorage first
    const savedProfile = localStorage.getItem('userProfile');
    const resumeData = localStorage.getItem('resumeData');
    
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      
      // Enhance with resume data if available
      if (resumeData) {
        const resume = JSON.parse(resumeData);
        return {
          ...profile,
          resumeData: resume,
          hasResume: true
        };
      }
      
      return profile;
    }
    
    // Fallback to mock data
    return {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      currentRole: "Marketing Coordinator",
      experience: "3 years",
      skills: ["Digital Marketing", "Content Creation", "Analytics", "Social Media"],
      interests: ["Data Science", "Product Management", "UX Design"],
      hasResume: false
    };
  };

  const userProfile = getUserProfile();

  // Mock conversations data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "Career Path Exploration",
      preview: "I'm interested in transitioning from marketing to data science...",
      messageCount: 12,
      lastActivity: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      messages: [
        {
          id: 1,
          type: 'ai',
          content: `Hi Sarah! I'm your AI Career Advisor powered by advanced AI technology. I can see from your profile that you're currently working as a Marketing Coordinator with 3 years of experience.\n\nI'm here to help you explore career paths, identify skill gaps, and create personalized learning roadmaps. What would you like to discuss today?`,
          timestamp: new Date(Date.now() - 1000 * 60 * 35),
          quickReplies: [
            "Explore new career paths",
            "Assess my current skills",
            "Plan my career transition",
            "Show salary insights"
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Data Science Transition",
      preview: "What skills do I need to become a data scientist?",
      messageCount: 8,
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      messages: [
        {
          id: 1,
          type: 'ai',
          content: "Welcome back! Let's continue discussing your data science career transition.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
        }
      ]
    },
    {
      id: 3,
      title: "Salary Negotiation Tips",
      preview: "How can I negotiate a better salary in my current role?",
      messageCount: 15,
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      messages: [
        {
          id: 1,
          type: 'ai',
          content: "Let's discuss salary negotiation strategies for your current role.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
        }
      ]
    }
  ]);

  const [messages, setMessages] = useState(
    conversations.find(c => c.id === currentConversationId)?.messages || []
  );

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const conversation = conversations.find(c => c.id === currentConversationId);
    setMessages(conversation?.messages || []);
  }, [currentConversationId, conversations]);

  const generateAIResponse = async (userMessage) => {
    try {
      setApiError(null);
      
      console.log('Generating AI response for:', userMessage);
      
      // Choose service based on available API key (prioritize Gemini)
      const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
      const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      let response;
      if (geminiKey && geminiKey.length > 10) {
        console.log('Using Gemini service for generation');
        response = await geminiService.generateCareerAdvice(userMessage, userProfile);
      } else if (openaiKey && openaiKey.length > 10) {
        console.log('Using OpenAI service for generation');
        response = await openaiService.generateCareerAdvice(userMessage, userProfile);
      } else {
        throw new Error('No valid API key configured');
      }
      
      console.log('AI service response:', { 
        success: response.success, 
        demoMode: response.demoMode,
        contentLength: response.content?.length,
        service: (geminiKey && geminiKey.length > 10) ? 'Gemini' : 'OpenAI'
      });
      
      if (!response.success) {
        // Set appropriate error message
        if (response.demoMode) {
          setApiError('Running in demo mode - API key not configured');
        } else {
          setApiError('AI service temporarily unavailable');
        }
      } else {
        console.log('AI response generated successfully');
      }
      
      return {
        content: response.content || 'I apologize, but I cannot process your request right now.',
        text: null,
        isAIGenerated: response.success,
        success: response.success,
        demoMode: response.demoMode || false
      };
      
    } catch (error) {
      console.error('Error calling AI service:', error);
      setApiError(`AI service error: ${error.message || 'Unknown error'}`);
      
      // Enhanced fallback response with debugging info
      return {
        content: `I'm experiencing technical difficulties. Here's what you can try:

**For Users:**
• Refresh the page and try again
• Check if your internet connection is working
• Try a simpler question to test the service

**For Administrators:**
• Verify the API key in the .env file (OpenAI or Gemini)
• Check API key permissions and quota
• Review browser console for detailed error logs

**Debug Info:** ${error.message || 'Unknown error'}

Would you like me to provide some general career guidance instead?`,
        text: null,
        isAIGenerated: false,
        success: false,
        error: error.message
      };
    }
  };

  const handleSendMessage = async (messageContent) => {
  // Special handling for diagnostic commands
  if (messageContent.toLowerCase().includes('api diagnostic') || 
      messageContent.toLowerCase().includes('check api') ||
      messageContent.toLowerCase().includes('test api') || 
      messageContent.toLowerCase() === '@admin:check-api-key') {
    
    // Create user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageContent.toLowerCase() === '@admin:check-api-key' 
        ? 'Running API key diagnostic...' 
        : messageContent,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      // Run detailed API key diagnostics
      const diagnosticResult = await apiKeyDiagnostic.testCurrentApiKey();
      
      const apiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: diagnosticResult.valid
          ? `✅ **API KEY DIAGNOSTIC: SUCCESS**\n\nThe Gemini API key is working correctly.\n\n**Details:**\n- Model: gemini-pro\n- Key: ${diagnosticResult.key || '[HIDDEN]'}\n- Test response: "${diagnosticResult.response?.substring(0, 100)}..."\n\nYour AI chat functionality should be working properly.`
          : `❌ **API KEY DIAGNOSTIC: FAILED**\n\n**Error:** ${diagnosticResult.error}\n\n**Suggestion:** ${diagnosticResult.suggestion}\n\n**Debug Information:**\n- Check for quotes or extra spaces in your API key\n- Verify the API key in your .env file\n- Confirm you have access to the Gemini API\n- Check your network connection`,
        timestamp: new Date(),
        isAIGenerated: false,
        isDiagnostic: true,
        quickReplies: diagnosticResult.valid
          ? ["Start a conversation", "Test with another prompt"]
          : ["How to fix API key", "Get a new API key", "Use demo mode"]
      };
      
      setMessages(prev => [...prev, apiMessage]);
      setIsTyping(false);
      
      // Update conversation
      const updatedConversation = conversations.find(c => c.id === currentConversationId);
      if (updatedConversation) {
        setConversations(prev => prev.map(conv => 
          conv.id === currentConversationId 
            ? { 
                ...conv, 
                messageCount: conv.messageCount + 2,
                lastActivity: new Date(),
                messages: [...conv.messages, userMessage, apiMessage]
              }
            : conv
        ));
      } else {
        // Create a new diagnostic conversation
        const diagnosticConversation = {
          id: Date.now(),
          title: "API Diagnostic Results",
          preview: diagnosticResult.valid ? "API connection successful" : "API connection failed",
          messageCount: 2,
          lastActivity: new Date(),
          messages: [userMessage, apiMessage]
        };
        
        setConversations(prev => [diagnosticConversation, ...prev]);
        setCurrentConversationId(diagnosticConversation.id);
      }
      
      return;
    } catch (error) {
      console.error('API diagnostic error:', error);
      setIsTyping(false);
      setApiError('Failed to run API diagnostics');
    }
    
    return;
  }    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setApiError(null);

    try {
      // Call actual AI service instead of timeout
      const aiResponseData = await generateAIResponse(messageContent);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponseData.content,
        timestamp: new Date(),
        isAIGenerated: aiResponseData.isAIGenerated,
        demoMode: aiResponseData.demoMode || false,
        quickReplies: aiResponseData.success ? [
          "Tell me more",
          "Show similar roles",
          "What skills do I need?",
          "Create learning plan"
        ] : [
          "Try again",
          "Check API connection",
          "Use demo mode"
        ]
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Update conversation
      setConversations(prev => prev.map(conv => 
        conv.id === currentConversationId 
          ? { 
              ...conv, 
              messageCount: conv.messageCount + 2,
              lastActivity: new Date(),
              messages: [...conv.messages, userMessage, aiMessage]
            }
          : conv
      ));
      
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      setIsTyping(false);
      setApiError('Failed to get AI response');
    }
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const handleCardClick = (cardData) => {
    navigate('/career-details', { state: { careerData: cardData } });
  };

  const handleNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: "New Conversation",
      preview: "New chat started...",
      messageCount: 1,
      lastActivity: new Date(),
      messages: [
        {
          id: Date.now(),
          type: 'ai',
          content: `Hi ${userProfile?.name}! I'm your AI Career Advisor powered by advanced AI technology. I'm here to help with your career questions. What would you like to discuss today?`,
          timestamp: new Date(),
          quickReplies: [
            "Explore career paths",
            "Assess my skills",
            "Plan career transition",
            "Show salary insights"
          ]
        }
      ]
    };

    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation?.id);
    setMessages(newConversation?.messages);
  };

  const handleSelectConversation = (conversationId) => {
    setCurrentConversationId(conversationId);
  };

  const handleDeleteConversation = (conversationId) => {
    setConversations(prev => prev?.filter(conv => conv?.id !== conversationId));
    if (currentConversationId === conversationId && conversations?.length > 1) {
      const remainingConversations = conversations?.filter(conv => conv?.id !== conversationId);
      setCurrentConversationId(remainingConversations?.[0]?.id);
    }
  };

  const handleClearChat = () => {
    const clearedMessages = [
      {
        id: Date.now(),
        type: 'ai',
        content: `Chat cleared! Hi ${userProfile?.name}, I'm ready to help with your career questions powered by advanced AI technology. What would you like to discuss?`,
        timestamp: new Date(),
        quickReplies: [
          "Explore career paths",
          "Assess my skills",
          "Plan career transition",
          "Show salary insights"
        ]
      }
    ];

    setMessages(clearedMessages);
    setConversations(prev => prev?.map(conv => 
      conv?.id === currentConversationId 
        ? { ...conv, messages: clearedMessages, messageCount: 1 }
        : conv
    ));
  };

  const handleStartChat = (prompt) => {
    handleSendMessage(prompt);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Check if there are messages to display
  const hasMessages = messages?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      
      {/* NEW: API Error Banner */}
      {apiError && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <Icon name="AlertTriangle" className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{apiError}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex h-screen" style={{ height: 'calc(100vh - 112px)' }}>
        {/* Conversation Sidebar */}
        <ConversationSidebar
          conversations={conversations}
          currentConversation={currentConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          onDeleteConversation={handleDeleteConversation}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <ChatHeader
            onToggleSidebar={toggleSidebar}
            onClearChat={handleClearChat}
            messageCount={messages?.length}
            isTyping={isTyping}
          />

          {/* Chat Content */}
          <div className="flex-1 flex flex-col">
            {!hasMessages ? (
              <WelcomeScreen
                onStartChat={handleStartChat}
                userProfile={userProfile}
                apiStatus={apiStatus}
              />
            ) : (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ paddingBottom: '80px' }}>
                  {messages?.map((message) => (
                    <ChatMessage
                      key={message?.id}
                      message={message}
                      onQuickReply={handleQuickReply}
                      onCardClick={handleCardClick}
                    />
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2 p-4 bg-card border border-border rounded-2xl rounded-bl-md">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="Bot" size={12} color="white" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="sticky bottom-0">
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    isTyping={isTyping}
                    disabled={isTyping}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Bottom Navigation Spacer */}
      <div className="h-14 md:hidden" />
      {/* Global Chat Widget (hidden on this page) */}
      <div className="hidden">
        <ChatWidget />
      </div>
    </div>
  );
};

export default AIChatInterface;