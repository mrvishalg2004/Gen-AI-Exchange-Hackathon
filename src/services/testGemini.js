// Test script for Gemini API integration
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Test the Gemini API connection
 * @param {string} apiKey - The Gemini API key to test
 * @returns {Promise<Object>} - Result of the test
 */
export async function testGeminiConnection(apiKey) {
  try {
    console.log('Testing Gemini API connection...');
    
    if (!apiKey) {
      return {
        success: false,
        error: 'API key is missing',
        details: 'Please provide a valid Gemini API key'
      };
    }
    
    // Create a new instance for testing
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Simple test prompt
    const result = await model.generateContent('Hello, can you give me a simple test response?');
    const response = await result.response;
    const text = response.text();
    
    return {
      success: true,
      response: text,
      details: 'API connection successful'
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      details: 'Failed to connect to Gemini API'
    };
  }
}

// Export a function that can be called to test the current API key
export function checkCurrentApiKey() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log('API Key present:', !!apiKey);
  
  if (!apiKey) {
    console.error('API key is not set in the environment variables');
    return;
  }
  
  return testGeminiConnection(apiKey);
}
