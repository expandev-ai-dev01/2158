import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import { Button } from '@/core/components/button';
import type { ProductImageGalleryProps } from './types';

function ProductImageGallery({
  images,
  mainImageIndex,
  zoomEnabled,
  navigationControls,
  productName,
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(mainImageIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setCurrentIndex(mainImageIndex);
  }, [mainImageIndex]);

  useEffect(() => {
    if (!navigationControls.keyboardEnabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, navigationControls.keyboardEnabled]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleZoomToggle = () => {
    if (zoomEnabled) {
      setIsZoomed(!isZoomed);
    }
  };

  if (!images?.length) {
    return (
      <div className="bg-muted flex h-96 w-full items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">Nenhuma imagem disponível</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="bg-muted group relative overflow-hidden rounded-lg border shadow-sm">
        <div
          className={cn(
            'relative aspect-square w-full transition-transform duration-300',
            isZoomed && 'scale-[3] cursor-zoom-out',
            !isZoomed && zoomEnabled && 'cursor-zoom-in'
          )}
          onClick={handleZoomToggle}
        >
          <img
            src={images[currentIndex]}
            alt={`${productName} - Imagem ${currentIndex + 1}`}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Zoom Button */}
        {zoomEnabled && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleZoomToggle}
          >
            <ZoomIn />
          </Button>
        )}

        {/* Navigation Arrows */}
        {navigationControls.arrows.enabled && images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handlePrevious}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleNext}
            >
              <ChevronRight />
            </Button>
          </>
        )}

        {/* Dots Indicator */}
        {navigationControls.dots.enabled && images.length > 1 && (
          <div
            className={cn(
              'absolute flex gap-2',
              navigationControls.dots.position === 'bottom' && 'bottom-4 left-1/2 -translate-x-1/2'
            )}
          >
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  'h-2 w-2 rounded-full transition-all',
                  currentIndex === index ? 'bg-primary w-6' : 'bg-muted-foreground/50'
                )}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                'hover:border-primary aspect-square overflow-hidden rounded-md border-2 transition-all',
                currentIndex === index ? 'border-primary' : 'border-transparent'
              )}
            >
              <img
                src={image}
                alt={`${productName} - Miniatura ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { ProductImageGallery };
