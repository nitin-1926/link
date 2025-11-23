export interface CreateProjectInput {
	userPrompt: string;
}

export interface PreviewUrl {
	sizeId: string;
	dimension: string;
	creativeUrl: string;
	thumbnail: string;
}

export interface ApiResponse {
	success: boolean;
	message: string;
	data: {
		projectId: string;
		shortId: string;
		projectLink: string;
		previewUrls: PreviewUrl[];
	};
}

export interface CreateProjectResponse {
	success: boolean;
	message: string;
	projectId: string;
	shortId: string;
	projectLink: string;
	previewUrls: PreviewUrl[];
}

export interface ErrorResponse {
	error: true;
	message: string;
	userPrompt?: string;
}

