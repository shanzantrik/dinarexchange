# Email Setup Guide for Dinar Exchange

This guide explains how to set up SMTP email functionality for the order forms.

## Features

- ✅ Automatic order confirmation emails to customers
- ✅ Admin notification emails for new orders
- ✅ Professional HTML email templates
- ✅ Order number generation
- ✅ Form data validation and sanitization
- ✅ Error handling and user feedback

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@dinarexchange.com.au
```

### 2. Gmail Setup (Recommended)

If using Gmail, follow these steps:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `SMTP_PASS`

### 3. Alternative Email Providers

You can use any SMTP provider. Here are common configurations:

#### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

#### Yahoo

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

#### Custom SMTP Server

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
```

### 4. Testing the Setup

1. Start your development server: `npm run dev`
2. Go to `/buy-dinar` or `/buy-zim`
3. Fill out the order form
4. Submit the order
5. Check both customer and admin emails

## Email Templates

### Customer Email

- Order confirmation with all details
- Professional styling with company branding
- Next steps and contact information
- Order number for reference

### Admin Email

- New order notification
- Complete order details
- Customer information (sanitized)
- Order number for tracking

## Security Features

- ✅ Email validation
- ✅ Form data sanitization (removes sensitive ID numbers)
- ✅ Error handling
- ✅ Rate limiting (can be added)
- ✅ Environment variable protection

## Troubleshooting

### Common Issues

1. **"Authentication failed"**

   - Check your SMTP credentials
   - Ensure 2FA is enabled for Gmail
   - Verify app password is correct

2. **"Connection timeout"**

   - Check SMTP host and port
   - Verify firewall settings
   - Try different port (465 for SSL, 587 for TLS)

3. **"Email not sending"**
   - Check browser console for errors
   - Verify environment variables are loaded
   - Check server logs

### Debug Mode

Add this to your `.env.local` for debugging:

```env
NODE_ENV=development
DEBUG=nodemailer:*
```

## Production Deployment

For production, consider:

1. **Email Service Providers**:

   - SendGrid
   - Mailgun
   - Amazon SES
   - Resend

2. **Environment Variables**:

   - Use your hosting platform's environment variable system
   - Never commit `.env.local` to version control

3. **Rate Limiting**:
   - Implement rate limiting to prevent spam
   - Add CAPTCHA for additional protection

## Support

For issues or questions:

- Email: dinars@dinarexchange.com.au
- Phone: 1300 856 881
- Mobile: 0417 460 236
