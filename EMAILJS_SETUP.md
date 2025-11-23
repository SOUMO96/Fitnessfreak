# EmailJS Setup Guide - Send Verification Codes via Email

## 📧 Setup EmailJS (Free Email Service)

### Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click "Sign Up" (free account)
3. Verify your email address

### Step 2: Add Email Service

1. Go to **Email Services** in dashboard
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for testing)
   - Outlook
   - Yahoo
   - Or any SMTP service
4. Click **"Connect Account"**
5. For Gmail:
   - Enter your Gmail address
   - Click "Connect"
   - Allow EmailJS access
6. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **"Create New Template"**
3. Set template name: `Verification Code`
4. Edit the template:

**Subject:**
```
Your FitTrack Verification Code
```

**Content:**
```
Hello {{to_name}},

Your verification code is: {{verification_code}}

This code will expire in 10 minutes.

If you didn't request this code, please ignore this email.

Best regards,
FitTrack Team
```

5. Click **"Save"**
6. Copy the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find **Public Key** (e.g., `abcdefghij1234567`)
3. Copy it

### Step 5: Update Code

Open `script.js` and replace these values:

```javascript
// Line ~25
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your public key

// Line ~35-36
await emailjs.send(
    'YOUR_SERVICE_ID',  // Replace with your service ID
    'YOUR_TEMPLATE_ID', // Replace with your template ID
    templateParams
);
```

**Example:**
```javascript
emailjs.init("abcdefghij1234567");

await emailjs.send(
    'service_abc123',
    'template_xyz789',
    templateParams
);
```

## 🧪 Test It

1. Save the changes
2. Refresh your app
3. Try to login
4. Check your email inbox
5. Enter the 6-digit code
6. Verify!

## 📋 EmailJS Free Tier

- ✅ 200 emails/month (free)
- ✅ No credit card required
- ✅ Multiple email services
- ✅ Custom templates
- ✅ Easy integration

## 🔒 Security Note

For production:
- Use environment variables for keys
- Implement rate limiting
- Add CAPTCHA to prevent abuse
- Consider upgrading EmailJS plan for more emails

## 🎯 Email Template Variables

Available variables in template:
- `{{to_email}}` - Recipient email
- `{{to_name}}` - Recipient name (from email)
- `{{verification_code}}` - 6-digit code

## ⚠️ Gmail Users

If using Gmail:
1. Enable "Less secure app access" OR
2. Use App Password (recommended):
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
   - Use that password in EmailJS

## 🚀 Alternative Email Services

If you prefer other services:
- **SendGrid** - 100 emails/day free
- **AWS SES** - 62,000 emails/month free (first year)
- **Mailgun** - 5,000 emails/month free
- **Postmark** - 100 emails/month free

All require more setup but offer better deliverability.

---

**Once configured, verification codes will be sent directly to user emails!** 📧✅
