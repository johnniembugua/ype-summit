import nodemailer from 'nodemailer';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(config: EmailConfig) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
    });
  }

  async sendEmail(emailData: EmailData): Promise<void> {
    try {
      const mailOptions = {
        from: `"YPE Summit 2025" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text || this.generateTextFromHtml(emailData.html),
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${emailData.to}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  private generateTextFromHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
  }

  async sendRegistrationConfirmation(
    email: string,
    fullName: string,
    areaOfInterest: string
  ): Promise<void> {
    const subject = 'Welcome to YPE Summit 2025 - Registration Confirmed!';
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>YPE Summit 2025 - Registration Confirmed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(90deg, #0b3050, #021023);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: white;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-radius: 0 0 10px 10px;
          }
          .highlight {
            background-color: #f0f8ff;
            padding: 15px;
            border-left: 4px solid #0b3050;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 14px;
          }
          .button {
            display: inline-block;
            background: #0b3050;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>YPE Summit 2025</h1>
          <p>Young Professionals Empowerment Summit</p>
        </div>
        
        <div class="content">
          <h2>Registration Confirmed! 🎉</h2>
          <p>Dear <strong>${fullName}</strong>,</p>
          
          <p>Thank you for registering for the YPE Summit 2025! We're excited to have you join us for this transformative event.</p>
          
          <div class="highlight">
            <h3>Registration Details:</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Area of Interest:</strong> ${areaOfInterest}</p>
          </div>
          
          <h3>What's Next?</h3>
          <ul>
            <li>You will receive payment instructions shortly</li>
            <li>Keep an eye on your email for event updates and schedule</li>
            <li>Prepare your questions for our live Q&A sessions</li>
          </ul>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
          
          <div class="footer">
            <p> 2025 YPE Summit. All rights reserved.</p>
            <p>This is an automated email. Please do not reply to this message.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail({
      to: email,
      subject,
      html,
    });
  }
}

// Create email service instance
const emailConfig: EmailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
};

export const emailService = new EmailService(emailConfig);
export default EmailService;
