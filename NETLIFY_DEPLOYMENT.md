# Netlify Deployment Guide

## 🚀 Quick Deploy Steps

### 1. **Fix Build Configuration** ✅
- Changed `vite.config.mjs` to output to `dist` directory
- Added `netlify.toml` configuration file

### 2. **Set Environment Variables in Netlify**

#### Option A: Via Netlify Dashboard
1. Go to your Netlify site dashboard
2. Click **Site settings** → **Environment variables**
3. Click **Add a variable**
4. Add:
   ```
   Key: VITE_GEMINI_API_KEY
   Value: your_actual_gemini_api_key
   ```
5. Click **Save**

#### Option B: Via Netlify CLI
```bash
netlify env:set VITE_GEMINI_API_KEY your_actual_gemini_api_key
```

### 3. **Deploy Settings**
```toml
# netlify.toml (already created)
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html" 
  status = 200
```

## 📋 **Before Deploying**

### Local Test Build
```bash
npm run build
```
Should create a `dist` folder with all assets.

### Commit Changes
```bash
git add .
git commit -m "Fix Netlify deployment configuration"
git push origin main
```

## 🔧 **Netlify Build Settings**

If you're setting up via Netlify UI:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18 (set in netlify.toml)

## ⚠️ **Common Issues & Solutions**

### Issue 1: "Build script returned non-zero exit code: 2"
- **Cause**: Missing environment variables or build errors
- **Solution**: Set `VITE_GEMINI_API_KEY` in Netlify environment variables

### Issue 2: "Deploy directory 'dist' does not exist"
- **Cause**: Build failed before creating output directory
- **Solution**: Fix build errors first, ensure vite.config.mjs uses `outDir: "dist"`

### Issue 3: "404 on page refresh"
- **Cause**: Missing SPA redirect rules
- **Solution**: Added redirects in netlify.toml (already done)

### Issue 4: "API key not found in production"
- **Cause**: Environment variable not set in Netlify
- **Solution**: Add VITE_GEMINI_API_KEY to Netlify environment variables

## 🎯 **Final Checklist**

- ✅ Build outputs to `dist` directory
- ✅ Environment variables set in Netlify
- ✅ Netlify.toml configuration file created
- ✅ Local build test successful
- ✅ Changes committed and pushed to GitHub
- ✅ SPA routing configured for React

## 🚀 **Deploy Now**

1. Push your changes to GitHub
2. Netlify will automatically trigger a new build
3. Check the build logs for any remaining issues
4. Your app should be live!

## 📊 **Build Performance**

Current build size: ~3.6 MB (large due to PDF.js)
- Consider code splitting for production optimization
- Current size is acceptable for most use cases
