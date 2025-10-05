import nodemailer from 'nodemailer';

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD, // App Password from Gmail
    },
  });
};

// Email templates
export const emailTemplates = {
  welcome: (firstName: string, email: string) => ({
    subject: `🎉 Welcome to Synk, ${firstName}!`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
            <tr>
              <td align="center" style="padding: 60px 20px 40px 20px;">
                
                <!-- Container -->
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                  
                  <!-- Logo Area with gradient background -->
                  <tr>
                    <td align="center" style="padding: 48px 24px 32px 24px; background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);">
                      <div style="width: 80px; height: 80px; background-color: #ffffff; border-radius: 16px; display: inline-block; padding: 12px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);">
                        <img src="PASTE_YOUR_IMGBB_URL_HERE" alt="Synk Logo" width="56" height="56" style="width: 56px; height: 56px; display: block; margin: 0 auto;" />
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 40px 32px;">
                      <h1 style="margin: 0 0 16px 0; color: #0f172a; font-size: 32px; font-weight: 700; line-height: 1.2; text-align: center; letter-spacing: -0.5px;">
                        Welcome to Synk! 🎉
                      </h1>
                      
                      <p style="margin: 0 0 8px 0; color: #334155; font-size: 18px; line-height: 1.6; text-align: center; font-weight: 500;">
                        Hey ${firstName}!
                      </p>
                      
                      <p style="margin: 0 0 40px 0; color: #64748b; font-size: 16px; line-height: 1.6; text-align: center;">
                        You're all set! Get ready to supercharge your productivity and stay on top of everything that matters. 🚀
                      </p>
                      
                      <!-- Features Section -->
                      <div style="background-color: #f8fafc; border-radius: 12px; padding: 32px 28px; margin-bottom: 32px;">
                        <h2 style="margin: 0 0 24px 0; color: #0f172a; font-size: 18px; font-weight: 600; text-align: center;">
                          What's inside? ✨
                        </h2>
                        
                        <table role="presentation" style="width: 100%;">
                          <tr>
                            <td style="width: 50%; padding: 12px; vertical-align: top;">
                              <div style="background-color: #ffffff; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
                                <div style="font-size: 24px; margin-bottom: 8px;">✅</div>
                                <div style="color: #0f172a; font-size: 15px; font-weight: 600; margin-bottom: 4px;">Smart Tasks</div>
                                <div style="color: #64748b; font-size: 13px; line-height: 1.4;">Prioritize & conquer your to-dos</div>
                              </div>
                            </td>
                            <td style="width: 50%; padding: 12px; vertical-align: top;">
                              <div style="background-color: #ffffff; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
                                <div style="font-size: 24px; margin-bottom: 8px;">📝</div>
                                <div style="color: #0f172a; font-size: 15px; font-weight: 600; margin-bottom: 4px;">Rich Notes</div>
                                <div style="color: #64748b; font-size: 13px; line-height: 1.4;">Capture ideas in markdown</div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="width: 50%; padding: 12px; vertical-align: top;">
                              <div style="background-color: #ffffff; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
                                <div style="font-size: 24px; margin-bottom: 8px;">📁</div>
                                <div style="color: #0f172a; font-size: 15px; font-weight: 600; margin-bottom: 4px;">Secure Files</div>
                                <div style="color: #64748b; font-size: 13px; line-height: 1.4;">Store everything safely</div>
                              </div>
                            </td>
                            <td style="width: 50%; padding: 12px; vertical-align: top;">
                              <div style="background-color: #ffffff; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
                                <div style="font-size: 24px; margin-bottom: 8px;">📅</div>
                                <div style="color: #0f172a; font-size: 15px; font-weight: 600; margin-bottom: 4px;">Event Planner</div>
                                <div style="color: #64748b; font-size: 13px; line-height: 1.4;">Never miss a moment</div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      
                      <!-- CTA Button -->
                      <table role="presentation" style="width: 100%; margin-bottom: 32px;">
                        <tr>
                          <td align="center">
                            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/dashboard" 
                               style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 12px; box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3); letter-spacing: 0.3px;">
                              Launch Your Dashboard →
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Quick Tip -->
                      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0ea5e9; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
                        <p style="margin: 0; color: #0c4a6e; font-size: 14px; line-height: 1.6;">
                          <strong style="display: block; margin-bottom: 6px;">💡 Pro tip:</strong>
                          Start by creating your first task or note. It only takes seconds, and you'll feel the magic instantly!
                        </p>
                      </div>
                      
                      <p style="margin: 0; color: #64748b; font-size: 15px; line-height: 1.6; text-align: center;">
                        We're here to help you stay organized and productive. Let's do this! 💪
                      </p>
                      
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td align="center">
                            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">
                              Synk – Your Productivity Superpower
                            </p>
                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                              © 2024 Synk. All rights reserved.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: `
      Welcome to Synk, ${firstName}!
      
      Thank you for signing up for Synk - your all-in-one productivity hub!
      
      Here's what you can do with Synk:
      ✅ Manage tasks with priorities and deadlines
      📝 Write notes with markdown support
      📁 Store files securely in the cloud
      📅 Plan events with reminders
      
      Get started: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/dashboard
    `,
  }),

  taskReminder: (firstName: string, taskTitle: string, dueDate: string) => ({
    subject: `⏰ Reminder: "${taskTitle}" is due soon`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 40px auto; background-color: white; border-radius: 8px; padding: 40px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${firstName}! 👋</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
              This is a reminder that your task <strong>"${taskTitle}"</strong> is due on ${dueDate}.
            </p>
            <div style="margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/dashboard/tasks" 
                 style="display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                View Task
              </a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">
              Stay productive with Synk! ✨
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
      Hi ${firstName}!
      
      This is a reminder that your task "${taskTitle}" is due on ${dueDate}.
      
      View your tasks: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'}/dashboard/tasks
    `,
  }),

  weeklyDigest: (firstName: string, stats: { tasks: number; notes: number; files: number; events: number }) => ({
    subject: '📊 Your Weekly Synk Digest',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 40px auto; background-color: white; border-radius: 8px; padding: 40px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">📊 Your Weekly Summary</h2>
            <p style="color: #4b5563; font-size: 16px; margin-bottom: 30px;">Hi ${firstName}! Here's what you accomplished this week:</p>
            
            <div style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
              <div style="margin-bottom: 15px;">
                <span style="font-size: 24px;">✅</span>
                <strong style="color: #1f2937; margin-left: 10px;">${stats.tasks} tasks completed</strong>
              </div>
              <div style="margin-bottom: 15px;">
                <span style="font-size: 24px;">📝</span>
                <strong style="color: #1f2937; margin-left: 10px;">${stats.notes} notes created</strong>
              </div>
              <div style="margin-bottom: 15px;">
                <span style="font-size: 24px;">📁</span>
                <strong style="color: #1f2937; margin-left: 10px;">${stats.files} files uploaded</strong>
              </div>
              <div>
                <span style="font-size: 24px;">📅</span>
                <strong style="color: #1f2937; margin-left: 10px;">${stats.events} events scheduled</strong>
              </div>
            </div>
            
            <p style="color: #4b5563; font-size: 16px;">Keep up the great work! 🎉</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Your Weekly Summary
      
      Hi ${firstName}! Here's what you accomplished this week:
      ✅ ${stats.tasks} tasks completed
      📝 ${stats.notes} notes created
      📁 ${stats.files} files uploaded
      📅 ${stats.events} events scheduled
      
      Keep up the great work! 🎉
    `,
  }),
};

// Send email function
export async function sendEmail(to: string, template: { subject: string; html: string; text: string }) {
  const transporter = createTransporter();

  try {
    const info = await transporter.sendMail({
      from: `"Synk" <${process.env.SMTP_USER}>`,
      to,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}

// Convenience functions
export async function sendWelcomeEmail(email: string, firstName: string) {
  const template = emailTemplates.welcome(firstName, email);
  return sendEmail(email, template);
}

export async function sendTaskReminder(email: string, firstName: string, taskTitle: string, dueDate: string) {
  const template = emailTemplates.taskReminder(firstName, taskTitle, dueDate);
  return sendEmail(email, template);
}

export async function sendWeeklyDigest(
  email: string,
  firstName: string,
  stats: { tasks: number; notes: number; files: number; events: number }
) {
  const template = emailTemplates.weeklyDigest(firstName, stats);
  return sendEmail(email, template);
}

