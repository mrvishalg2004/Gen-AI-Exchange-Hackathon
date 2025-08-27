// Simple API key test utility
// You can run this in the browser console to test your API key

window.testGeminiAPI = async function() {
  console.log('Testing Gemini API...');
  
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('❌ API key not found in environment variables');
      return { success: false, error: 'API key not configured' };
    }
    
    console.log('✓ API key found:', apiKey.substring(0, 10) + '...');
    
    // Import Google Generative AI
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    console.log('✓ Model initialized');
    
    const result = await model.generateContent('Hello, please respond with "API test successful"');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ API test successful!');
    console.log('Response:', text);
    
    return { success: true, response: text };
    
  } catch (error) {
    console.error('❌ API test failed:', error);
    return { success: false, error: error.message };
  }
};

// Auto-run test when this script loads
setTimeout(() => {
  if (typeof window !== 'undefined') {
    console.log('Gemini API test utility loaded. Run window.testGeminiAPI() to test your API key.');
  }
}, 1000);

console.log('Gemini API test utility initialized');
