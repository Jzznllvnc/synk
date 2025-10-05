# Synk - Multi-User Productivity Web App

![Synk Logo](./public/Synk.svg)

**Synk** is a comprehensive multi-user productivity platform built with modern web technologies. It combines task management, notes, file storage, calendar/events, and a unified dashboard into one seamless experience.

## 🚀 Features

### ✅ Task Management
- Create, update, and delete tasks
- Set priorities (low, medium, high, urgent)
- Track task status (to-do, in progress, completed)
- Set deadlines with due dates
- Filter and organize tasks

### 📝 Notes
- Rich markdown editor with live preview
- Tag-based organization
- Favorite important notes
- Full-text search across all notes
- Beautiful card-based UI

### 📁 File Storage
- Secure file uploads to Supabase Storage
- Private file access (RLS enforced)
- File metadata tracking
- Download and delete capabilities
- Storage usage tracking

### 📅 Calendar & Events
- Interactive monthly calendar view
- List view for upcoming events
- Event creation with reminders
- Color-coded events
- All-day event support
- Location tracking

### 🎯 Dashboard
- Overview of all modules
- Quick stats and metrics
- Recent activity across all features
- Task completion tracking
- Upcoming events preview

### 🔐 Authentication
- Email/password authentication
- OAuth support (Google, GitHub)
- Password reset functionality
- Secure session management
- User profile management

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Heroicons
- **State Management**: Zustand (if needed), React hooks
- **Markdown**: SimpleMDE + React Markdown
- **Date Handling**: date-fns

### Backend & Database
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with @supabase/ssr
- **Storage**: Supabase Storage
- **Real-time** (optional): Supabase Realtime

### Deployment
- **Frontend**: Vercel / Netlify
- **Backend**: Supabase (free tier)
- **Cost**: $0 (completely free on free tiers)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd synk
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the database to initialize

2. **Run Database Migrations**
   - Go to SQL Editor in Supabase Dashboard
   - Copy and paste the contents of `supabase/schema.sql`
   - Click "Run" to execute

3. **Set Up Storage**
   - Go to Storage in Supabase Dashboard
   - Create a new bucket named `user-files`
   - Set it to **Private** (not public)
   - Run `supabase/storage-policy.sql` in SQL Editor

4. **Get API Credentials**
   - Go to Settings > API
   - Copy your `Project URL` and `anon/public` key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Deploy!

### Deploy to Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Same as Vercel

## 📁 Project Structure

```
synk/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   │   ├── login/                # Login page
│   │   └── signup/               # Sign up page
│   ├── dashboard/                # Main application
│   │   ├── layout.tsx            # Dashboard layout
│   │   ├── page.tsx              # Dashboard home
│   │   ├── tasks/                # Tasks module
│   │   ├── notes/                # Notes module
│   │   ├── files/                # Files module
│   │   └── calendar/             # Calendar module
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing/redirect page
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   └── Sidebar.tsx               # Navigation sidebar
├── lib/                          # Utility functions
│   ├── supabase.ts               # Supabase client
│   ├── auth.ts                   # Auth helpers
│   ├── storage.ts                # Storage helpers
│   ├── database.types.ts         # TypeScript types
│   └── hooks/                    # Custom React hooks
│       ├── useAuth.ts
│       ├── useTasks.ts
│       ├── useNotes.ts
│       ├── useFiles.ts
│       └── useEvents.ts
├── supabase/                     # Database schema & migrations
│   ├── schema.sql                # Main database schema
│   ├── storage-policy.sql        # Storage RLS policies
│   └── README.md                 # Supabase setup guide
├── assets/                       # Static assets
│   └── brand-logo/
│       └── Synk.svg              # App logo
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── tailwind.config.js            # Tailwind CSS config
└── next.config.js                # Next.js config
```

## 🔒 Security Features

### Row Level Security (RLS)
All database tables have RLS policies that ensure:
- Users can only access their own data
- No cross-user data leakage
- Automatic user_id filtering on all queries

### File Storage Security
- Private storage bucket
- Folder-level isolation per user
- Signed URLs for temporary access
- Automatic cleanup on user deletion

### Authentication
- Secure session management via Supabase Auth
- Password hashing and salting
- Email verification (optional)
- OAuth support for social logins

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js` to customize the primary color palette:

```js
colors: {
  primary: {
    50: '#f0f9ff',
    // ... customize colors
    900: '#0c4a6e',
  },
}
```

### Adding New Modules
1. Create database table in `supabase/schema.sql`
2. Add types to `lib/database.types.ts`
3. Create custom hook in `lib/hooks/`
4. Build UI component in `app/dashboard/[module]/`
5. Add navigation link in `components/Sidebar.tsx`

### UI Components
The app uses utility classes defined in `globals.css`:
- `.card` - White card with shadow
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.input` - Form input field
- `.label` - Form label

## 📊 Database Schema Overview

### Tables
- **tasks**: To-do items with priorities and deadlines
- **notes**: Markdown notes with tags
- **files**: File metadata (actual files in Storage)
- **events**: Calendar events with reminders
- **profiles**: Extended user profile data

### Relationships
All tables are linked to `auth.users` via `user_id` with cascade delete.

## 🔧 Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Check TypeScript errors: `npm run build`

### Supabase Connection Issues
- Verify environment variables are set correctly
- Check Supabase project status
- Ensure RLS policies are enabled

### File Upload Issues
- Verify storage bucket is created
- Check storage policies are applied
- Ensure bucket is set to private

## 🤝 Contributing

This project is built incrementally. To add features:

1. Follow the modular structure
2. Add database migrations if needed
3. Create TypeScript types
4. Build custom hooks for data access
5. Create UI components
6. Test thoroughly

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🎯 Roadmap

Future enhancements to consider:

- [ ] Team collaboration features
- [ ] Real-time updates with Supabase Realtime
- [ ] File sharing between users
- [ ] Advanced search and filtering
- [ ] Mobile app (React Native)
- [ ] Export functionality (PDF, CSV)
- [ ] Dark mode toggle
- [ ] Notifications system
- [ ] Analytics dashboard
- [ ] Integration with third-party services

## 💡 Best Practices Implemented

1. **Type Safety**: Full TypeScript coverage
2. **Security**: Row Level Security on all tables
3. **Performance**: Optimized queries with indexes
4. **UX**: Loading states, error handling, toast notifications
5. **Scalability**: Modular architecture for easy expansion
6. **Maintainability**: Clear folder structure and naming conventions

## 📞 Support

For issues or questions:
- Check the documentation in `supabase/README.md`
- Review Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Review Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

---

Built with ❤️ using Next.js and Supabase

