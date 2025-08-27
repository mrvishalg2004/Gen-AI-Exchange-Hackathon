import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ApiSetupGuide from './ApiSetupGuide';

const WelcomeScreen = ({ onStartChat, userProfile, apiStatus }) => {
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const quickStartOptions = [
    {
      icon: 'Target',
      title: 'Career Path Analysis',
      description: 'Get personalized career recommendations based on your skills and interests',
      prompt: 'Analyze my profile and suggest the best career paths for me'
    },
    {
      icon: 'TrendingUp',
      title: 'Skill Gap Assessment',
      description: 'Identify missing skills for your target career and get learning recommendations',
      prompt: 'What skills do I need to develop for my target career?'
    },
    {
      icon: 'BookOpen',
      title: 'Learning Roadmap',
      description: 'Create a structured learning plan to achieve your career goals',
      prompt: 'Help me create a learning roadmap for my career transition'
    },
    {
      icon: 'DollarSign',
      title: 'Salary Insights',
      description: 'Explore salary trends and compensation data for different roles',
      prompt: 'Show me salary trends for roles in my field'
    },
    {
      icon: 'Users',
      title: 'Industry Insights',
      description: 'Learn about industry trends, job market, and growth opportunities',
      prompt: 'What are the current trends in my industry?'
    },
    {
      icon: 'MessageCircle',
      title: 'Interview Prep',
      description: 'Get help with interview questions and career transition advice',
      prompt: 'Help me prepare for interviews in my target field'
    }
  ];

  const recentTopics = [
    'Software Engineer career path',
    'Data Science transition guide',
    'Product Manager skills',
    'UX Designer portfolio tips',
    'Remote work opportunities'
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bot" size={32} color="white" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to AI Career Advisor
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {userProfile?.name ? `Hi ${userProfile?.name}! ` : 'Hi there! '}
            I'm here to help you navigate your career journey with personalized insights, 
            skill assessments, and learning recommendations.
          </p>
        </div>

        {/* Quick Start Options */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 text-center">
            What would you like to explore today?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickStartOptions?.map((option, index) => (
              <div
                key={index}
                onClick={() => onStartChat(option?.prompt)}
                className="group p-6 bg-card border border-border rounded-xl hover:shadow-soft-hover hover:border-primary/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-soft">
                    <Icon name={option?.icon} size={20} className="text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-soft">
                    {option?.title}
                  </h3>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {option?.description}
                </p>
                
                <div className="flex items-center justify-end mt-4">
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Topics */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-foreground mb-4 text-center">
            Popular Topics
          </h3>
          
          <div className="flex flex-wrap justify-center gap-2">
            {recentTopics?.map((topic, index) => (
              <button
                key={index}
                onClick={() => onStartChat(`Tell me about ${topic}`)}
                className="px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full text-sm border border-border hover:border-primary/20 transition-soft"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Features Highlight */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Powered by Advanced AI
            </h3>
            <p className="text-sm text-muted-foreground">
              Get personalized career guidance with real-time insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name="Zap" size={20} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">Instant Responses</h4>
              <p className="text-xs text-muted-foreground">Get immediate answers to your career questions</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name="Brain" size={20} className="text-secondary" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">Smart Analysis</h4>
              <p className="text-xs text-muted-foreground">AI-powered insights based on your profile</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name="Shield" size={20} className="text-accent" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">Secure & Private</h4>
              <p className="text-xs text-muted-foreground">Your data is protected and confidential</p>
            </div>
          </div>
        </div>

        {/* API Status Indicator */}
        {apiStatus && (
          <div className={`mt-6 p-3 rounded-md text-sm ${apiStatus.valid ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
            <div className="flex items-center gap-2">
              <Icon 
                name={apiStatus.valid ? 'CheckCircle' : 'AlertTriangle'} 
                size={16} 
                className={apiStatus.valid ? 'text-green-500' : 'text-amber-500'} 
              />
              <span className="font-medium">
                {apiStatus.valid 
                  ? 'Gemini AI is connected and ready' 
                  : 'Gemini AI is in demo mode'}
              </span>
            </div>
            {!apiStatus.valid && apiStatus.details && (
              <p className="mt-1 text-xs pl-6">
                {apiStatus.details.suggestion || apiStatus.details.reason || 'Check your API key configuration'}
              </p>
            )}
            
            {/* Admin API Check Button */}
            <div className="mt-2 pl-6 flex gap-3">
              <button 
                onClick={() => onStartChat("@admin:check-api-key")}
                className="text-xs underline text-amber-700 hover:text-amber-900"
              >
                Run API Diagnostic
              </button>
              <span className="text-xs text-amber-600">•</span>
              <button 
                onClick={() => setShowSetupGuide(true)}
                className="text-xs underline text-amber-700 hover:text-amber-900"
              >
                Setup Guide
              </button>
              <span className="text-xs ml-2 text-amber-600">(Admin)</span>
            </div>
          </div>
        )}

        {/* Setup Guide Modal */}
        {showSetupGuide && (
          <ApiSetupGuide onClose={() => setShowSetupGuide(false)} />
        )}

        {/* Call to Action */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Ready to start your career conversation?
          </p>
          <Button
            variant="default"
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => onStartChat("Hi! I'd like to explore my career options.")}
          >
            Start Chatting
          </Button>
          
          {/* Quick Test Button */}
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Zap"
              iconPosition="left"
              onClick={() => onStartChat("Test: Can you help me with career advice?")}
            >
              Quick API Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;