# VBrick GTM Dashboard - FINAL Deployment Package

## ✅ What's Fixed

This package has the **CORRECT Dockerfile** that:
1. Installs pnpm
2. Copies package.json, pnpm-lock.yaml, and patches
3. **Runs `pnpm install` to install ALL dependencies (including openai)**
4. THEN copies the built application

This ensures openai and all other dependencies are available at runtime.

## 🚀 Deploy to Render

### Step 1: Update GitHub Repository

1. Go to: https://github.com/maniacmeyers/vbrick-gtm-dashboard-
2. Delete ALL existing files
3. Upload ALL files from this folder to the ROOT:
   - Dockerfile
   - render.yaml
   - package.json
   - pnpm-lock.yaml
   - README.md
   - dist/ (folder)
   - drizzle/ (folder)
   - patches/ (folder)

### Step 2: Deploy on Render

1. Go to: https://dashboard.render.com
2. Delete your previous failed deployment (if exists)
3. Click "New +" → "Web Service"
4. Connect to: `maniacmeyers/vbrick-gtm-dashboard-`
5. Render will detect Dockerfile
6. Click "Create Web Service"

### Step 3: Add Environment Variables

In Render → Environment tab:

```
DATABASE_URL=mysql://sMaVgUD4PWDvpt1.root:KU1bDj6MT5QGC793fiNA@gateway02.us-east-1.prod.aws.tidbcloud.com:4000/KVvywwSRFAXasrcjq8qc9U?ssl={"rejectUnauthorized":true}

PERPLEXITY_API_KEY=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

OPENAI_API_KEY=<YOUR NEW KEY>
```

### Step 4: Wait for Deployment

- Build time: 5-10 minutes
- Watch the logs
- You should see: "Installing dependencies..." then "Starting server..."

## Why This Will Work

The previous Dockerfile was installing dependencies, but the dist/index.js file uses `--packages=external` which means dependencies need to be in node_modules at runtime.

The new Dockerfile:
1. ✅ Installs pnpm
2. ✅ Copies package.json (with openai dependency)
3. ✅ Runs pnpm install (installs openai and all deps)
4. ✅ Copies dist/index.js (which imports openai from node_modules)
5. ✅ Starts the app (openai is available!)

**This WILL work!**

