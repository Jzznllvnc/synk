# Synk - Architecture & Implementation Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                    Next.js 15 (App Router)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Tasks   │  │  Notes   │  │  Files   │  │ Calendar │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Custom React Hooks Layer                   │   │
│  │  useTasks | useNotes | useFiles | useEvents          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Supabase Client (Authentication)             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Backend                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │              PostgreSQL Database                      │   │
│  │  • tasks     • notes     • files    • events         │   │
│  │  • profiles  • auth.users (managed by Supabase)      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Row Level Security (RLS) Policies            │   │
│  │  Automatic user_id filtering on all operations       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Supabase Storage                         │   │
│  │  Private bucket: user-files/{user_id}/...            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Supabase Auth Service                      │   │
│  │  Email/Password + OAuth (Google, GitHub)             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Authentication Flow

```
User Login → Supabase Auth → JWT Token → Stored in Browser
                                ↓
                    All subsequent requests include JWT
                                ↓
                    RLS validates user_id from JWT
                                ↓
                    Return only user's data
```

### 2. Task Creation Flow

```
User fills form → createTask() hook → Supabase Client
                                            ↓
                            INSERT with user_id from auth
                                            ↓
                        RLS policy validates ownership
                                            ↓
                            Task saved to database
                                            ↓
                        React state updated → UI updates
```

### 3. File Upload Flow

```
User selects file → uploadFile() → Supabase Storage API
                                          ↓
                        Upload to: user-files/{user_id}/filename
                                          ↓
                            Storage policy validates
                                          ↓
                        File metadata saved to database
                                          ↓
                        React state updated → UI shows file
```

## Security Architecture

### Row Level Security (RLS)

All tables implement these policies:

```sql
-- Example for tasks table
CREATE POLICY "Users can view their own tasks"
  ON tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Similar for UPDATE and DELETE
```

**Benefits:**
- Database-level security (cannot be bypassed)
- No need to check user_id in application code
- Automatic filtering of queries
- Protection against SQL injection

### Storage Security

```
Bucket: user-files (Private)
Structure: {user_id}/{filename}

Policy: Users can only access files in their folder
Validation: Path must start with auth.uid()
```

## Component Architecture

### Page Components

```
app/
├── auth/
│   ├── login/page.tsx          → Login form + OAuth buttons
│   ├── signup/page.tsx         → Registration form
│   └── forgot-password/page.tsx → Password reset
│
└── dashboard/
    ├── layout.tsx              → Auth guard + sidebar
    ├── page.tsx                → Dashboard overview
    ├── tasks/page.tsx          → Task CRUD interface
    ├── notes/page.tsx          → Note editor with markdown
    ├── files/page.tsx          → File upload/download
    └── calendar/page.tsx       → Calendar view + events
```

### Custom Hooks

Each module has a dedicated hook:

```typescript
// lib/hooks/useTasks.ts
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Fetch all tasks for current user
  const fetchTasks = async () => { ... };
  
  // CRUD operations
  const createTask = async (task) => { ... };
  const updateTask = async (id, updates) => { ... };
  const deleteTask = async (id) => { ... };
  
  return { tasks, createTask, updateTask, deleteTask, ... };
}
```

**Pattern Benefits:**
- Separation of concerns
- Reusable data logic
- Type-safe operations
- Easy to test

### Shared Components

```
components/
└── Sidebar.tsx    → Navigation with active state
```

## Database Schema Details

### Tasks Table

```sql
tasks
  id              UUID (PK)
  user_id         UUID (FK → auth.users)
  title           TEXT
  description     TEXT
  status          ENUM (todo, in_progress, completed)
  priority        ENUM (low, medium, high, urgent)
  due_date        TIMESTAMP
  completed_at    TIMESTAMP
  created_at      TIMESTAMP
  updated_at      TIMESTAMP
  
Indexes:
  - user_id (for fast filtering)
  - status (for status-based queries)
  - due_date (for deadline sorting)
```

### Notes Table

```sql
notes
  id              UUID (PK)
  user_id         UUID (FK → auth.users)
  title           TEXT
  content         TEXT (markdown)
  is_markdown     BOOLEAN
  tags            TEXT[] (array)
  is_favorite     BOOLEAN
  created_at      TIMESTAMP
  updated_at      TIMESTAMP
  
Indexes:
  - user_id
  - tags (GIN index for array search)
  - is_favorite
```

### Files Table

```sql
files
  id              UUID (PK)
  user_id         UUID (FK → auth.users)
  name            TEXT
  file_path       TEXT (storage path)
  file_size       BIGINT
  mime_type       TEXT
  description     TEXT
  created_at      TIMESTAMP
  updated_at      TIMESTAMP
  
Indexes:
  - user_id
```

### Events Table

```sql
events
  id              UUID (PK)
  user_id         UUID (FK → auth.users)
  title           TEXT
  description     TEXT
  start_time      TIMESTAMP
  end_time        TIMESTAMP
  location        TEXT
  is_all_day      BOOLEAN
  reminder_minutes INTEGER
  color           TEXT (hex color)
  created_at      TIMESTAMP
  updated_at      TIMESTAMP
  
Constraints:
  - end_time > start_time
  
Indexes:
  - user_id
  - start_time
  - end_time
```

### Profiles Table

```sql
profiles
  id              UUID (PK, FK → auth.users)
  email           TEXT
  full_name       TEXT
  avatar_url      TEXT
  preferences     JSONB (flexible settings)
  created_at      TIMESTAMP
  updated_at      TIMESTAMP
```

## State Management

### Current Approach: React Hooks + Local State

```typescript
// Component-level state for UI
const [isModalOpen, setIsModalOpen] = useState(false);

// Custom hook for data
const { tasks, createTask, updateTask } = useTasks();
```

### Future: Zustand (if needed for global state)

```typescript
// lib/store.ts
import create from 'zustand';

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  // ... other global state
}));
```

## Performance Optimizations

### 1. Database Indexes
All foreign keys and frequently queried columns are indexed.

### 2. Efficient Queries
```typescript
// Good: Fetch only needed columns
.select('id, title, status, due_date')

// Good: Use specific filters
.eq('status', 'completed')

// Good: Limit results
.limit(50)
```

### 3. Client-Side Caching
React hooks maintain local state to reduce API calls.

### 4. Image Optimization
Next.js automatically optimizes images via Image component.

## Scalability Considerations

### Current Capacity (Free Tier)
- **Users**: 50,000 monthly active
- **Database**: 500MB storage
- **Files**: 1GB storage
- **Bandwidth**: 2GB/month

### Scaling Path

**Phase 1: Optimize current setup**
- Add database query caching
- Implement lazy loading
- Optimize bundle size

**Phase 2: Upgrade to Supabase Pro**
- 8GB database
- 100GB file storage
- Point-in-time recovery

**Phase 3: Add features**
- Real-time collaboration
- Team workspaces
- Advanced analytics

## Error Handling

### Client-Side

```typescript
try {
  await createTask(taskData);
  toast.success('Task created!');
} catch (error) {
  toast.error(error.message || 'Failed to create task');
  console.error('Task creation error:', error);
}
```

### Server-Side (Supabase)
- RLS policies automatically reject unauthorized access
- Database constraints prevent invalid data
- Storage policies prevent unauthorized uploads

## Testing Strategy

### Unit Tests
Test individual functions and hooks:
```typescript
// Example: Test task creation
test('createTask adds new task', async () => {
  const task = await createTask({ title: 'Test' });
  expect(task.title).toBe('Test');
});
```

### Integration Tests
Test complete flows:
```typescript
// Example: Test task flow
test('user can create and complete task', async () => {
  // Sign in
  // Create task
  // Mark as complete
  // Verify in database
});
```

### E2E Tests (Future)
Use Playwright or Cypress for full user flows.

## Deployment Architecture

```
GitHub Repository
      ↓
   (push)
      ↓
Vercel/Netlify (CI/CD)
      ↓
   (build)
      ↓
Production Deployment
      ↓
   (connects to)
      ↓
Supabase Production Database
```

## Monitoring & Observability

### Metrics to Track
- User signups and logins
- Task/note/file creation rates
- Storage usage per user
- API response times
- Error rates

### Tools
- **Vercel Analytics**: Page views, performance
- **Supabase Dashboard**: Database queries, storage
- **Browser Console**: Client-side errors

## Future Enhancements

### Phase 1: Core Improvements
- [ ] Real-time updates (Supabase Realtime)
- [ ] Push notifications
- [ ] Advanced search
- [ ] Bulk operations

### Phase 2: Collaboration
- [ ] Team workspaces
- [ ] Shared tasks/notes
- [ ] Real-time editing
- [ ] Comments and mentions

### Phase 3: Advanced Features
- [ ] Mobile app (React Native)
- [ ] Integrations (Google Calendar, etc.)
- [ ] AI-powered suggestions
- [ ] Analytics dashboard

## Best Practices Implemented

✅ **Type Safety**: Full TypeScript coverage  
✅ **Security**: Row Level Security on all tables  
✅ **Performance**: Indexed queries, efficient data fetching  
✅ **UX**: Loading states, error handling, toast notifications  
✅ **Scalability**: Modular architecture  
✅ **Maintainability**: Clear structure, consistent patterns  
✅ **Documentation**: Comprehensive guides and comments  

---

This architecture is designed to be:
- **Secure** by default
- **Scalable** to thousands of users
- **Maintainable** with clear patterns
- **Extensible** for future features

