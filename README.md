# VBrick GTM Dashboard - Auth Bypass Version

This version has authentication temporarily disabled for testing purposes.

## What's Different

- **No login required** - The app automatically logs you in as a test user
- All features are accessible immediately
- Google OAuth will be added in the next update

## Deploy to Render

1. Upload all files to your GitHub repository root
2. Deploy to Render (it will auto-detect changes)
3. **No additional environment variables needed for auth**
4. Access your app and start testing!

## Environment Variables Required

```
DATABASE_URL=<your TiDB connection string>
PERPLEXITY_API_KEY=<your Perplexity API key>
OPENAI_API_KEY=<your OpenAI API key>
```

## Testing the App

Once deployed, you can immediately:
- ✅ View all 38 target accounts
- ✅ Add new accounts
- ✅ Generate Sales Account Plans
- ✅ Upload meeting notes
- ✅ Use the Chat Assistant
- ✅ Export plans to PDF/Markdown/JSON

## Next Steps

After testing, we'll add proper Google OAuth authentication in the next update.

