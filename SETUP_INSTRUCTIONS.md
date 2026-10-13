# Setup Instructions - Fix Registration Issue

## Problem
Registration fails with "Your registration could not be saved. Please try again."

## Root Cause
Missing `SUPABASE_SERVICE_ROLE_KEY` environment variable and database table not created.

## Solution

### Step 1: Get Your Supabase Service Role Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/sjkxxoqgyeovnfqsdbca
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **API** 
4. Scroll down to **Project API keys**
5. Copy the **service_role** key (⚠️ Keep this secret!)

### Step 2: Update Local Environment Variables

1. Open the `.env` file in this project
2. Replace `YOUR_SERVICE_ROLE_KEY_HERE` with your actual service role key:
   ```
   SUPABASE_SERVICE_ROLE_KEY="eyJhbGc...your-actual-key-here"
   ```

### Step 3: Create the Database Table

Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard/project/sjkxxoqgyeovnfqsdbca/sql/new):

```sql
CREATE TABLE public.course_registrations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 surname text NOT NULL CHECK (char_length(surname) BETWEEN 1 AND 100),
 dob date NOT NULL,
 email text NOT NULL CHECK (char_length(email) <= 255),
 address text NOT NULL CHECK (char_length(address) BETWEEN 1 AND 500),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 25),
 church_name text NOT NULL CHECK (char_length(church_name) BETWEEN 1 AND 200),
 gifting text NOT NULL CHECK (char_length(gifting) BETWEEN 1 AND 200),
 reason text NOT NULL CHECK (char_length(reason) BETWEEN 1 AND 2000)
);

GRANT ALL ON public.course_registrations TO service_role;
ALTER TABLE public.course_registrations ENABLE ROW LEVEL SECURITY;
```

Click **Run** to execute the SQL.

### Step 4: Update Vercel Environment Variables

1. Go to your Vercel dashboard: https://vercel.com/lunexhubs-projects/prophetic-school-signup-main/settings/environment-variables
2. Add the following environment variable:
   - **Name:** `SUPABASE_SERVICE_ROLE_KEY`
   - **Value:** (paste your service role key from Step 1)
   - **Environment:** Production, Preview, Development (select all)
3. Click **Save**
4. Go to **Deployments** and click **Redeploy** on the latest deployment

### Step 5: Test Locally

```bash
npm run dev
```

Then test the registration form at http://localhost:3000

### Step 6: Test Production

Visit https://prophetic-school-signup-main.vercel.app and test the registration.

## Security Note

⚠️ **NEVER commit the `.env` file to Git!** 

The `.env` file is already in `.gitignore` to prevent accidentally exposing your secrets.

## What This Does

- The Service Role Key allows server-side operations to bypass Row Level Security (RLS)
- The table stores all registration submissions
- Only the server can write to this table (users cannot read or write directly)
- Submissions are private and secure
