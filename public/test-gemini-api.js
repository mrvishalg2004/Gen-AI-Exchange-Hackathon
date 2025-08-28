// Direct API key test
const testApiKey = async () => {
  const apiKey = 'your_api_key_here'; // Replace with your actual API key
  
  try {
    console.log('Testing Gemini API key directly...');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Hello, this is a test message.'
            }]
          }]
        })
      }
    );
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API key is valid!');
      console.log('Response:', data);
      return { success: true, data };
    } else {
      console.error('❌ API key validation failed');
      console.error('Error response:', data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error('❌ Network error:', error);
    return { success: false, error: error.message };
  }
};

// Run the test
testApiKey();
