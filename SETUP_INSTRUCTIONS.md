# Setup Instructions - Registration Form

## How It Works

This registration form sends data **directly to WhatsApp** without requiring a database.

### Flow:
1. User fills out the registration form
2. Form validates the data
3. User is redirected to WhatsApp with pre-filled message
4. User clicks "Send" to submit to **078 029 6688**

## No Database Setup Required! ✅

The app has been simplified to skip database storage entirely. All registrations go straight to WhatsApp.

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to test the form.

## Production Deployment

The app is already deployed to Vercel and will automatically redeploy when you push to the `main` branch.

**Live URL:** https://prophetic-school-signup-main.vercel.app

## Environment Variables (Optional)

The Supabase environment variables in `.env` are not used since we removed database storage. You can ignore them or remove them if you want.

## WhatsApp Integration

The WhatsApp number is hardcoded to: **27780296688** (South African format: 078 029 6688)

To change it, edit: `src/lib/registration-schema.ts` line with `wa.me/27780296688`

## Features

- ✅ Full form validation (name, email, phone, age, etc.)
- ✅ Character limits on all fields
- ✅ Beautiful, responsive UI
- ✅ Direct WhatsApp integration
- ✅ Pre-formatted message with all registration details
- ✅ No database required - simple and fast!
