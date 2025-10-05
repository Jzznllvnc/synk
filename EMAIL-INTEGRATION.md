# 📧 Email Integration - Quick Setup

**Professional Gmail SMTP integration for Synk authentication emails**

---

## ✨ What You Get

✅ **Welcome Email** - Beautiful branded welcome when users sign up  
✅ **Email Verification** - Secure email confirmation flow  
✅ **Password Reset** - Professional forgot password emails  
✅ **Email Change** - Confirmation when users update their email  

---

## 🚀 Quick Setup (5 Minutes)

### 1️⃣ Get Gmail App Password

1. Enable 2-Step Verification on your Gmail
2. Go to: https://myaccount.google.com/apppasswords
3. Create app password named "Synk App"
4. Copy the 16-character password

### 2️⃣ Configure Supabase

1. Supabase Dashboard → Settings → Auth → SMTP
2. Enable Custom SMTP
3. Fill in:
   - Host: `smtp.gmail.com`
   - Port: `587`
   - Username: `your-email@gmail.com`
   - Password: `[your 16-char app password]`
   - Sender email: `your-email@gmail.com`
   - Sender name: `Synk`

### 3️⃣ Update Email Templates

1. Supabase Dashboard → Settings → Auth → Email Templates
2. Copy templates from `supabase/` folder:
   - `email-template-welcome.html` → Confirm signup
   - `email-template-reset-password.html` → Reset Password
   - `email-template-change-email.html` → Change Email

### 4️⃣ Set URLs

Supabase Dashboard → Settings → Auth → URL Configuration:

```
Site URL: http://localhost:3002

Redirect URLs:
  - http://localhost:3002/auth/callback
  - http://localhost:3002/auth/reset-password
```

### 5️⃣ Test!

1. Create a new account
2. Check your email for welcome message
3. Test password reset flow

---

## 📚 Detailed Guide

See **`supabase/email-setup.md`** for:
- Step-by-step instructions
- Troubleshooting tips
- Production checklist
- SPF/DKIM setup
- Email delivery optimization

---

## 🎨 Template Features

Our email templates include:
- ✅ Responsive design (mobile-friendly)
- ✅ Brand colors matching Synk
- ✅ Clear call-to-action buttons
- ✅ Security notices
- ✅ Professional footer
- ✅ Fallback text links

---

## 🔒 Security

- Emails sent over TLS
- Links expire after set time
- App password separate from Gmail login
- No sensitive data in emails

---

## 📊 Sending Limits

**Gmail Free**: 500 emails/day  
**Google Workspace**: 2,000 emails/day

For more volume, consider:
- SendGrid (100/day free)
- AWS SES (very cheap)
- Resend (3,000/month free)

---

## 🎯 Production Ready

Before going live:
- [ ] Update Site URL to production domain
- [ ] Add production redirect URLs  
- [ ] Test all email flows
- [ ] Check spam folder
- [ ] Set up SPF record (optional but recommended)

---

## 🆘 Need Help?

1. Check `supabase/email-setup.md` for detailed guide
2. Review Supabase logs for errors
3. Verify App Password is correct
4. Ensure 2-Step Verification is enabled

---

**Ready to send professional emails!** 🚀

