/**
 * @summary
 * Product service type definitions.
 * Defines interfaces for product entities and related data structures.
 *
 * @module services/product/types
 */

/**
 * @interface NavigationControls
 * @description Gallery navigation controls configuration
 *
 * @property {object} arrows - Arrow controls configuration
 * @property {boolean} arrows.enabled - Arrow controls enabled
 * @property {string} arrows.style - Arrow style
 * @property {object} dots - Dot indicators configuration
 * @property {boolean} dots.enabled - Dot indicators enabled
 * @property {string} dots.position - Dot position
 * @property {boolean} swipeEnabled - Swipe gestures enabled
 * @property {boolean} keyboardEnabled - Keyboard navigation enabled
 */
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

/**
 * @interface SizeInfo
 * @description Size dimension information
 *
 * @property {number} width - Width in centimeters
 * @property {number} length - Length in centimeters
 */
export interface SizeInfo {
  width: number;
  length: number;
}

/**
 * @interface Certification
 * @description Product certification information
 *
 * @property {string} name - Certification name
 * @property {string} logoUrl - Certification logo URL
 * @property {string} description - Certification description
 */
export interface Certification {
  name: string;
  logoUrl: string;
  description: string;
}

/**
 * @interface ProductEntity
 * @description Complete product entity stored in memory
 *
 * @property {string} id - Product unique identifier (UUID)
 * @property {string} modelName - Product model name
 * @property {string} brand - Product brand
 * @property {string} detailedDescription - Complete product description
 * @property {string[]} imageUrls - Array of product image URLs
 * @property {number} mainImageIndex - Index of main image in gallery
 * @property {boolean} zoomEnabled - Zoom functionality status
 * @property {NavigationControls} navigationControls - Gallery navigation settings
 * @property {number} foamDensity - Foam density in kg/m³
 * @property {string} springConfiguration - Spring system type
 * @property {string} fabricMaterial - Fabric material
 * @property {number} totalHeight - Total height in centimeters
 * @property {number} weightSupport - Maximum weight support in kg
 * @property {string} firmnessLevel - Firmness level (macio | médio | firme)
 * @property {string[]} availableSizes - Available sizes array
 * @property {Record<string, SizeInfo>} sizeDimensions - Dimensions for each size
 * @property {Record<string, number>} sizePrices - Prices for each size
 * @property {Record<string, string>} stockStatus - Stock status for each size
 * @property {number} warrantyPeriod - Warranty period in months
 * @property {string} warrantyConditions - Warranty terms and conditions
 * @property {Certification[]} certifications - Product certifications
 * @property {string} certificationDisplayMode - Display mode for certifications
 * @property {boolean} comparisonEnabled - Comparison feature enabled
 * @property {boolean} socialSharingEnabled - Social sharing enabled
 * @property {string} deliveryInfo - Delivery information
 * @property {boolean} backToCatalogEnabled - Back navigation enabled
 * @property {string} category - Product category
 * @property {boolean} active - Product active status
 */
export interface ProductEntity {
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
  firmnessLevel: string;
  availableSizes: string[];
  sizeDimensions: Record<string, SizeInfo>;
  sizePrices: Record<string, number>;
  stockStatus: Record<string, string>;
  warrantyPeriod: number;
  warrantyConditions: string;
  certifications: Certification[];
  certificationDisplayMode: string;
  comparisonEnabled: boolean;
  socialSharingEnabled: boolean;
  deliveryInfo: string;
  backToCatalogEnabled: boolean;
  category: string;
  active: boolean;
}

/**
 * @interface ProductDetailEntity
 * @description Product detail response entity
 *
 * @property {string} id - Product unique identifier
 * @property {string} modelName - Product model name
 * @property {string} brand - Product brand
 * @property {string} detailedDescription - Complete product description
 * @property {string[]} imageUrls - Array of product image URLs
 * @property {number} mainImageIndex - Index of main image in gallery
 * @property {boolean} zoomEnabled - Zoom functionality status
 * @property {NavigationControls} navigationControls - Gallery navigation settings
 * @property {number} foamDensity - Foam density in kg/m³
 * @property {string} springConfiguration - Spring system type
 * @property {string} fabricMaterial - Fabric material
 * @property {number} totalHeight - Total height in centimeters
 * @property {number} weightSupport - Maximum weight support in kg
 * @property {string} firmnessLevel - Firmness level
 * @property {string[]} availableSizes - Available sizes array
 * @property {Record<string, SizeInfo>} sizeDimensions - Dimensions for each size
 * @property {Record<string, number>} sizePrices - Prices for each size
 * @property {Record<string, string>} stockStatus - Stock status for each size
 * @property {number} warrantyPeriod - Warranty period in months
 * @property {string} warrantyConditions - Warranty terms and conditions
 * @property {Certification[]} certifications - Product certifications
 * @property {string} certificationDisplayMode - Display mode for certifications
 * @property {boolean} comparisonEnabled - Comparison feature enabled
 * @property {boolean} socialSharingEnabled - Social sharing enabled
 * @property {string} deliveryInfo - Delivery information
 * @property {boolean} backToCatalogEnabled - Back navigation enabled
 */
export interface ProductDetailEntity {
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
  firmnessLevel: string;
  availableSizes: string[];
  sizeDimensions: Record<string, SizeInfo>;
  sizePrices: Record<string, number>;
  stockStatus: Record<string, string>;
  warrantyPeriod: number;
  warrantyConditions: string;
  certifications: Certification[];
  certificationDisplayMode: string;
  comparisonEnabled: boolean;
  socialSharingEnabled: boolean;
  deliveryInfo: string;
  backToCatalogEnabled: boolean;
}

/**
 * @interface ProductRelatedEntity
 * @description Related product summary entity
 *
 * @property {string} id - Product unique identifier
 * @property {string} modelName - Product model name
 * @property {string} brand - Product brand
 * @property {string} mainImageUrl - Main product image URL
 * @property {number} basePrice - Base price for smallest size
 * @property {string} firmnessLevel - Firmness level
 * @property {string} category - Product category
 */
export interface ProductRelatedEntity {
  id: string;
  modelName: string;
  brand: string;
  mainImageUrl: string;
  basePrice: number;
  firmnessLevel: string;
  category: string;
}
