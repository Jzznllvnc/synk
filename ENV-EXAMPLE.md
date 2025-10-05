# Environment Variables

Create a `.env.local` file in the root directory with these values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration (Nodemailer with Gmail)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your_16_character_app_password

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3002
```

## How to Get Values:

### Supabase:
1. Go to your Supabase project dashboard
2. Settings → API
3. Copy Project URL and anon/public key

### Gmail SMTP:
1. Go to https://myaccount.google.com/apppasswords
2. Create app password for "Synk"
3. Copy the 16-character password

**Important:** Never commit `.env.local` to git!

