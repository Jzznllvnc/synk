# Nodemailer Email Setup for Synk

Complete guide to using Nodemailer for custom emails in your Synk app.

---

## 🎯 Why Nodemailer?

✅ **More Control** - Full customization of email content and design  
✅ **Custom Emails** - Send emails beyond just auth (reminders, digests, notifications)  
✅ **Flexibility** - Use any SMTP provider or switch providers easily  
✅ **No Vendor Lock-in** - Not dependent on Supabase's email system  
✅ **Testing** - Easy to test locally  

---

## 🚀 Quick Setup (5 Minutes)

### 1️⃣ Get Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Enable **2-Step Verification** (Security → 2-Step Verification)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Create app password:
   - App: Mail
   - Device: Other (Custom name) → "Synk Nodemailer"
5. Copy the **16-character password**

### 2️⃣ Add to Environment Variables

Create or update `.env.local`:

```env
# Email Configuration (Nodemailer with Gmail)
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your_16_character_app_password

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3002
```

### 3️⃣ Test It!

The setup is complete! Now you can send emails.

---

## 📧 How to Use

### Send Welcome Email After Signup

Update your signup handler:

```typescript
// In app/auth/signup/page.tsx
import { sendWelcomeEmail } from '@/lib/email';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // Create account
    await signUp({ email, password, firstName, lastName });
    
    // Send welcome email
    try {
      await sendWelcomeEmail(email, firstName);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
      // Don't block signup if email fails
    }
    
    toast.success('Account created! Check your email.');
    router.push('/dashboard');
  } catch (error: any) {
    toast.error(error.message);
  }
};
```

### Send Task Reminder

```typescript
import { sendTaskReminder } from '@/lib/email';

// When task is due soon
await sendTaskReminder(
  'user@example.com',
  'John',
  'Complete project proposal',
  'Tomorrow at 5 PM'
);
```

### Send Weekly Digest

```typescript
import { sendWeeklyDigest } from '@/lib/email';

const stats = {
  tasks: 15,
  notes: 8,
  files: 5,
  events: 3
};

await sendWeeklyDigest('user@example.com', 'John', stats);
```

---

## 🎨 Available Templates

### 1. Welcome Email
- Sent after user signs up
- Personalized greeting
- Feature highlights
- CTA to dashboard

### 2. Task Reminder
- Sent when task is due soon
- Shows task title and due date
- Link to view task

### 3. Weekly Digest
- Summary of week's activity
- Stats for tasks, notes, files, events
- Motivational message

---

## 🔧 Custom Templates

Create your own email template:

```typescript
// In lib/email.ts

export const emailTemplates = {
  customEmail: (name: string, data: any) => ({
    subject: 'Your Custom Subject',
    html: `
      <html>
        <body>
          <h1>Hi ${name}!</h1>
          <p>Your custom content here...</p>
        </body>
      </html>
    `,
    text: `Hi ${name}! Your custom content here...`
  }),
};

// Create sender function
export async function sendCustomEmail(email: string, name: string, data: any) {
  const template = emailTemplates.customEmail(name, data);
  return sendEmail(email, template);
}
```

---

## 🚀 Production Setup

### Option 1: Keep Using Gmail

**Limits:**
- Free Gmail: 500 emails/day
- Google Workspace: 2,000 emails/day

**Setup:**
- Same as development
- Use your production domain in NEXT_PUBLIC_SITE_URL

### Option 2: Use a Dedicated Email Service

For higher volume, switch to:

#### **SendGrid** (Recommended)
```typescript
// Update lib/email.ts transporter
const transporter = nodemailer.createTransporter({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

**Benefits:**
- 100 emails/day free
- Better deliverability
- Advanced analytics

#### **AWS SES**
```typescript
import aws from '@aws-sdk/client-ses';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import nodemailer from 'nodemailer';

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: 'us-east-1',
  credentialDefaultProvider: defaultProvider,
});

const transporter = nodemailer.createTransporter({
  SES: { ses, aws },
});
```

**Benefits:**
- Very cheap ($0.10 per 1,000 emails)
- Unlimited scaling
- AWS infrastructure

#### **Resend** (Modern Choice)
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Synk <onboarding@yourdomain.com>',
  to: email,
  subject: 'Welcome to Synk!',
  html: '<h1>Welcome!</h1>',
});
```

**Benefits:**
- 3,000 emails/month free
- Best developer experience
- Modern API

---

## 🧪 Testing Emails

### Test Locally

```bash
# In your terminal
npm run dev

# Open another terminal
node -e "require('./lib/email').sendWelcomeEmail('your-email@gmail.com', 'Test')"
```

### Test with API Route

```bash
curl -X POST http://localhost:3002/api/send-welcome-email \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@gmail.com","firstName":"Test"}'
```

### Use a Test Email Service

**Mailtrap** (for testing):
```typescript
const transporter = nodemailer.createTransporter({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});
```

Emails go to Mailtrap inbox instead of real inboxes!

---

## 🐛 Troubleshooting

### Emails Not Sending

**Check:**
1. Environment variables are set correctly
2. App Password is correct (not regular Gmail password)
3. 2-Step Verification is enabled on Gmail
4. No typos in SMTP settings

**Debug:**
```typescript
// Add to lib/email.ts
console.log('SMTP Config:', {
  user: process.env.SMTP_USER,
  hasPassword: !!process.env.SMTP_PASSWORD
});
```

### Emails Go to Spam

**Solutions:**
1. Add sender to contacts
2. Mark as "Not Spam"
3. Use custom domain (instead of Gmail)
4. Set up SPF/DKIM records
5. Warm up your sender reputation (send gradually)

### TypeScript Errors

```bash
npm install --save-dev @types/nodemailer
```

---

## 🔒 Security Best Practices

1. **Never commit** `.env.local` or App Passwords to git
2. **Use environment variables** for all sensitive data
3. **Rotate App Passwords** periodically
4. **Monitor email logs** for suspicious activity
5. **Rate limit** email sending (prevent abuse)
6. **Validate email addresses** before sending

---

## 📊 Monitoring

### Track Email Status

```typescript
export async function sendEmail(to: string, template: any) {
  const transporter = createTransporter();

  try {
    const info = await transporter.sendMail({
      from: `"Synk" <${process.env.SMTP_USER}>`,
      to,
      subject: template.subject,
      html: template.html,
    });

    // Log success
    console.log('✅ Email sent:', {
      to,
      subject: template.subject,
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    // Log error
    console.error('❌ Email failed:', {
      to,
      subject: template.subject,
      error: error.message,
      timestamp: new Date().toISOString()
    });
    
    throw error;
  }
}
```

---

## 🎯 Advanced Features

### Queue System (for high volume)

Use Bull or BullMQ for email queues:

```typescript
import Queue from 'bull';

const emailQueue = new Queue('email', process.env.REDIS_URL);

emailQueue.process(async (job) => {
  const { email, template } = job.data;
  await sendEmail(email, template);
});

// Add to queue
await emailQueue.add({ email, template });
```

### Batch Emails

```typescript
export async function sendBatchEmails(recipients: Array<{ email: string; name: string }>) {
  const promises = recipients.map(({ email, name }) =>
    sendWelcomeEmail(email, name).catch(error => {
      console.error(`Failed for ${email}:`, error);
      return null;
    })
  );
  
  await Promise.all(promises);
}
```

---

## ✅ Checklist

Development:
- [ ] Gmail App Password created
- [ ] Environment variables set
- [ ] Test email sent successfully
- [ ] Welcome email on signup works

Production:
- [ ] Production SMTP configured
- [ ] Domain verified (if using SendGrid/SES)
- [ ] SPF/DKIM records set up
- [ ] Email templates tested
- [ ] Error handling in place
- [ ] Monitoring set up

---

## 📚 Resources

- [Nodemailer Docs](https://nodemailer.com/)
- [Gmail SMTP Settings](https://support.google.com/mail/answer/7126229)
- [SendGrid Setup](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api)
- [AWS SES Docs](https://docs.aws.amazon.com/ses/)
- [Resend Docs](https://resend.com/docs)

---

**Happy emailing! 📧✨**

