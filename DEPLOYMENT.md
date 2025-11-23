# Deployment Guide

## Vercel Deployment

### Step 1: Prepare Your Repository
Ensure all changes are committed to your Git repository.

### Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `./` (or the path to your link folder)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Step 3: Configure Environment Variables

In the Vercel project settings, add the following environment variables:

```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
SESSION_ID=6918d71717b8b134e625eefd
USER_ID=5eeafcb22164e02998b90a1e
TEAM_ID=64f1f74d68a2d493d311b12f
```

**Important:** Update `NEXT_PUBLIC_API_BASE_URL` to your production backend API URL.

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

### Step 5: Get Your MCP URL

After deployment, your MCP endpoint will be available at:
```
https://your-app-name.vercel.app/mcp
```

## Configuring ChatGPT

### Option 1: ChatGPT Web (Custom GPT)

1. Go to ChatGPT
2. Create or edit a Custom GPT
3. In the Actions section, add your MCP endpoint
4. Configure the action to use the `create_project` tool

### Option 2: ChatGPT API Integration

Use the OpenAI API with your deployed MCP server URL.

## Testing the Integration

1. In ChatGPT, use a prompt like:
   ```
   Create a project about summer sales with bright colors and promotional text
   ```

2. The widget should:
   - Display a loading state while creating the project
   - Show the project preview image in a zoomable canvas
   - Display a floating "Edit in Rocketium" button
   - Open the project in Rocketium when the button is clicked

## Local Testing with ngrok

If you want to test locally before deploying to Vercel:

1. Install ngrok: `npm install -g ngrok`
2. Start your Next.js dev server: `npm run dev`
3. In another terminal, run: `ngrok http 6969`
4. Use the HTTPS URL provided by ngrok as your MCP endpoint: `https://your-id.ngrok.io/mcp`

## Troubleshooting

### Widget Not Rendering
- Verify the MCP endpoint is accessible
- Check that environment variables are set correctly
- Ensure the backend API is reachable from Vercel

### Project Creation Fails
- Check that SESSION_ID, USER_ID, and TEAM_ID are correct
- Verify the backend API is running and accessible
- Check the Network tab in browser DevTools for API errors

### Images Not Loading
- Verify the backend returns valid image URLs
- Check CORS headers are properly configured
- Ensure image URLs are publicly accessible

### Authentication Errors
- Verify all credentials in environment variables
- Check that the session hasn't expired
- Ensure the user has proper permissions

## Production Considerations

1. **Security:**
   - Store sensitive credentials in Vercel environment variables
   - Never commit `.env.local` to version control
   - Use proper authentication for production APIs

2. **Performance:**
   - Images are loaded on-demand
   - Consider adding a CDN for image delivery
   - Monitor API response times

3. **Monitoring:**
   - Set up Vercel Analytics
   - Monitor API endpoints for errors
   - Track widget usage and success rates

## Support

For issues or questions:
- Check the ENV_SETUP.md file for configuration details
- Review the project documentation
- Contact your Rocketium administrator

