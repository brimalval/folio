"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
	id: string;
	src: string;
	alt: string;
	title?: string;
}

interface ProjectGalleryProps {
	images: GalleryImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
	const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
		null
	);

	const openImage = (index: number) => {
		setSelectedImageIndex(index);
	};

	const closeImage = () => {
		setSelectedImageIndex(null);
	};

	const navigateImage = (direction: "prev" | "next") => {
		if (selectedImageIndex === null) return;

		if (direction === "prev") {
			setSelectedImageIndex(
				selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1
			);
		} else {
			setSelectedImageIndex(
				selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1
			);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (selectedImageIndex === null) return;

		if (e.key === "Escape") closeImage();
		if (e.key === "ArrowLeft") navigateImage("prev");
		if (e.key === "ArrowRight") navigateImage("next");
	};

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{images.map((image, index) => (
					<div
						key={image.id}
						className="relative aspect-square overflow-hidden rounded-lg border cursor-pointer transition-transform hover:scale-105"
						onClick={() => openImage(index)}
					>
						<img
							src={image.src}
							alt={image.alt}
							className="h-full w-full object-cover"
						/>
					</div>
				))}
			</div>

			{selectedImageIndex !== null && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
					onClick={closeImage}
					onKeyDown={handleKeyDown}
					tabIndex={0}
				>
					<div
						className="relative max-w-4xl max-h-[90vh] w-full"
						onClick={e => e.stopPropagation()}
					>
						<Button
							variant="ghost"
							size="icon"
							className="absolute -top-12 right-0 text-white hover:bg-white/20"
							onClick={closeImage}
						>
							<X className="h-6 w-6" />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
							onClick={() => navigateImage("prev")}
						>
							<ChevronLeft className="h-8 w-8" />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
							onClick={() => navigateImage("next")}
						>
							<ChevronRight className="h-8 w-8" />
						</Button>

						<img
							src={images[selectedImageIndex].src}
							alt={images[selectedImageIndex].alt}
							className="w-full h-full object-contain"
						/>

						{images[selectedImageIndex].title && (
							<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
								<p className="text-center">
									{images[selectedImageIndex].title}
								</p>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
