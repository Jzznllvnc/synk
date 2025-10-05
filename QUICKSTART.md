# Quick Start Guide - Synk

Get Synk up and running in 5 minutes! 🚀

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Set Up Supabase (2 min)

1. **Create Account**: Go to [supabase.com](https://supabase.com) and sign up
2. **Create Project**: Click "New Project" and fill in details
3. **Wait**: Project setup takes ~2 minutes

## Step 3: Run Database Setup (1 min)

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Copy everything from `supabase/schema.sql`
4. Paste and click **Run**
5. ✅ Success!

## Step 4: Set Up Storage (30 sec)

1. Go to **Storage** tab
2. Click "Create bucket"
3. Name it: `user-files`
4. Make it **Private** ✓
5. Click "Create"

Then run storage policies:
1. Back to **SQL Editor**
2. Copy from `supabase/storage-policy.sql`
3. Paste and **Run**

## Step 5: Get API Keys (30 sec)

1. Go to **Settings** > **API**
2. Copy these values:
   - Project URL
   - anon public key

## Step 6: Configure Environment (30 sec)

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=paste_your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

## Step 7: Run the App! (10 sec)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## First Steps in the App

1. **Sign Up**: Create your account
2. **Create a Task**: Try the task manager
3. **Write a Note**: Test the markdown editor
4. **Upload a File**: Test file storage
5. **Add an Event**: Create a calendar event
6. **View Dashboard**: See your productivity overview

## Troubleshooting

### "Cannot connect to Supabase"
- Double check your `.env.local` values
- Make sure there are no spaces or quotes around the values
- Restart the dev server after changing `.env.local`

### "Row Level Security policy violation"
- Make sure you ran `schema.sql` completely
- Check that all tables show green checkmarks in Supabase

### "Storage bucket not found"
- Verify bucket name is exactly `user-files`
- Make sure you created it as Private
- Run `storage-policy.sql` in SQL Editor

## What's Next?

- 📚 Read the full [README.md](./README.md)
- 🚀 Deploy to production with [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🎨 Customize colors in `tailwind.config.js`
- ✨ Add new features by following the modular structure

## Project Structure at a Glance

```
app/
  auth/          → Login, signup pages
  dashboard/     → Main app
    tasks/       → Task manager
    notes/       → Note editor
    files/       → File storage
    calendar/    → Calendar & events

lib/
  hooks/         → Data fetching hooks
  auth.ts        → Auth helpers
  storage.ts     → File upload helpers

supabase/
  schema.sql     → Database structure
```

## Key Features

✅ **Tasks** - Full CRUD with priorities and deadlines  
✅ **Notes** - Markdown editor with tags  
✅ **Files** - Secure uploads with Supabase Storage  
✅ **Calendar** - Interactive monthly calendar  
✅ **Dashboard** - Unified overview  
✅ **Auth** - Email/password + OAuth ready  

## Development Tips

- Edit `app/globals.css` for global styles
- Add new tables in `supabase/schema.sql`
- Create hooks in `lib/hooks/` for data
- Use Tailwind utility classes for styling

## Need Help?

- Check `supabase/README.md` for database help
- See `DEPLOYMENT.md` for production setup
- Read inline comments in the code
- Review Supabase docs: [supabase.com/docs](https://supabase.com/docs)

---

Happy coding! 🎉 You're now ready to build with Synk!

