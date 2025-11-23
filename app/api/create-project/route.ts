import { NextRequest, NextResponse } from 'next/server';
import { CreateProjectInput, ApiResponse, CreateProjectResponse, ErrorResponse } from './types';

const API_ENDPOINT = '/api/v3/aiProjectCreator/createFromPrompt';

export async function POST(request: NextRequest): Promise<NextResponse<CreateProjectResponse | ErrorResponse>> {
	try {
		const body: CreateProjectInput = await request.json();

		if (!body.userPrompt) {
			return NextResponse.json(
				{
					error: true,
					message: 'userPrompt is required',
					userPrompt: body.userPrompt,
				},
				{ status: 400 },
			);
		}

	// Hardcoded response for testing
	// const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
	// const sessionId = process.env.SESSION_ID;
	// const userId = process.env.USER_ID;
	// const teamId = process.env.TEAM_ID;

	// if (!sessionId || !userId || !teamId) {
	// 	return NextResponse.json(
	// 		{
	// 			error: true,
	// 			message: 'Missing required environment variables (SESSION_ID, USER_ID, or TEAM_ID)',
	// 		},
	// 		{ status: 500 },
	// 	);
	// }

	// const headers = {
	// 	Accept: 'application/json, text/plain, */*',
	// 	'Access-Control-Allow-Origin': '*',
	// 	sessionid: sessionId,
	// 	userid: userId,
	// 	'Content-Type': 'application/json',
	// };

	// const requestBody = {
	// 	userPrompt: body.userPrompt,
	// 	teamId: teamId,
	// };

	// const controller = new AbortController();
	// const timeoutId = setTimeout(() => controller.abort(), 100000);

	// const response = await fetch(`${apiBaseUrl}${API_ENDPOINT}`, {
	// 	method: 'POST',
	// 	headers,
	// 	body: JSON.stringify(requestBody),
	// 	signal: controller.signal,
	// });

	// clearTimeout(timeoutId);

	// if (!response.ok) {
	// 	const errorText = await response.text();
	// 	return NextResponse.json(
	// 		{
	// 			error: true,
	// 			message: `API request failed: ${response.status} ${response.statusText} - ${errorText}`,
	// 			userPrompt: body.userPrompt,
	// 		},
	// 		{ status: response.status },
	// 	);
	// }

	// const apiResponse: ApiResponse = await response.json();

	// if (!apiResponse.success || !apiResponse.data) {
	// 	return NextResponse.json(
	// 		{
	// 			error: true,
	// 			message: apiResponse.message || 'Failed to create project',
	// 			userPrompt: body.userPrompt,
	// 		},
	// 		{ status: 500 },
	// 	);
	// }

	// const result: CreateProjectResponse = {
	// 	success: true,
	// 	message: apiResponse.message,
	// 	projectId: apiResponse.data.projectId,
	// 	shortId: apiResponse.data.shortId,
	// 	projectLink: apiResponse.data.projectLink,
	// 	previewUrls: apiResponse.data.previewUrls,
	// };

	const result: CreateProjectResponse = {
		success: true,
		message: 'Project created successfully',
		projectId: 'dd3d4dfc-2b2a-4f3a-9de0-2884e711da1c',
		shortId: 'JiY8w0x0YmjU-489',
		projectLink: 'http://localhost:3000/advertising/campaign/editor/JiY8w0x0YmjU-489/AI-Generated-Project',
		previewUrls: [
			{
				sizeId: '1080x1080',
				dimension: '1080x1080',
				creativeUrl: 'https://dev.rocketium.com/images/export/dd3d4dfc-2b2a-4f3a-9de0-2884e711da1c/1080x1080-10a0a439-c8ec-489a-914b-3b418717bee1-1763701008852.png',
				thumbnail: 'https://dev.rocketium.com/images/export/dd3d4dfc-2b2a-4f3a-9de0-2884e711da1c/1080x1080-10a0a439-c8ec-489a-914b-3b418717bee1-1763701008852.png',
			},
		],
	};

	return NextResponse.json(result);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

		return NextResponse.json(
			{
				error: true,
				message: errorMessage,
			},
			{ status: 500 },
		);
	}
}

