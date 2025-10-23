# VBrick GTM Dashboard - Render.com Deployment

## Quick Deploy to Render.com

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (or email)
3. Verify your email

### Step 2: Deploy from Dashboard

1. **Click "New +" → "Web Service"**

2. **Select "Deploy from GitHub"** (or use "Public Git Repository")
   - If using GitHub: Connect your GitHub account and select the repo
   - If using Public Git: You'll need to push this code to a Git repo first

### Alternative: Manual Deploy (Easier)

1. **Upload this folder to GitHub:**
   - Create a new repository on GitHub
   - Upload all files from this folder
   - Make it public or connect Render to your GitHub

2. **In Render Dashboard:**
   - Click "New +" → "Web Service"
   - Connect to your GitHub repository
   - Render will auto-detect the `render.yaml` configuration

3. **Set Environment Variables:**
   - In the Render dashboard, go to "Environment"
   - Add these three variables:

```
DATABASE_URL=mysql://sMaVgUD4PWDvpt1.root:KU1bDj6MT5QGC793fiNA@gateway02.us-east-1.prod.aws.tidbcloud.com:4000/KVvywwSRFAXasrcjq8qc9U?ssl={"rejectUnauthorized":true}

PERPLEXITY_API_KEY=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

OPENAI_API_KEY=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
```

4. **Click "Create Web Service"**

5. **Wait 2-3 minutes** for deployment

6. **Your app will be live** at `https://your-app-name.onrender.com`

## What's Included

- ✅ Pre-built application (no build step needed)
- ✅ 38 target accounts + iHeartMedia
- ✅ Sales Account Plan system (MEDDICC/SPICED/Command of Message)
- ✅ Meeting Notes integration
- ✅ Chat Assistant
- ✅ Intelligence gathering
- ✅ Export functionality

## Configuration

The `render.yaml` file contains all deployment configuration:
- **Runtime**: Node.js 22
- **Build Command**: `echo "Build already completed"` (skips build)
- **Start Command**: `node dist/index.js`
- **Environment Variables**: DATABASE_URL, PERPLEXITY_API_KEY, OPENAI_API_KEY

## Free Tier

Render's free tier includes:
- 750 hours/month of runtime
- Automatic HTTPS
- Custom domains
- Automatic deploys from Git

**Note**: Free tier services spin down after 15 minutes of inactivity. First request after spin-down takes ~30 seconds.

## Troubleshooting

### Deployment fails
- Check that all files are uploaded (dist/, drizzle/, patches/, package.json, pnpm-lock.yaml)
- Verify environment variables are set correctly
- Check Render logs for specific errors

### App shows "Service Unavailable"
- Wait 30 seconds for the service to spin up (free tier)
- Check Render logs for errors

### Database connection issues
- Verify DATABASE_URL is correct
- Ensure TiDB Cloud allows connections from Render IPs

### API calls fail
- Verify PERPLEXITY_API_KEY and OPENAI_API_KEY are set
- Check that keys have credits available

## Support

For Render-specific issues, check:
- Render Dashboard → Logs
- Render Dashboard → Events
- https://render.com/docs

---

**Version:** 2.0 - Enhanced Sales Account Plan System
**Platform:** Render.com
**Last Updated:** October 22, 2025

