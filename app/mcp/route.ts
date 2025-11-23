import { baseURL } from "@/baseUrl";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const getAppsSdkCompatibleHtml = async (baseUrl: string, path: string) => {
  const result = await fetch(`${baseUrl}${path}`);
  return await result.text();
};

type ContentWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html: string;
  description: string;
  widgetDomain: string;
};

function widgetMeta(widget: ContentWidget) {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": false,
    "openai/resultCanProduceWidget": true,
  } as const;
}

async function callCreateProjectAPI(userPrompt: string) {
  const response = await fetch(`${baseURL}/api/create-project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userPrompt }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create project');
  }

  return await response.json();
}

const handler = createMcpHandler(async (server: any) => {
  const html = await getAppsSdkCompatibleHtml(baseURL, "/");

  const contentWidget: ContentWidget = {
    id: "show_content",
    title: "Show Content",
    templateUri: "ui://widget/content-template.html",
    invoking: "Loading content...",
    invoked: "Content loaded",
    html: html,
    description: "Displays the homepage content",
    widgetDomain: "https://nextjs.org/docs",
  };

  const projectWidget: ContentWidget = {
    id: "create_project",
    title: "Create Project",
    templateUri: "ui://widget/project-template.html",
    invoking: "Creating your project...",
    invoked: "Project created successfully!",
    html: html,
    description: "Create and view your Rocketium project",
    widgetDomain: "https://rocketium.com",
  };

  server.registerResource(
    "content-widget",
    contentWidget.templateUri,
    {
      title: contentWidget.title,
      description: contentWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": contentWidget.description,
        "openai/widgetPrefersBorder": true,
      },
    },
    async (uri: any) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${contentWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": contentWidget.description,
            "openai/widgetPrefersBorder": true,
            "openai/widgetDomain": contentWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerResource(
    "project-widget",
    projectWidget.templateUri,
    {
      title: projectWidget.title,
      description: projectWidget.description,
      mimeType: "text/html+skybridge",
      _meta: {
        "openai/widgetDescription": projectWidget.description,
        "openai/widgetPrefersBorder": false,
      },
    },
    async (uri: any) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/html+skybridge",
          text: `<html>${projectWidget.html}</html>`,
          _meta: {
            "openai/widgetDescription": projectWidget.description,
            "openai/widgetPrefersBorder": false,
            "openai/widgetDomain": projectWidget.widgetDomain,
          },
        },
      ],
    })
  );

  server.registerTool(
    contentWidget.id,
    {
      title: contentWidget.title,
      description:
        "Fetch and display the homepage content with the name of the user",
      inputSchema: {
        name: z.string().describe("The name of the user to display on the homepage"),
      },
      _meta: widgetMeta(contentWidget),
    },
    async ({ name }: { name: string }) => {
      return {
        content: [
          {
            type: "text",
            text: name,
          },
        ],
        structuredContent: {
          name: name,
          timestamp: new Date().toISOString(),
        },
        _meta: widgetMeta(contentWidget),
      };
    }
  );

  server.registerTool(
    projectWidget.id,
    {
      title: projectWidget.title,
      description:
        "Create a new image project from a user prompt. Takes a descriptive prompt about the desired project (theme, products, text, effects, CTAs) and generates a complete project using AI.",
      inputSchema: {
        userPrompt: z.string().describe("A descriptive prompt for creating a video project. Include details about the theme, products, text content, effects, and call-to-action elements you want in the project."),
      },
      _meta: widgetMeta(projectWidget),
    },
    async ({ userPrompt }: { userPrompt: string }) => {
      try {
        const result = await callCreateProjectAPI(userPrompt);

        if ('error' in result && result.error) {
          return {
            content: [
              {
                type: "text",
                text: `Error: ${result.message}`,
              },
            ],
            structuredContent: {
              error: true,
              message: result.message,
              userPrompt: userPrompt,
            },
            _meta: widgetMeta(projectWidget),
          };
        }

        return {
          content: [
            {
              type: "text",
              text: `Project created successfully! Project ID: ${result.projectId}`,
            },
          ],
          structuredContent: {
            projectId: result.projectId,
            shortId: result.shortId,
            projectLink: result.projectLink,
            previewUrls: result.previewUrls,
            timestamp: new Date().toISOString(),
          },
          _meta: widgetMeta(projectWidget),
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: "text",
              text: `Error creating project: ${errorMessage}`,
            },
          ],
          structuredContent: {
            error: true,
            message: errorMessage,
            userPrompt: userPrompt,
          },
          _meta: widgetMeta(projectWidget),
        };
      }
    }
  );
});

export const GET = handler;
export const POST = handler;
