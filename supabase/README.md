# Supabase Setup for Synk

## Database Setup

1. **Create a new Supabase project** at https://supabase.com
2. **Run the schema.sql** in the SQL Editor:
   - Go to SQL Editor in Supabase Dashboard
   - Copy and paste the contents of `schema.sql`
   - Click "Run" to execute

3. **Set up Storage Bucket**:
   - Go to Storage in Supabase Dashboard
   - Create a new bucket named `user-files`
   - Set it to **Private** (not public)
   - Run the `storage-policy.sql` in SQL Editor to set up RLS policies

4. **Get your API credentials**:
   - Go to Settings > API
   - Copy the `Project URL` and `anon/public` key
   - Add them to `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

## Database Schema Overview

### Tables:
- **tasks**: Todo items with priorities, deadlines, and status tracking
- **notes**: Rich text/markdown notes with tags and favorites
- **files**: File metadata linked to Supabase Storage
- **events**: Calendar events with reminders and scheduling
- **profiles**: Extended user profile data

### Security:
- All tables use Row Level Security (RLS)
- Users can only access their own data
- Storage is private with folder-level isolation
- Automatic profile creation on user signup

## Authentication

Supabase Auth is pre-configured for:
- Email/Password authentication
- Social logins (configure in Supabase Dashboard)
- Session management
- Password reset flows

## Optional: Enable Realtime (if needed later)

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE notes;
ALTER PUBLICATION supabase_realtime ADD TABLE events;
```

