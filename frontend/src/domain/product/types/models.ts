/**
 * Product domain type definitions
 * @domain product
 */

export interface Product {
  id: string;
  modelName: string;
  brand: string;
  detailedDescription: string;
  imageUrls: string[];
  mainImageIndex: number;
  zoomEnabled: boolean;
  navigationControls: NavigationControls;
  foamDensity: number;
  springConfiguration: string;
  fabricMaterial: string;
  totalHeight: number;
  weightSupport: number;
  firmnessLevel: 'macio' | 'médio' | 'firme';
  availableSizes: string[];
  sizeDimensions: Record<string, SizeDimension>;
  sizePrices: Record<string, number>;
  stockStatus: Record<string, 'disponível' | 'indisponível' | 'sob encomenda'>;
  warrantyPeriod: number;
  warrantyConditions: string;
  certifications: Certification[];
  certificationDisplayMode: 'logos_com_texto' | 'apenas_logos' | 'apenas_texto' | 'oculto';
  comparisonEnabled: boolean;
  socialSharingEnabled: boolean;
  deliveryInfo: string;
  backToCatalogEnabled: boolean;
}

export interface NavigationControls {
  arrows: {
    enabled: boolean;
    style: string;
  };
  dots: {
    enabled: boolean;
    position: string;
  };
  swipeEnabled: boolean;
  keyboardEnabled: boolean;
}

export interface SizeDimension {
  largura: number;
  comprimento: number;
}

export interface Certification {
  name: string;
  logoUrl: string;
  description: string;
}

export interface RelatedProduct {
  id: string;
  modelName: string;
  brand: string;
  mainImageUrl: string;
  basePrice: number;
  firmnessLevel: string;
  category: string;
}
