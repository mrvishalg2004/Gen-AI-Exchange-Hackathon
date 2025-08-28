import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    try {
      console.log('Initializing GeminiService...');
      
      // Direct access to environment variable without optional chaining
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      console.log('API Key present:', !!apiKey);
      console.log('API Key prefix:', apiKey ? apiKey.substring(0, 10) + '...' : 'none');
      
      // Check for invalid API key formats
      if (!apiKey) {
        console.warn('Warning: Gemini API key not found. Using fallback responses.');
        this.apiKeyMissing = true;
        return;
      }
      
      // Check for common API key format issues
      if (apiKey.includes('"') || apiKey.includes("'") || apiKey.includes(' ')) {
        console.warn('Warning: Gemini API key contains quotes or spaces. This may cause issues.');
        // Try to clean the key
        const cleanedKey = apiKey.replace(/['"]/g, '').trim();
        console.log('Cleaned API key');
        this.genAI = new GoogleGenerativeAI(cleanedKey);
      } else {
        this.genAI = new GoogleGenerativeAI(apiKey);
      }
      
      // Initialize with the model we know works for this key
      this.model = this.genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',  // Using the model that passed our tests
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      });
      console.log('✅ Gemini model initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing Gemini service:', error);
      this.apiKeyMissing = true;
    }
  }
  
  /**
   * Validates the current API key
   * @returns {Promise<Object>} Result of validation
   */
  async validateApiKey() {
    if (this.apiKeyMissing) {
      return {
        valid: false,
        reason: 'API key is not configured',
        suggestion: 'Please add your Gemini API key to the .env file'
      };
    }
    
    try {
      // Log the first 5 chars of the API key for debugging (safely)
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log(`Testing API key starting with: ${apiKey?.substring(0, 5)}...`);
      
      // Check if it's still a demo/placeholder key
      if (apiKey?.includes('Demo') || apiKey?.includes('YOUR_ACTUAL') || apiKey?.includes('ReplaceWith')) {
        return {
          valid: false,
          reason: 'Using placeholder/demo API key',
          suggestion: 'Please replace with your actual Gemini API key from https://ai.google.dev/'
        };
      }

      // Try with the model we know works
      try {
        console.log('Trying model: gemini-1.5-flash');
        
        // We know this model works with the API key
        this.model = this.genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash',
          generationConfig: {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
        });
        
        // Test the model
        const result = await this.model.generateContent('Test message');
        await result.response;
        
        // If we reach here, the test was successful
        console.log('Successfully connected using gemini-1.5-flash');
        return {
          valid: true,
          model: 'gemini-1.5-flash'
        };
      } catch (error) {
        console.warn('Error with gemini-1.5-flash:', error.message);
        throw error; // Throw the error to be caught below
      }
      
      return {
        valid: true,
        model: 'gemini-pro'
      };
    } catch (error) {
      console.error('API key validation error:', error);
      
      // Check for specific error types
      let reason = 'API key validation failed';
      let suggestion = 'Please check if the API key is valid and has sufficient quota';
      
      if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('invalid API key') || error.message?.includes('expired')) {
        reason = 'Invalid or expired API key';
        suggestion = 'Your API key is invalid or has expired. Please generate a new one from Google AI Studio (https://ai.google.dev/)';
      } else if (error.message?.includes('quota') || error.message?.includes('limit') || error.message?.includes('Too Many Requests')) {
        reason = 'API quota exceeded';
        suggestion = 'Your API key has reached its quota limit. Wait or request a new key.';
      } else if (error.message?.includes('network') || error.message?.includes('connect')) {
        reason = 'Network connectivity issue';
        suggestion = 'Check your internet connection';
      } else if (error.message?.includes('PERMISSION_DENIED')) {
        reason = 'API key lacks permissions';
        suggestion = 'Ensure your API key has Gemini API permissions enabled';
      } else if (error.message?.includes('not found') || error.status === 404) {
        reason = 'Model not available';
        suggestion = 'The model is not available for your API key. Try generating a new API key.';
      }
      
      return {
        valid: false,
        reason: reason,
        error: error.message,
        suggestion: suggestion
      };
    }
  }

  async generateCareerAdvice(userMessage, userProfile = null) {
    // Check if API key is missing and return a friendly message
    if (this.apiKeyMissing) {
      console.warn('Gemini API call attempted without API key');
      return {
        content: `Hi! I'm your AI Career Advisor. I'm currently running in demonstration mode. I can still help with career guidance, but for full AI-powered responses, please contact your administrator to configure the Gemini API key.\n\n**For your question: "${userMessage}"**\n\nHere's some helpful career guidance:\n\n${this.getFallbackResponse(userMessage)}\n\n**To enable full AI capabilities:** Please ask your administrator to configure a valid Gemini API key from https://ai.google.dev/`,
        success: false,
        timestamp: new Date(),
        demoMode: true
      };
    }
    
    try {
      // Check if using demo/placeholder key
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (apiKey?.includes('Demo') || apiKey?.includes('YOUR_ACTUAL') || apiKey?.includes('ReplaceWith')) {
        return {
          content: `Hi! I'm your AI Career Advisor running in **Demo Mode**.\n\n**Your question:** "${userMessage}"\n\n**Demo Response:** Here's some helpful career guidance based on your query:\n\n${this.getFallbackResponse(userMessage)}\n\n**Note:** This is a simulated response. To get real AI-powered advice from Google's Gemini AI:\n1. Get an API key from https://ai.google.dev/\n2. Replace the demo key in your .env file\n3. Restart the application\n\nThe system will automatically switch to full AI mode once configured!`,
          success: false,
          timestamp: new Date(),
          demoMode: true
        };
      }

      const context = userProfile 
        ? `User Profile: ${JSON.stringify(userProfile)}\n\nUser Question: ${userMessage}` 
        : userMessage;

      const systemPrompt = `You are an AI Career Advisor for CareerPath AI. Your role is to provide:
      - Personalized career recommendations
      - Skills gap analysis
      - Learning roadmaps
      - Salary insights
      - Career transition guidance

      Respond in a helpful, professional manner. Keep responses concise but informative.
      Format your response as plain text, avoiding excessive formatting.

      ${context}`;

      console.log('Sending request to Gemini API...');
      
      // Test with a timeout to avoid hanging
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API request timeout after 30 seconds')), 30000)
      );
      
      const requestPromise = this.model.generateContent(systemPrompt);
      
      const result = await Promise.race([requestPromise, timeoutPromise]);
      const response = await result.response;
      const text = response.text();

      console.log('✅ Received response from Gemini API');
      
      return {
        content: text,
        success: true,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Provide specific error handling based on error type
      let fallbackContent = '';
      let errorReason = '';
      
      if (error.message?.includes('timeout')) {
        errorReason = 'Request timeout - API took too long to respond';
        fallbackContent = 'The AI service is taking longer than usual to respond. ';
      } else if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('invalid API key')) {
        errorReason = 'Invalid API key';
        fallbackContent = 'The API key appears to be invalid or expired. ';
      } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
        errorReason = 'API quota exceeded';
        fallbackContent = 'The AI service has reached its usage limit for this API key. ';
      } else {
        errorReason = error.message || 'Unknown API error';
        fallbackContent = 'I\'m experiencing technical difficulties connecting to the AI service. ';
      }

      // Enhanced fallback response with error context
      return {
        content: `${fallbackContent}Here's some helpful career guidance based on your query:\n\n${this.getFallbackResponse(userMessage)}\n\n**Technical Details:** ${errorReason}\n\n**Next Steps:**\n• Try again in a moment\n• Check if you have a valid Gemini API key configured\n• Contact support if this issue persists\n\n**Get a free API key:** Visit https://ai.google.dev/ to get your own Gemini API key`,
        success: false,
        error: error?.message,
        timestamp: new Date()
      };
    }
  }

  getFallbackResponse(userMessage) {
    const message = userMessage?.toLowerCase() || '';
    
    if (message?.includes('career') || message?.includes('path') || message?.includes('role') || message?.includes('job')) {
      return `**Career Path Guidance:**
• Research roles that align with your current skills and interests
• Consider growth opportunities in emerging industries (AI, sustainability, healthcare)
• Network with professionals in your target field through LinkedIn
• Explore career transition programs and certifications
• Consider roles in high-demand areas like tech, healthcare, and renewable energy`;
    } else if (message?.includes('skill') || message?.includes('gap') || message?.includes('learn') || message?.includes('develop')) {
      return `**Skill Development Recommendations:**
• Identify key skills required in your target role through job postings
• Take online courses on platforms like Coursera, edX, or LinkedIn Learning
• Practice through hands-on projects and build a portfolio
• Seek mentorship from industry professionals
• Focus on both technical skills and soft skills (communication, leadership)`;
    } else if (message?.includes('salary') || message?.includes('pay') || message?.includes('compensation') || message?.includes('earn')) {
      return `**Salary and Compensation Insights:**
• Research industry salary benchmarks using Glassdoor, PayScale, or Indeed
• Consider your experience level, location, and company size
• Factor in benefits, work-life balance, and growth potential
• Prepare for salary negotiations with market data and your value proposition
• Don't forget to negotiate benefits beyond base salary`;
    } else if (message?.includes('interview') || message?.includes('prep') || message?.includes('questions')) {
      return `**Interview Preparation Tips:**
• Research the company, role, and industry thoroughly
• Practice common behavioral and technical questions
• Prepare specific examples using the STAR method (Situation, Task, Action, Result)
• Have thoughtful questions ready about the role and company culture
• Follow up with a thank-you email within 24 hours`;
    } else if (message?.includes('transition') || message?.includes('change') || message?.includes('switch')) {
      return `**Career Transition Strategy:**
• Start by identifying transferable skills from your current role
• Network within your target industry through events and online communities
• Consider informational interviews with professionals in your target field
• Look for bridge roles that combine your current skills with new industry knowledge
• Be patient - career transitions typically take 6-12 months of focused effort`;
    } else {
      return `**General Career Success Tips:**
• Set clear, measurable career goals with specific timelines
• Continuously develop your professional skills and stay updated with industry trends
• Build and maintain a strong professional network
• Create a compelling personal brand and online presence
• Seek feedback regularly and be open to constructive criticism
• Consider working with a career coach or mentor for personalized guidance`;
    }
  }

  async generateStructuredResponse(userMessage, responseType = 'general', userProfile = null) {
    // Check if API key is missing and redirect to regular advice
    if (this.apiKeyMissing) {
      return await this.generateCareerAdvice(userMessage, userProfile);
    }
    
    try {
      let prompt = '';
      
      switch (responseType) {
        case 'career-recommendation':
          prompt = `Based on this user profile: ${JSON.stringify(userProfile)} and their query: "${userMessage}", provide a career recommendation including:
          - Job title and description
          - Salary range
          - Skills match percentage
          - Required skills
          Keep it concise and actionable.`;
          break;
        case 'skill-assessment':
          prompt = `Analyze the user's skills for career transition. User query: "${userMessage}". Provide:
          - Current skill levels
          - Skill gaps to address
          - Learning recommendations
          Format as a brief assessment.`;
          break;
        default:
          return await this.generateCareerAdvice(userMessage, userProfile);
      }

      // Remove optional chaining
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        content: text,
        type: responseType,
        success: true,
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Gemini Structured Response Error:', error);
      return await this.generateCareerAdvice(userMessage, userProfile);
    }
  }
}

// Create instance and export it
const geminiServiceInstance = new GeminiService();
export default geminiServiceInstance;