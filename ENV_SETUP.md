# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in the root of the link project with the following variables:

```env
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Rocketium API Credentials
SESSION_ID=6918d71717b8b134e625eefd
USER_ID=5eeafcb22164e02998b90a1e
TEAM_ID=64f1f74d68a2d493d311b12f
```

## Configuration Details

### NEXT_PUBLIC_API_BASE_URL
- The base URL for your Rocketium backend API
- Default: `http://localhost:3000`
- For production, update this to your production API URL

### SESSION_ID
- Your Rocketium session ID
- Required for API authentication

### USER_ID
- Your Rocketium user ID
- Required for API authentication

### TEAM_ID
- Your Rocketium team ID
- Required for project creation

## Development Setup

1. Create the `.env.local` file with the values above
2. Run `npm install` (or `pnpm install`) to install dependencies
3. Run `npm run dev` to start the development server on port 6969
4. Access the app at `http://localhost:6969`

## Vercel Deployment

When deploying to Vercel, add these environment variables in your project settings:
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add each variable listed above
4. Redeploy your application

## Testing the Widget

1. Deploy your app to Vercel (or use ngrok for local testing)
2. Get the HTTPS URL of your deployed app
3. In ChatGPT, configure your MCP server to point to: `https://your-app-url.vercel.app/mcp`
4. Use the `create_project` tool with a prompt like: "Create a project about summer sales"
5. The widget should render with your project preview and an "Edit in Rocketium" button

## Port Configuration

The development server runs on port 6969 as specified. This is configured in:
- `package.json` dev script: `next dev --turbopack -p 6969`
- `baseUrl.ts`: `http://localhost:6969` for development mode

## Prettier Configuration

Prettier has been configured with the same settings as the MCP project:
- Single quotes
- Tab width: 4
- Uses tabs
- Semicolons enabled
- Print width: 120

Run `npm run format` to format all files.

