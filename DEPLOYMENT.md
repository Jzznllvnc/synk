# Deployment Guide for Synk

This guide walks you through deploying Synk to production using free tiers of Vercel and Supabase.

## Prerequisites

- GitHub account
- Supabase account (free tier)
- Vercel account (free tier) OR Netlify account

## Step 1: Supabase Production Setup

### 1.1 Create Production Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: synk-production
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for setup to complete

### 1.2 Run Database Migrations

1. Go to **SQL Editor** in Supabase Dashboard
2. Click "New Query"
3. Copy contents from `supabase/schema.sql`
4. Paste and click "Run"
5. Verify success message

### 1.3 Set Up Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Click "Create bucket"
3. Enter bucket name: `user-files`
4. **Make it Private** (uncheck public)
5. Click "Create bucket"

### 1.4 Apply Storage Policies

1. Go back to **SQL Editor**
2. Click "New Query"
3. Copy contents from `supabase/storage-policy.sql`
4. Paste and click "Run"
5. Verify success message

### 1.5 Get API Credentials

1. Go to **Settings** > **API**
2. Copy the following values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (long string)
3. Save these somewhere safe - you'll need them for deployment

### 1.6 (Optional) Configure OAuth Providers

For Google/GitHub login:

1. Go to **Authentication** > **Providers**
2. Enable desired providers (Google, GitHub, etc.)
3. Follow provider-specific setup instructions
4. Add redirect URLs:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://your-domain.com/auth/callback`

## Step 2: Deploy to Vercel

### 2.1 Push to GitHub

```bash
# Initialize git if not done already
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/synk.git
git branch -M main
git push -u origin main
```

### 2.2 Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." > "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 2.3 Add Environment Variables

In Vercel project settings, add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2.4 Deploy

1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Your app is live! 🎉

### 2.5 Custom Domain (Optional)

1. Go to Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update Supabase OAuth redirect URLs

## Step 3: Alternative - Deploy to Netlify

### 3.1 Push to GitHub

Same as Vercel step 2.1

### 3.2 Import to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### 3.3 Add Environment Variables

In Netlify site settings > Environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3.4 Deploy

Click "Deploy site" and wait for completion.

## Step 4: Post-Deployment

### 4.1 Test Your Application

1. Visit your deployed URL
2. Test sign up / login
3. Create a task, note, upload a file, create an event
4. Verify everything works correctly

### 4.2 Update OAuth Redirect URLs

If using OAuth providers:
1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Update **Site URL** to your production domain
3. Update **Redirect URLs** to include production URL

### 4.3 Monitor Performance

- **Vercel**: Check Analytics tab for performance metrics
- **Supabase**: Monitor Database > Table Editor for data
- **Supabase**: Check Storage for uploaded files

## Step 5: Continuous Deployment

### Automatic Deploys

Both Vercel and Netlify automatically deploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Add new feature"
git push

# Vercel/Netlify will automatically rebuild and deploy
```

### Preview Deployments

- **Vercel**: Every pull request gets a preview URL
- **Netlify**: Every branch gets a unique URL

## Free Tier Limits

### Supabase Free Tier
- 500MB database storage
- 1GB file storage
- 2GB bandwidth per month
- 50,000 monthly active users
- Row Level Security included

### Vercel Free Tier
- 100GB bandwidth per month
- Unlimited deployments
- Automatic HTTPS
- Custom domains (1 per project)

### Netlify Free Tier
- 100GB bandwidth per month
- 300 build minutes per month
- Automatic HTTPS
- Custom domains

## Troubleshooting

### Build Fails

**Error: TypeScript errors**
```bash
# Run locally first
npm run build

# Fix any TypeScript errors before pushing
```

**Error: Environment variables not found**
- Verify variables are added in Vercel/Netlify dashboard
- Redeploy after adding variables

### Supabase Connection Issues

**Error: Invalid API key**
- Verify environment variables are correct
- Check for trailing spaces or newlines
- Ensure variables start with `NEXT_PUBLIC_`

**Error: RLS policy violation**
- Verify all policies are applied from `schema.sql`
- Check that auth is working correctly

### File Upload Issues

**Error: Storage bucket not found**
- Verify bucket name is exactly `user-files`
- Ensure bucket is created in Supabase

**Error: Permission denied**
- Verify storage policies from `storage-policy.sql` are applied
- Check that bucket is set to private

## Performance Optimization

### 1. Image Optimization

Add to `next.config.js`:
```js
images: {
  domains: ['your-project-id.supabase.co'],
}
```

### 2. Enable Caching

Vercel automatically handles caching. For Netlify, add `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3. Database Indexes

The schema already includes optimized indexes. Monitor slow queries in Supabase Dashboard.

## Monitoring & Analytics

### Vercel Analytics

Enable in project settings:
1. Go to Analytics tab
2. Enable Vercel Analytics
3. View real-time metrics

### Supabase Monitoring

1. Go to Database > Query Performance
2. Monitor slow queries
3. Check storage usage

## Backup Strategy

### Database Backups

Supabase automatically backs up your database daily. To manually backup:
1. Go to Settings > Database
2. Click "Download database backup"

### Storage Backups

Consider periodic downloads of critical user files.

## Scaling Considerations

When you outgrow free tiers:

### Supabase Pro ($25/month)
- 8GB database storage
- 100GB file storage
- 250GB bandwidth
- Daily backups

### Vercel Pro ($20/month)
- 1TB bandwidth
- Advanced analytics
- Team collaboration

## Security Checklist

- [ ] Environment variables are secure (never in code)
- [ ] RLS policies are enabled on all tables
- [ ] Storage bucket is private
- [ ] HTTPS is enabled (automatic)
- [ ] OAuth redirect URLs are correct
- [ ] Database password is strong
- [ ] Regular security updates (`npm update`)

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

🎉 Congratulations! Your Synk app is now live and ready for users!

