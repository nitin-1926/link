'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useWidgetProps, useMaxHeight, useDisplayMode, useRequestDisplayMode, useIsChatGptApp } from './hooks';
import ProjectViewer from './components/ProjectViewer';

interface PreviewUrl {
	sizeId: string;
	dimension: string;
	creativeUrl: string;
	thumbnail: string;
}

interface ProjectData {
	projectId?: string;
	shortId?: string;
	projectLink?: string;
	previewUrls?: PreviewUrl[];
	error?: boolean;
	message?: string;
}

interface ToolOutput extends Record<string, unknown> {
	name?: string;
	result?: {
		structuredContent?: {
			name?: string;
			projectId?: string;
			shortId?: string;
			projectLink?: string;
			previewUrls?: PreviewUrl[];
			error?: boolean;
			message?: string;
		};
	};
	projectId?: string;
	shortId?: string;
	projectLink?: string;
	previewUrls?: PreviewUrl[];
	error?: boolean;
	message?: string;
}

export default function Home() {
	const toolOutput = useWidgetProps<ToolOutput>();
	const maxHeight = useMaxHeight() ?? undefined;
	const displayMode = useDisplayMode();
	const requestDisplayMode = useRequestDisplayMode();
	const isChatGptApp = useIsChatGptApp();

	const name = toolOutput?.result?.structuredContent?.name || toolOutput?.name;

	const projectData: ProjectData | null = toolOutput?.result?.structuredContent?.projectId
		? (toolOutput.result.structuredContent as ProjectData)
		: toolOutput?.projectId
		? (toolOutput as ProjectData)
		: null;

	const isProjectView = projectData && projectData.projectId && !projectData.error;

	if (isProjectView && projectData) {
		return (
			<div
				className="font-sans w-full"
				style={{
					maxHeight,
					height: displayMode === 'fullscreen' ? maxHeight : undefined,
				}}
			>
				{displayMode !== 'fullscreen' && (
					<button
						aria-label="Enter fullscreen"
						className="fixed top-4 right-4 z-50 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/10 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
						onClick={() => requestDisplayMode('fullscreen')}
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
							/>
						</svg>
					</button>
				)}
				<div className="p-4">
					<ProjectViewer
						projectId={projectData.projectId!}
						projectLink={projectData.projectLink!}
						previewUrls={projectData.previewUrls || []}
						maxHeight={maxHeight}
					/>
				</div>
			</div>
		);
	}

	if (projectData?.error) {
		return (
			<div
				className="font-sans flex items-center justify-center p-8"
				style={{
					maxHeight,
					height: displayMode === 'fullscreen' ? maxHeight : undefined,
				}}
			>
				<div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg px-6 py-4 max-w-2xl">
					<div className="flex items-start gap-3">
						<svg
							className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clipRule="evenodd"
							/>
						</svg>
						<div>
							<h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-1">
								Error Creating Project
							</h3>
							<p className="text-sm text-red-800 dark:text-red-200">
								{projectData.message || 'An unknown error occurred'}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20"
			style={{
				maxHeight,
				height: displayMode === 'fullscreen' ? maxHeight : undefined,
			}}
		>
			{displayMode !== 'fullscreen' && (
				<button
					aria-label="Enter fullscreen"
					className="fixed top-4 right-4 z-50 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/10 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
					onClick={() => requestDisplayMode('fullscreen')}
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
						/>
					</svg>
				</button>
			)}
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				{!isChatGptApp && (
					<div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3 w-full">
						<div className="flex items-center gap-3">
							<svg
								className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="flex-1 min-w-0">
								<p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
									This app relies on data from a ChatGPT session.
								</p>
								<p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
									No{' '}
									<a
										href="https://developers.openai.com/apps-sdk/reference"
										target="_blank"
										rel="noopener noreferrer"
										className="underline hover:no-underline font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded"
									>
										window.openai
									</a>{' '}
									property detected
								</p>
							</div>
						</div>
					</div>
				)}
				<Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
				<ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
					<li className="mb-2 tracking-[-.01em]">Welcome to the Rocketium ChatGPT Widget</li>
					<li className="mb-2 tracking-[-.01em]">Name returned from tool call: {name ?? '...'}</li>
					<li className="mb-2 tracking-[-.01em]">MCP server path: /mcp</li>
					<li className="mb-2 tracking-[-.01em]">Try: &quot;Create a project about summer sales&quot;</li>
				</ol>

				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<Link
						className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
						prefetch={false}
						href="/custom-page"
					>
						Visit another page
					</Link>
					<a
						href="https://vercel.com/templates/ai/chatgpt-app-with-next-js"
						target="_blank"
						rel="noopener noreferrer"
						className="underline"
					>
						Deploy on Vercel
					</a>
				</div>
			</main>
		</div>
	);
}
