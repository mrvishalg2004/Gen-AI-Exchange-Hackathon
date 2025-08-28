require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listAvailableModels() {
  try {
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('API key is missing');
      return;
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    console.log('Trying to list available models...');

    // Check if the GoogleGenerativeAI instance has a listModels method
    if (typeof genAI.listModels === 'function') {
      const models = await genAI.listModels();
      console.log('Available models:', models);
    } else {
      console.log('listModels method not available in this version of the library');
    }
    
    // Try a known working model
    const modelNames = [
      'gemini-pro',
      'gemini-1.0-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash'
    ];
    
    for (const modelName of modelNames) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Test');
        const response = await result.response;
        const text = response.text();
        console.log(`✅ ${modelName} worked! Response: ${text.substring(0, 50)}...`);
      } catch (error) {
        console.error(`❌ ${modelName} failed: ${error.message}`);
      }
    }
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listAvailableModels();
