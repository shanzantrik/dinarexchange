# OAuth Redirect Fix - Step by Step

## Current Issue
OAuth is still redirecting to localhost instead of your Vercel URL.

## Solution Steps

### 1. Update Google OAuth Configuration

**Add this redirect URI to your Google OAuth:**
```
https://dinarexchangeau.vercel.app/auth/callback
```

**Your Google OAuth should now have:**
- ✅ `https://dinarexchangeau.vercel.app` (JavaScript origins)
- ✅ `http://localhost:3000` (JavaScript origins)
- ✅ `https://dinarexchangeau.vercel.app/auth/callback` (Redirect URIs) ← **ADD THIS**
- ✅ `https://kvznaawjfqeibtamstul.supabase.co/auth/v1/callback` (Redirect URIs)

### 2. Update Supabase Dashboard

**Go to Supabase Dashboard → Authentication → URL Configuration**

**Set Site URL to:**
```
https://dinarexchangeau.vercel.app
```

**Go to Supabase Dashboard → Authentication → Providers → Google**

**Add these Redirect URLs:**
```
https://dinarexchangeau.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

### 3. Update Vercel Environment Variables

**In your Vercel dashboard, set:**
```
NEXT_PUBLIC_SITE_URL=https://dinarexchangeau.vercel.app
```

### 4. Test the Fix

**Development:**
```bash
npm run dev
# Should redirect to: http://localhost:3000/auth/callback
```

**Production:**
```bash
# Deploy to Vercel
# Should redirect to: https://dinarexchangeau.vercel.app/auth/callback
```

### 5. Clear Browser Cache

1. Clear browser cache and cookies
2. Try in incognito/private mode
3. Test OAuth flow again

### 6. Verify the Fix

**Check these URLs work:**
- ✅ `https://dinarexchangeau.vercel.app/auth/signin`
- ✅ `https://dinarexchangeau.vercel.app/auth/signup`
- ✅ `https://dinarexchangeau.vercel.app/auth/callback`

## Quick Commands

```bash
# Deploy the updated code
git add .
git commit -m "Fix OAuth redirect to use correct Vercel URL"
git push origin main

# The Vercel deployment will automatically use the updated code
```

## Troubleshooting

**If still not working:**
1. Check Vercel environment variables
2. Verify Google OAuth redirect URIs
3. Check Supabase dashboard settings
4. Clear browser cache completely
5. Test in different browser/incognito mode 