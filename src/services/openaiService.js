import OpenAI from 'openai';

class OpenAIService {
  constructor() {
    try {
      console.log('Initializing OpenAI Service...');
      
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      console.log('API Key present:', !!apiKey);
      console.log('API Key prefix:', apiKey ? apiKey.substring(0, 10) + '...' : 'none');
      
      if (!apiKey) {
        console.warn('Warning: OpenAI API key not found. Using fallback responses.');
        this.apiKeyMissing = true;
        return;
      }
      
      // Check for common API key format issues
      if (apiKey.includes('"') || apiKey.includes("'")) {
        console.warn('Warning: OpenAI API key contains quotes. This may cause issues.');
        const cleanedKey = apiKey.replace(/['"]/g, '').trim();
        this.openai = new OpenAI({ apiKey: cleanedKey, dangerouslyAllowBrowser: true });
      } else {
        this.openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
      }
      
      console.log('✅ OpenAI client initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing OpenAI service:', error);
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
        suggestion: 'Please add your OpenAI API key to the .env file'
      };
    }
    
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      console.log(`Testing API key starting with: ${apiKey?.substring(0, 10)}...`);
      
      // Check if it's still a demo/placeholder key
      if (apiKey?.includes('Demo') || apiKey?.includes('YOUR_ACTUAL') || apiKey?.includes('ReplaceWith')) {
        return {
          valid: false,
          reason: 'Using placeholder/demo API key',
          suggestion: 'Please replace with your actual OpenAI API key'
        };
      }
      
      // Simple test to verify the API key works
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Test message" }],
        max_tokens: 10
      });
      
      return {
        valid: true,
        model: 'gpt-3.5-turbo'
      };
    } catch (error) {
      console.error('API key validation error:', error);
      
      let reason = 'API key validation failed';
      let suggestion = 'Please check if the API key is valid and has sufficient quota';
      
      if (error.message?.includes('invalid_api_key') || error.message?.includes('Incorrect API key')) {
        reason = 'Invalid API key';
        suggestion = 'Your API key is invalid. Please generate a new one from OpenAI';
      } else if (error.message?.includes('quota') || error.message?.includes('billing')) {
        reason = 'API quota exceeded or billing issue';
        suggestion = 'Check your OpenAI account billing and usage limits';
      } else if (error.message?.includes('rate_limit')) {
        reason = 'Rate limit exceeded';
        suggestion = 'Too many requests. Please wait and try again';
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
    if (this.apiKeyMissing) {
      console.warn('OpenAI API call attempted without API key');
      return {
        content: `Hi! I'm your AI Career Advisor. I'm currently running in demonstration mode. Please configure a valid OpenAI API key to enable full AI capabilities.\n\n**For your question: "${userMessage}"**\n\n${this.getFallbackResponse(userMessage)}`,
        success: false,
        timestamp: new Date(),
        demoMode: true
      };
    }

    try {
      console.log('Generating career advice with OpenAI for:', userMessage);

      const systemPrompt = `You are a professional AI Career Advisor. Help users with career guidance, skill development, job search strategies, and professional growth. 

User Profile: ${userProfile ? JSON.stringify(userProfile, null, 2) : 'Not provided'}

Provide helpful, actionable advice that is:
- Professional and supportive
- Specific and actionable
- Based on current industry trends
- Tailored to the user's experience level and goals

Format your response with clear sections using markdown formatting when appropriate.`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content in OpenAI response');
      }

      return {
        content: content,
        success: true,
        timestamp: new Date(),
        model: 'gpt-3.5-turbo',
        demoMode: false
      };

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      // Return fallback response with error info
      return {
        content: `I'm experiencing technical difficulties connecting to the AI service. Here's some helpful career guidance based on your query:

**${userMessage}**

${this.getFallbackResponse(userMessage)}

**Technical Details:** ${error.message}

**Next Steps:**
• Try again in a moment  
• Check if you have a valid OpenAI API key configured
• Contact support if this issue persists`,
        success: false,
        timestamp: new Date(),
        error: error.message,
        demoMode: false
      };
    }
  }

  getFallbackResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('career change') || message.includes('transition')) {
      return `**Career Transition Guidance:**
• Research your target industry and role requirements
• Identify transferable skills from your current experience
• Network with professionals in your desired field
• Consider taking relevant courses or certifications
• Start with side projects to build experience`;
    }
    
    if (message.includes('skill') || message.includes('learn')) {
      return `**Skill Development Recommendations:**
• Identify key skills required in your target role through job postings
• Take online courses on platforms like Coursera, edX, or LinkedIn Learning
• Practice through hands-on projects and build a portfolio
• Seek mentorship from industry professionals
• Focus on both technical skills and soft skills (communication, leadership)`;
    }
    
    if (message.includes('interview') || message.includes('job search')) {
      return `**Job Search & Interview Tips:**
• Tailor your resume for each application
• Practice common interview questions
• Research the company and role thoroughly
• Prepare specific examples using the STAR method
• Follow up professionally after interviews`;
    }
    
    if (message.includes('salary') || message.includes('negotiate')) {
      return `**Salary Negotiation Strategy:**
• Research market rates for your role and location
• Document your achievements and value proposition
• Practice your negotiation conversation
• Consider the total compensation package, not just salary
• Be prepared to justify your request with data`;
    }
    
    return `**General Career Guidance:**
• Set clear, measurable career goals
• Continuously develop your skills and stay updated with industry trends
• Build and maintain professional relationships
• Seek feedback regularly and act on it
• Consider working with a mentor or career coach`;
  }
}

// Export a singleton instance
const openaiService = new OpenAIService();
export default openaiService;
