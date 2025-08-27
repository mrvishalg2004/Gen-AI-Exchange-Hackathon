# Gemini AI Integration Setup Guide

## Getting Your Gemini API Key

1. **Visit Google AI Studio:**
   - Go to https://ai.google.dev/
   - Click on "Get API Key" or "Start building"

2. **Create/Login to Google Account:**
   - Use your Google account to sign in
   - Accept the terms of service

3. **Generate API Key:**
   - Click "Create API Key"
   - Select or create a Google Cloud project
   - Copy the generated API key (starts with "AIza...")

## Setting up the API Key

1. **Update the .env file:**
   ```
   VITE_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   
   **Important Notes:**
   - Replace `YOUR_ACTUAL_GEMINI_API_KEY_HERE` with your real API key
   - Do NOT include quotes around the key
   - Do NOT include spaces before or after the key
   - Make sure the key starts with "AIza"

2. **Restart the development server:**
   ```bash
   npm run start
   ```

## Troubleshooting Common Issues

### "AI service temporarily unavailable"
- **Cause:** API key is missing, invalid, or quota exceeded
- **Solution:** 
  1. Check if VITE_GEMINI_API_KEY is set in .env
  2. Verify the key is valid and not expired
  3. Check your Google Cloud quota limits

### "API key validation failed"
- **Cause:** Invalid API key format or permissions
- **Solution:**
  1. Regenerate your API key from Google AI Studio
  2. Ensure the key has Gemini API permissions
  3. Remove any quotes or spaces from the key

### "Demo mode" messages
- **Cause:** API key is not configured or invalid
- **Solution:** Follow the setup steps above

## Testing Your Setup

1. **Use the diagnostic tools:**
   - Click "Run API Diagnostic" on the welcome screen
   - Check browser console for detailed logs

2. **Try the Quick API Test:**
   - Click the "Quick API Test" button
   - This will send a simple test message

3. **Browser Console Test:**
   - Open browser console (F12)
   - Run: `window.testGeminiAPI()` (if available)

## API Key Security

- Never commit your API key to version control
- Add .env to your .gitignore file
- Use environment variables in production
- Rotate your API key regularly

## Rate Limits and Quotas

- Free tier: Limited requests per minute/day
- Monitor usage in Google Cloud Console
- Upgrade to paid tier if needed

## Support

If you continue to have issues:
1. Check the browser console for error messages
2. Verify your internet connection
3. Try regenerating your API key
4. Contact your system administrator

## Example Working Configuration

```env
# .env file
VITE_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

The key should be approximately 39 characters long and start with "AIza".
