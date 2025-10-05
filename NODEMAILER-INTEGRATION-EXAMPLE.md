# Integrating Nodemailer into Signup Flow

## Quick Example

Here's how to send a welcome email after successful signup:

### Option 1: Client-Side API Call (Recommended)

```typescript
// In app/auth/signup/page.tsx

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 1. Create account with Supabase
    await signUp({ 
      email, 
      password, 
      firstName: firstName.trim(),
      lastName: lastName.trim() || undefined
    });
    
    // 2. Send welcome email via API
    try {
      await fetch('/api/send-welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          firstName: firstName.trim() 
        }),
      });
    } catch (emailError) {
      // Don't block signup if email fails
      console.error('Welcome email failed:', emailError);
    }
    
    toast.success('Account created! Check your email for a welcome message.');
    router.push('/auth/login');
  } catch (error: any) {
    toast.error(error.message || 'Failed to create account');
  } finally {
    setLoading(false);
  }
};
```

### Option 2: Direct Import (Simpler but Server-Side Only)

If you're using Server Actions or API routes:

```typescript
import { sendWelcomeEmail } from '@/lib/email';

// After successful signup
await sendWelcomeEmail(email, firstName);
```

---

## Complete Integration

Update your `app/auth/signup/page.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validation
  if (!firstName.trim()) {
    toast.error('First name is required');
    return;
  }

  if (!acceptedTerms) {
    toast.error('Please accept the Terms of Service');
    return;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return;
  }

  setLoading(true);

  try {
    // 1. Create Supabase account
    await signUp({ 
      email, 
      password, 
      firstName: firstName.trim(),
      lastName: lastName.trim() || undefined
    });
    
    // 2. Send welcome email
    fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        firstName: firstName.trim() 
      }),
    }).catch(err => {
      // Log error but don't block signup
      console.error('Welcome email failed:', err);
    });
    
    toast.success('Account created! Check your email for a welcome message. 🎉');
    router.push('/auth/login');
  } catch (error: any) {
    toast.error(error.message || 'Failed to create account');
  } finally {
    setLoading(false);
  }
};
```

---

## Testing

1. **Set up environment variables:**
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your_16_char_app_password
   NEXT_PUBLIC_SITE_URL=http://localhost:3002
   ```

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

3. **Sign up with real email:**
   - Go to http://localhost:3002/auth/signup
   - Create account
   - Check your inbox for welcome email!

---

## Benefits of This Approach

✅ **Non-blocking** - Email failure won't prevent signup  
✅ **API route** - Secure, runs server-side  
✅ **Customizable** - Full control over email content  
✅ **Testable** - Easy to test locally  
✅ **Scalable** - Can add more email types easily  

---

## Next Steps

### Add More Email Types:

**Task Reminders:**
```typescript
// When task is due soon
await sendTaskReminder(userEmail, firstName, taskTitle, dueDate);
```

**Weekly Digest:**
```typescript
// Send weekly summary
await sendWeeklyDigest(userEmail, firstName, stats);
```

**Custom Notifications:**
```typescript
// Create your own in lib/email.ts
export const emailTemplates = {
  fileShared: (name, fileName) => ({
    subject: `📁 ${fileName} was shared with you`,
    html: `...`,
    text: `...`
  }),
};
```

---

## Troubleshooting

### Email not received?
1. Check spam folder
2. Verify SMTP_USER and SMTP_PASSWORD in .env.local
3. Check server logs for errors
4. Test API route directly:
   ```bash
   curl -X POST http://localhost:3002/api/send-welcome-email \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","firstName":"Test"}'
   ```

### 535 Authentication Error?
- Using App Password (not regular password)?
- 2-Step Verification enabled?
- App Password copied correctly (no spaces)?

---

**Ready to send professional emails!** 📧✨

