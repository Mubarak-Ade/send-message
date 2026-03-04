# Portfolio Server

A simple Express backend server that handles contact form submissions and sends emails via Gmail SMTP.

## Features

- **Email Service**: Send contact form messages directly to your Gmail inbox
- **CORS Support**: Allow requests from frontend applications
- **Security**: Helmet integration for secure HTTP headers
- **Request Validation**: Validate required form fields
- **Environment Configuration**: Secure environment variable management

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express 5** - Web server framework
- **Nodemailer** - Email sending library
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Body Parser** - Request body parsing
- **Dotenv** - Environment variable management

## Project Structure

```
server/
├── index.js           # Main server file
├── package.json       # Dependencies and scripts
├── .gitignore         # Git ignore rules
└── .env               # Environment variables (not committed)
```

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=3000
   EMAIL=your_gmail_address@gmail.com
   PASSWORD=your_gmail_app_password
   NODE_ENV=development
   ```

   **Important:** For Gmail:
   - Use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
   - Enable 2-factor authentication on your Gmail account first
   - Never commit the `.env` file to version control

## Running Locally

**Start the server:**
```bash
npm start
```

Server will run on `http://localhost:3000` (or the port specified in `.env`)

## API Endpoints

### POST `/`

Send a contact form message.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Success Response (200):**
```json
{
  "message": "Message Sent Successfully"
}
```

**Error Responses:**
- **400** - Missing required fields
  ```json
  {
    "message": "Fields are Empty"
  }
  ```
- **500** - Email sending failed
  ```
  Error details from Nodemailer
  ```

## How It Works

1. Client sends a POST request to `/` with contact form data
2. Server validates that all required fields are present
3. Server creates a Nodemailer transporter configured for Gmail SMTP
4. Email is sent to your Gmail inbox with the user's message
5. Response is sent back to the client indicating success or failure

## Email Configuration

The server uses Gmail SMTP for sending emails. The email structure:
- **From**: User's email (from the contact form)
- **To**: Your Gmail address (from `process.env.EMAIL`)
- **Subject**: `Message from [User's Name]`
- **Body**: User's message text

## Security Considerations

- Environment variables are required - never hardcode credentials
- `.env` file is in `.gitignore` to prevent accidental commits
- Helmet middleware adds security headers
- CORS is configured to allow requests from your frontend
- Input validation checks for empty fields
- Sensitive credentials (email/password) are never logged

## Deployment

To deploy to production services (Heroku, Render, Railway, etc.):

1. Set environment variables on your hosting platform
2. Ensure Node.js version compatibility
3. Update the frontend API endpoint to point to your deployed server URL
4. Test email functionality after deployment

## Example Deployment Platforms

- **Render**: https://render.com
- **Railway**: https://railway.app
- **Heroku**: https://www.heroku.com
- **Vercel**: https://vercel.com (supports serverless functions)

## Troubleshooting

**"Invalid login" error:**
- Ensure you're using an App Password, not your regular Gmail password
- Verify 2-factor authentication is enabled on your Gmail account

**"Cannot find module" error:**
- Run `npm install` to install dependencies

**CORS errors:**
- Check that the backend URL matches in your frontend code
- Ensure CORS middleware is loaded before routes
