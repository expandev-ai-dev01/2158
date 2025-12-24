import type { NavigationControls } from '../../types/models';

export interface ProductImageGalleryProps {
  images: string[];
  mainImageIndex: number;
  zoomEnabled: boolean;
  navigationControls: NavigationControls;
  productName: string;
}
