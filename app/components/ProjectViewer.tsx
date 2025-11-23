'use client';

import { useState, useRef, useEffect } from 'react';
import { useOpenExternal } from '../hooks';

interface PreviewUrl {
	sizeId: string;
	dimension: string;
	creativeUrl: string;
	thumbnail: string;
}

interface ProjectViewerProps {
	projectId: string;
	projectLink: string;
	previewUrls: PreviewUrl[];
	maxHeight?: number;
}

export default function ProjectViewer({ projectId, projectLink, previewUrls, maxHeight }: ProjectViewerProps) {
	const [zoom, setZoom] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [imageLoaded, setImageLoaded] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const openExternal = useOpenExternal();

	const previewUrl = previewUrls && previewUrls.length > 0 ? previewUrls[0] : null;
	const imageUrl = previewUrl?.creativeUrl || previewUrl?.thumbnail;

	const handleZoomIn = () => {
		setZoom(prev => Math.min(prev + 0.25, 3));
	};

	const handleZoomOut = () => {
		setZoom(prev => Math.max(prev - 0.25, 0.5));
	};

	const handleResetZoom = () => {
		setZoom(1);
		setPosition({ x: 0, y: 0 });
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		if (zoom > 1) {
			setIsDragging(true);
			setDragStart({
				x: e.clientX - position.x,
				y: e.clientY - position.y,
			});
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (isDragging && zoom > 1) {
			setPosition({
				x: e.clientX - dragStart.x,
				y: e.clientY - dragStart.y,
			});
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		if (zoom > 1 && e.touches.length === 1) {
			setIsDragging(true);
			setDragStart({
				x: e.touches[0].clientX - position.x,
				y: e.touches[0].clientY - position.y,
			});
		}
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (isDragging && zoom > 1 && e.touches.length === 1) {
			setPosition({
				x: e.touches[0].clientX - dragStart.x,
				y: e.touches[0].clientY - dragStart.y,
			});
		}
	};

	const handleTouchEnd = () => {
		setIsDragging(false);
	};

	const handleEditClick = () => {
		if (openExternal) {
			openExternal(projectLink);
		} else {
			window.open(projectLink, '_blank');
		}
	};

	useEffect(() => {
		const handleMouseUpGlobal = () => setIsDragging(false);
		window.addEventListener('mouseup', handleMouseUpGlobal);
		return () => window.removeEventListener('mouseup', handleMouseUpGlobal);
	}, []);

	if (!imageUrl) {
		return (
			<div
				className="flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-lg p-8"
				style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
			>
				<div className="text-center">
					<div className="text-slate-600 dark:text-slate-400 mb-2">No preview available</div>
					<div className="text-sm text-slate-500 dark:text-slate-500">Project ID: {projectId}</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className="relative w-full bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden"
			style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined, height: maxHeight ? `${maxHeight}px` : '600px' }}
		>
			<div className="absolute top-4 left-4 z-10 flex gap-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-2">
				<button
					onClick={handleZoomIn}
					disabled={zoom >= 3}
					className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					aria-label="Zoom in"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
					</svg>
				</button>
				<button
					onClick={handleZoomOut}
					disabled={zoom <= 0.5}
					className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					aria-label="Zoom out"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM7 10h6" />
					</svg>
				</button>
				<button
					onClick={handleResetZoom}
					className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
					aria-label="Reset zoom"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
				</button>
				<div className="flex items-center px-3 text-sm font-medium text-slate-700 dark:text-slate-300">
					{Math.round(zoom * 100)}%
				</div>
			</div>

			{previewUrl && (
				<div className="absolute top-4 right-4 z-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg px-3 py-2 text-sm">
					<div className="text-slate-600 dark:text-slate-400">{previewUrl.dimension}</div>
				</div>
			)}

			<div
				ref={containerRef}
				className="w-full h-full flex items-center justify-center overflow-hidden"
				style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{!imageLoaded && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-slate-100"></div>
					</div>
				)}
				<img
					src={imageUrl}
					alt="Project preview"
					className="max-w-full max-h-full object-contain transition-opacity duration-300"
					style={{
						transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
						transformOrigin: 'center center',
						opacity: imageLoaded ? 1 : 0,
					}}
					onLoad={() => setImageLoaded(true)}
					draggable={false}
				/>
			</div>

			<button
				onClick={handleEditClick}
				className="fixed bottom-6 right-6 z-20 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
			>
				<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
					/>
				</svg>
				Edit in Rocketium
			</button>
		</div>
	);
}

