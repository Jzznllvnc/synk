# Changelog

All notable changes to the Synk project will be documented in this file.

## [0.2.0] - 2024-10-05

### 🎉 Major Updates - Removed All Deprecation Warnings

#### Updated Dependencies
- **Next.js**: Upgraded from v14.0.4 → v15.0.3
- **React**: Upgraded from v18.2.0 → v18.3.1
- **Supabase Client**: Upgraded from v2.39.0 → v2.45.4
- **Supabase Auth**: Migrated from deprecated `@supabase/auth-helpers-nextjs` → `@supabase/ssr@0.5.2`
- **ESLint**: Upgraded from v8.56.0 → v9.14.0
- **date-fns**: Upgraded from v3.0.6 → v4.1.0
- **TypeScript**: Upgraded from v5.3.3 → v5.6.3
- **Tailwind CSS**: Upgraded from v3.4.0 → v3.4.14
- **All other dependencies**: Updated to latest stable versions

#### Breaking Changes
- **Supabase Auth Migration**: Replaced `createClientComponentClient` with `createBrowserClient` from `@supabase/ssr`
  - This is the recommended approach by Supabase going forward
  - All existing functionality remains the same
  - Better SSR support and performance

#### Improvements
- ✅ Zero deprecation warnings on `npm install`
- ✅ Latest Next.js 15 with improved performance
- ✅ Updated ESLint to v9 with modern config
- ✅ All security patches applied
- ✅ Better TypeScript type inference
- ✅ Improved build times

#### Migration Guide
If you have an existing installation:

1. Delete old dependencies:
   ```bash
   Remove-Item -Recurse -Force node_modules, package-lock.json
   ```

2. Install updated packages:
   ```bash
   npm install
   ```

3. No code changes needed - the migration is handled automatically!

#### What Stayed the Same
- All features work exactly as before
- No breaking changes to your code
- Same API structure
- Same authentication flow
- Same database schema

---

## [0.1.0] - 2024-10-05

### 🎉 Initial Release

#### Features
- ✅ Complete authentication system (email/password + OAuth)
- ✅ Task management with priorities and deadlines
- ✅ Notes with markdown editor
- ✅ File storage with Supabase Storage
- ✅ Calendar with events and reminders
- ✅ Unified dashboard with overview
- ✅ Row Level Security on all tables
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript throughout
- ✅ Complete documentation

#### Tech Stack
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Supabase (PostgreSQL + Auth + Storage)
- Tailwind CSS 3
- Heroicons

#### Documentation
- README.md - Main documentation
- QUICKSTART.md - 5-minute setup guide
- DEPLOYMENT.md - Production deployment guide
- ARCHITECTURE.md - Technical details
- PROJECT_SUMMARY.md - Complete overview

