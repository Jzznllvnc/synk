# Email Setup for Synk - Gmail SMTP Integration

This guide will help you set up professional emails for user authentication (welcome emails, password reset, etc.) using Gmail SMTP with Supabase.

---

## 📧 Overview

Synk uses email for:
1. **Welcome Email** - When a new user signs up
2. **Email Verification** - Confirm email address
3. **Password Reset** - Forgot password flow
4. **Email Change Confirmation** - When user updates their email

---

## 🔧 Step 1: Set Up Gmail App Password

Since Gmail requires App Passwords for third-party apps:

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Enable 2-Step Verification** (if not already enabled):
   - Go to Security > 2-Step Verification
   - Follow the setup process

3. **Create an App Password**:
   - Go to Security > 2-Step Verification > App passwords
   - Or directly: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it: "Synk App"
   - Click "Generate"
   - **Copy the 16-character password** (you'll need this!)

---

## 🔧 Step 2: Configure Supabase SMTP Settings

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your Synk project**
3. **Navigate to**: Settings > Auth > SMTP Settings
4. **Enable Custom SMTP**
5. **Fill in the following:**

```
Enable Custom SMTP: ✓ (toggle ON)

Sender email: your-email@gmail.com
Sender name: Synk

Host: smtp.gmail.com
Port number: 587
Username: your-email@gmail.com
Password: [paste your 16-character App Password here]

Minimum interval between emails: 60 (seconds)
```

6. **Click "Save"**

---

## 🔧 Step 3: Test Email Configuration

1. In Supabase Dashboard, scroll down to the test section
2. Click "Send Test Email"
3. Check your inbox - you should receive a test email
4. ✅ If received, your SMTP is configured correctly!

---

## 🎨 Step 4: Customize Email Templates

Now let's make the emails beautiful and branded!

### 4.1 Navigate to Email Templates

1. In Supabase Dashboard: Settings > Auth > Email Templates
2. You'll see these templates:
   - **Confirm signup** (Welcome + Email Verification)
   - **Magic Link**
   - **Change Email Address**
   - **Reset Password**

### 4.2 Update Each Template

Copy the content from the template files in this folder:
- `email-template-welcome.html` - For "Confirm signup"
- `email-template-reset-password.html` - For "Reset Password"
- `email-template-change-email.html` - For "Change Email Address"

**Important Variables to Keep:**
- `{{ .ConfirmationURL }}` - Email confirmation link
- `{{ .Token }}` - Verification token
- `{{ .TokenHash }}` - Token hash
- `{{ .SiteURL }}` - Your app URL

---

## ⚙️ Step 5: Configure Auth URLs

1. In Supabase Dashboard: Settings > Auth > URL Configuration
2. Set these URLs:

```
Site URL: http://localhost:3002 (for development)
          https://your-domain.com (for production)

Redirect URLs:
  - http://localhost:3002/auth/callback
  - http://localhost:3002/auth/reset-password
  - https://your-domain.com/auth/callback
  - https://your-domain.com/auth/reset-password
```

3. **Save changes**

---

## 🧪 Step 6: Test the Complete Flow

### Test Welcome Email:
1. Go to your signup page: http://localhost:3002/auth/signup
2. Create a new account with a real email
3. Check your inbox - you should receive a welcome email
4. Click the confirmation link

### Test Password Reset:
1. Go to: http://localhost:3002/auth/forgot-password
2. Enter your email
3. Check inbox for password reset email
4. Click the reset link
5. Enter new password

---

## 🎨 Email Template Customization Tips

### Colors to Match Synk Brand:
- Primary: `#0ea5e9` (blue)
- Success: `#10b981` (green)
- Background: `#f9fafb` (light gray)

### Update Logo:
Replace the logo URL in templates with your hosted logo:
```html
<img src="https://your-domain.com/Synk.svg" alt="Synk" />
```

---

## 🚀 Production Checklist

Before going live:

- [ ] App Password generated and saved securely
- [ ] SMTP settings configured in Supabase
- [ ] Test email sent successfully
- [ ] All email templates updated with branding
- [ ] Site URL updated to production domain
- [ ] Redirect URLs added for production
- [ ] Welcome email tested
- [ ] Password reset tested
- [ ] Email change tested
- [ ] Check spam folder (mark as "not spam" if needed)

---

## 📊 Email Delivery Tips

### To Avoid Spam Folder:

1. **SPF Record**: Add to your domain DNS
   ```
   v=spf1 include:_spf.google.com ~all
   ```

2. **DKIM**: Gmail automatically signs with DKIM

3. **Warm up**: Send test emails to different providers (Gmail, Outlook, Yahoo)

4. **Content**: Avoid spam trigger words, keep HTML clean

### Gmail Sending Limits:
- **Free Gmail**: 500 emails/day
- **Google Workspace**: 2,000 emails/day

For higher volume, consider:
- SendGrid (100 emails/day free)
- AWS SES (very cheap)
- Resend (3,000 emails/month free)

---

## 🔒 Security Best Practices

1. **Never commit App Password** to git
2. Store App Password securely (password manager)
3. Use environment variables for sensitive data
4. Rotate App Password periodically
5. Enable 2FA on your Gmail account
6. Monitor sent email logs in Supabase

---

## 🐛 Troubleshooting

### Emails Not Sending:

1. **Check SMTP settings** - Verify all fields are correct
2. **App Password** - Make sure you're using App Password, not regular password
3. **2-Step Verification** - Must be enabled on Gmail
4. **Port 587** - Some networks block this; try port 465 (SSL)
5. **Supabase Logs** - Check Settings > Logs for errors

### Emails Going to Spam:

1. **Send test emails** to yourself first
2. **Mark as "Not Spam"** in your email client
3. **Add sender to contacts**
4. **Check SPF/DKIM** records
5. **Reduce image/link ratio** in email

### Template Variables Not Working:

1. **Use exact syntax**: `{{ .VariableName }}`
2. **Case sensitive**: Must match exactly
3. **Check Supabase docs** for available variables

---

## 📚 Additional Resources

- [Supabase Email Docs](https://supabase.com/docs/guides/auth/auth-smtp)
- [Gmail SMTP Settings](https://support.google.com/a/answer/176600)
- [Email Best Practices](https://postmarkapp.com/guides/email-best-practices)

---

## ✅ Quick Reference

**Gmail SMTP Settings:**
```
Host: smtp.gmail.com
Port: 587 (TLS) or 465 (SSL)
Username: your-email@gmail.com
Password: [16-character App Password]
```

**Common Supabase Variables:**
```
{{ .ConfirmationURL }}  - Email confirmation link
{{ .Token }}            - Verification token
{{ .TokenHash }}        - Token hash
{{ .SiteURL }}          - Your app URL
{{ .Email }}            - User's email address
```

---

**Need Help?** Check Supabase logs or email support!

