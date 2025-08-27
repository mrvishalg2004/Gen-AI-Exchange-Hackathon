// API Key Diagnostic Tool
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Tests a Gemini API key directly
 * @param {string} apiKey - The API key to test
 * @returns {Promise<Object>} - Test result
 */
export async function testGeminiApiKey(apiKey) {
  console.log('Testing Gemini API key...');
  
  try {
    // Check for empty or undefined key
    if (!apiKey) {
      return {
        valid: false,
        error: 'API key is empty or undefined',
        suggestion: 'Please provide a valid Gemini API key'
      };
    }
    
    // Check for common formatting issues
    if (apiKey.includes('"') || apiKey.includes("'") || apiKey.includes(' ')) {
      console.warn('Warning: API key contains quotes or spaces. Cleaning key...');
      apiKey = apiKey.replace(/['"]/g, '').trim();
    }
    
    // Basic format validation (simple check for Gemini API key format)
    if (!apiKey.startsWith('AIza')) {
      return {
        valid: false,
        error: 'API key format is invalid',
        suggestion: 'Gemini API keys typically start with "AIza"'
      };
    }
    
    // Test the API key with a simple request
    console.log('Initializing Gemini model...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    console.log('Sending test request...');
    const result = await model.generateContent('Hello, this is a test message to validate the API key.');
    const response = await result.response;
    const text = response.text();
    
    return {
      valid: true,
      response: text,
      key: `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 5)}` // Show truncated key for security
    };
  } catch (error) {
    console.error('API key test failed:', error);
    
    // Analyze error message for specific issues
    let suggestion = 'Check if the API key is valid and has sufficient quota';
    if (error.message?.includes('API key not valid')) {
      suggestion = 'The API key is invalid or revoked. Generate a new key from Google AI Studio.';
    } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      suggestion = 'Your API key has reached its quota limit. Wait or request a new key.';
    } else if (error.message?.includes('network') || error.message?.includes('connect')) {
      suggestion = 'Network connectivity issue. Check your internet connection.';
    }
    
    return {
      valid: false,
      error: error.message,
      suggestion: suggestion
    };
  }
}

/**
 * Tests the currently configured API key from environment variables
 */
export async function testCurrentApiKey() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  return await testGeminiApiKey(apiKey);
}

// Export function to execute in console for debugging
const apiKeyDiagnosticTools = { testGeminiApiKey, testCurrentApiKey };
export default apiKeyDiagnosticTools;
