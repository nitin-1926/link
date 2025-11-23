# Widget Usage Guide

## Overview

The Rocketium Create Project Widget provides an interactive canvas-based interface for viewing and editing AI-generated projects directly from ChatGPT.

## Features

### Canvas Viewer
- Full-screen canvas interface for project preview
- High-quality image rendering
- Responsive design that adapts to ChatGPT's display modes

### Zoom Controls
- **Zoom In:** Increase image size up to 300%
- **Zoom Out:** Decrease image size down to 50%
- **Reset:** Return to original size and position
- **Zoom Display:** Shows current zoom percentage

### Pan Functionality
- Drag the image to pan when zoomed in
- Mouse drag support for desktop
- Touch drag support for mobile devices
- Automatic cursor change (grab/grabbing)

### Edit Button
- Floating button positioned at bottom-right
- Gradient blue design with hover effects
- Opens project in Rocketium editor
- Works in both ChatGPT and browser environments

### Display Information
- Project dimension badge (e.g., "1920x1080")
- Loading spinner while image loads
- Error states with helpful messages

## Using the Widget

### Creating a Project

In ChatGPT, use natural language to describe your project:

```
Create a project about [your topic]
```

Examples:
- "Create a project about summer sales with bright colors"
- "Create a promotional banner for our new product launch"
- "Create a social media post about sustainable fashion"

### Interacting with the Preview

1. **View the Preview:**
   - The project preview loads automatically
   - Wait for the image to fully load

2. **Zoom In/Out:**
   - Click the magnifying glass buttons in the top-left
   - Or use the reset button to return to default

3. **Pan the Image:**
   - When zoomed in, click and drag to move the image
   - On mobile, use touch and drag

4. **Edit the Project:**
   - Click the "Edit in Rocketium" button
   - The project opens in the Rocketium editor
   - Continue editing with full editor capabilities

### Fullscreen Mode

- Click the fullscreen icon in the top-right corner
- Expands the widget to fill the available space
- Provides better viewing experience for detailed work

## Widget States

### Loading State
- Displays a spinner while creating the project
- Shows "Creating your project..." message

### Success State
- Displays the project preview image
- Shows zoom controls and dimension info
- Presents the "Edit in Rocketium" button

### Error State
- Shows error message if project creation fails
- Provides details about what went wrong
- Suggests next steps

## Technical Details

### Supported Features
- Desktop and mobile browsers
- ChatGPT web and mobile apps
- Various display modes (inline, fullscreen)
- Dark and light themes

### Image Formats
- Supports all standard web image formats
- Renders both creative URLs and thumbnails
- Handles various aspect ratios

### Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- High contrast mode support
- Semantic HTML structure

## Best Practices

1. **Clear Descriptions:**
   - Provide detailed project descriptions
   - Include colors, themes, and content requirements
   - Mention specific elements you want included

2. **Preview Review:**
   - Zoom in to check details
   - Pan around to view all elements
   - Verify text and image quality

3. **Editing Workflow:**
   - Use the widget for quick preview
   - Click "Edit in Rocketium" for detailed edits
   - Save changes in the editor

## Limitations

- Preview shows the first dimension only
- Image quality depends on backend rendering
- Zoom limited to 300% for performance
- Requires active internet connection

## Troubleshooting

### Image Not Loading
- Check your internet connection
- Verify the project was created successfully
- Try refreshing the ChatGPT conversation

### Zoom/Pan Not Working
- Ensure you're zoomed in (zoom > 100%)
- Try clicking and dragging from the center
- Check browser console for errors

### Edit Button Not Working
- Verify you're in a ChatGPT environment
- Check that the project link is valid
- Ensure popups are not blocked

## Support

For additional help:
- Review the ENV_SETUP.md file
- Check the DEPLOYMENT.md guide
- Contact your administrator

