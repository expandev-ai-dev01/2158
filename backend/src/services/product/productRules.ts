/**
 * @summary
 * Product business logic and data operations.
 * Handles product detail retrieval and related products logic.
 *
 * @module services/product
 */

import { ServiceResult, successResult } from '@/utils/serviceResult';
import { ServiceError } from '@/utils/serviceError';
import {
  ProductDetailEntity,
  ProductRelatedEntity,
  ProductEntity,
  SizeInfo,
  Certification,
} from './productTypes';

/**
 * @rule {be-in-memory-storage}
 * In-memory product storage
 */
const products: ProductEntity[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    modelName: 'Colchão Ortopédico Premium',
    brand: 'Lozorio',
    detailedDescription:
      'Colchão ortopédico de alta densidade desenvolvido para proporcionar suporte ideal à coluna vertebral. Fabricado com espuma de alta qualidade e sistema de molas ensacadas que se adaptam perfeitamente ao corpo, garantindo conforto e durabilidade excepcionais.',
    imageUrls: [
      '/images/products/ortopedico-premium-1.jpg',
      '/images/products/ortopedico-premium-2.jpg',
      '/images/products/ortopedico-premium-3.jpg',
      '/images/products/ortopedico-premium-4.jpg',
    ],
    mainImageIndex: 0,
    zoomEnabled: true,
    navigationControls: {
      arrows: { enabled: true, style: 'modern' },
      dots: { enabled: true, position: 'bottom' },
      swipeEnabled: true,
      keyboardEnabled: true,
    },
    foamDensity: 45,
    springConfiguration: 'molas ensacadas',
    fabricMaterial: 'viscose',
    totalHeight: 28,
    weightSupport: 150,
    firmnessLevel: 'firme',
    availableSizes: ['Solteiro', 'Casal', 'Queen', 'King'],
    sizeDimensions: {
      Solteiro: { width: 88, length: 188 },
      Casal: { width: 138, length: 188 },
      Queen: { width: 158, length: 198 },
      King: { width: 193, length: 203 },
    },
    sizePrices: {
      Solteiro: 1299.9,
      Casal: 1799.9,
      Queen: 2199.9,
      King: 2799.9,
    },
    stockStatus: {
      Solteiro: 'disponível',
      Casal: 'disponível',
      Queen: 'disponível',
      King: 'sob encomenda',
    },
    warrantyPeriod: 60,
    warrantyConditions:
      'Garantia de 5 anos contra defeitos de fabricação. Não cobre danos causados por uso inadequado ou desgaste natural.',
    certifications: [
      {
        name: 'INMETRO',
        logoUrl: '/images/certifications/inmetro.png',
        description: 'Certificado pelo Instituto Nacional de Metrologia',
      },
      {
        name: 'ISO 9001',
        logoUrl: '/images/certifications/iso9001.png',
        description: 'Certificação de qualidade internacional',
      },
    ],
    certificationDisplayMode: 'logos_com_texto',
    comparisonEnabled: true,
    socialSharingEnabled: true,
    deliveryInfo:
      'Entrega em até 7 dias úteis para capitais. Frete grátis para compras acima de R$ 2.000,00.',
    backToCatalogEnabled: true,
    category: 'Ortopédicos',
    active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    modelName: 'Colchão Molas Pocket Confort',
    brand: 'Lozorio',
    detailedDescription:
      'Colchão com sistema de molas pocket que proporciona conforto personalizado. Cada mola trabalha de forma independente, adaptando-se perfeitamente aos contornos do corpo.',
    imageUrls: [
      '/images/products/pocket-confort-1.jpg',
      '/images/products/pocket-confort-2.jpg',
      '/images/products/pocket-confort-3.jpg',
    ],
    mainImageIndex: 0,
    zoomEnabled: true,
    navigationControls: {
      arrows: { enabled: true, style: 'modern' },
      dots: { enabled: true, position: 'bottom' },
      swipeEnabled: true,
      keyboardEnabled: true,
    },
    foamDensity: 40,
    springConfiguration: 'molas pocket',
    fabricMaterial: 'algodão',
    totalHeight: 26,
    weightSupport: 140,
    firmnessLevel: 'médio',
    availableSizes: ['Solteiro', 'Casal', 'Queen'],
    sizeDimensions: {
      Solteiro: { width: 88, length: 188 },
      Casal: { width: 138, length: 188 },
      Queen: { width: 158, length: 198 },
    },
    sizePrices: {
      Solteiro: 1099.9,
      Casal: 1599.9,
      Queen: 1999.9,
    },
    stockStatus: {
      Solteiro: 'disponível',
      Casal: 'disponível',
      Queen: 'disponível',
    },
    warrantyPeriod: 48,
    warrantyConditions:
      'Garantia de 4 anos contra defeitos de fabricação. Não cobre danos causados por uso inadequado.',
    certifications: [
      {
        name: 'INMETRO',
        logoUrl: '/images/certifications/inmetro.png',
        description: 'Certificado pelo Instituto Nacional de Metrologia',
      },
    ],
    certificationDisplayMode: 'logos_com_texto',
    comparisonEnabled: true,
    socialSharingEnabled: true,
    deliveryInfo: 'Entrega em até 10 dias úteis. Frete calculado no checkout.',
    backToCatalogEnabled: true,
    category: 'Molas Ensacadas',
    active: true,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    modelName: 'Colchão Espuma Soft',
    brand: 'Lozorio',
    detailedDescription:
      'Colchão de espuma de alta densidade com toque macio. Ideal para quem busca conforto e aconchego durante o sono.',
    imageUrls: ['/images/products/espuma-soft-1.jpg', '/images/products/espuma-soft-2.jpg'],
    mainImageIndex: 0,
    zoomEnabled: true,
    navigationControls: {
      arrows: { enabled: true, style: 'modern' },
      dots: { enabled: true, position: 'bottom' },
      swipeEnabled: true,
      keyboardEnabled: true,
    },
    foamDensity: 33,
    springConfiguration: 'sem sistema de molas',
    fabricMaterial: 'poliéster',
    totalHeight: 18,
    weightSupport: 100,
    firmnessLevel: 'macio',
    availableSizes: ['Solteiro', 'Casal'],
    sizeDimensions: {
      Solteiro: { width: 88, length: 188 },
      Casal: { width: 138, length: 188 },
    },
    sizePrices: {
      Solteiro: 699.9,
      Casal: 999.9,
    },
    stockStatus: {
      Solteiro: 'disponível',
      Casal: 'disponível',
    },
    warrantyPeriod: 36,
    warrantyConditions: 'Garantia de 3 anos contra defeitos de fabricação.',
    certifications: [],
    certificationDisplayMode: 'oculto',
    comparisonEnabled: true,
    socialSharingEnabled: true,
    deliveryInfo: 'Entrega em até 5 dias úteis para capitais.',
    backToCatalogEnabled: true,
    category: 'Espuma',
    active: true,
  },
];

/**
 * @summary
 * Retrieves complete product details by ID
 *
 * @function productGetDetail
 * @module services/product
 *
 * @param {string} id - Product unique identifier
 *
 * @returns {Promise<ServiceResult<ProductDetailEntity>>} Complete product details
 *
 * @throws {ServiceError} PRODUCT_NOT_FOUND - When product doesn't exist
 * @throws {ServiceError} PRODUCT_INACTIVE - When product is not active
 */
export async function productGetDetail(id: string): Promise<ServiceResult<ProductDetailEntity>> {
  /**
   * @validation Find product by ID
   */
  const product = products.find((p) => p.id === id);

  if (!product) {
    throw new ServiceError('PRODUCT_NOT_FOUND', 'Produto não localizado no catálogo', 404);
  }

  /**
   * @rule {be-business-rule-002} Only active products can be displayed
   */
  if (!product.active) {
    throw new ServiceError('PRODUCT_INACTIVE', 'Este produto não está mais disponível', 404);
  }

  /**
   * @rule {be-business-rule-017} Hide certifications section when empty
   */
  const displayMode =
    product.certifications.length === 0 ? 'oculto' : product.certificationDisplayMode;

  const detailEntity: ProductDetailEntity = {
    id: product.id,
    modelName: product.modelName,
    brand: product.brand,
    detailedDescription: product.detailedDescription,
    imageUrls: product.imageUrls,
    mainImageIndex: product.mainImageIndex,
    zoomEnabled: product.zoomEnabled,
    navigationControls: product.navigationControls,
    foamDensity: product.foamDensity,
    springConfiguration: product.springConfiguration,
    fabricMaterial: product.fabricMaterial,
    totalHeight: product.totalHeight,
    weightSupport: product.weightSupport,
    firmnessLevel: product.firmnessLevel,
    availableSizes: product.availableSizes,
    sizeDimensions: product.sizeDimensions,
    sizePrices: product.sizePrices,
    stockStatus: product.stockStatus,
    warrantyPeriod: product.warrantyPeriod,
    warrantyConditions: product.warrantyConditions,
    certifications: product.certifications,
    certificationDisplayMode: displayMode,
    comparisonEnabled: product.comparisonEnabled,
    socialSharingEnabled: product.socialSharingEnabled,
    deliveryInfo: product.deliveryInfo,
    backToCatalogEnabled: product.backToCatalogEnabled,
  };

  return successResult(detailEntity, 200);
}

/**
 * @summary
 * Retrieves related products based on similarity criteria
 *
 * @function productGetRelated
 * @module services/product
 *
 * @param {string} id - Product unique identifier
 * @param {number} limit - Maximum number of related products to return
 *
 * @returns {Promise<ServiceResult<ProductRelatedEntity[]>>} Array of related products
 *
 * @throws {ServiceError} PRODUCT_NOT_FOUND - When product doesn't exist
 */
export async function productGetRelated(
  id: string,
  limit: number = 4
): Promise<ServiceResult<ProductRelatedEntity[]>> {
  /**
   * @validation Find source product
   */
  const sourceProduct = products.find((p) => p.id === id);

  if (!sourceProduct) {
    throw new ServiceError('PRODUCT_NOT_FOUND', 'Produto não localizado no catálogo', 404);
  }

  /**
   * @rule {be-business-rule-020} Apply similarity criteria
   * Priority: 1. Same category, 2. Price range ±30%, 3. Firmness level
   */
  const priceRange = {
    min: Math.min(...Object.values(sourceProduct.sizePrices)) * 0.7,
    max: Math.max(...Object.values(sourceProduct.sizePrices)) * 1.3,
  };

  const relatedProducts = products
    .filter((p) => p.id !== id && p.active)
    .map((p) => {
      let score = 0;
      const basePrice = Math.min(...Object.values(p.sizePrices));

      // Priority 1: Same category (highest weight)
      if (p.category === sourceProduct.category) score += 100;

      // Priority 2: Price range ±30%
      if (basePrice >= priceRange.min && basePrice <= priceRange.max) score += 50;

      // Priority 3: Same firmness level
      if (p.firmnessLevel === sourceProduct.firmnessLevel) score += 25;

      return { product: p, score, basePrice };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(
      (item): ProductRelatedEntity => ({
        id: item.product.id,
        modelName: item.product.modelName,
        brand: item.product.brand,
        mainImageUrl: item.product.imageUrls[item.product.mainImageIndex],
        basePrice: item.basePrice,
        firmnessLevel: item.product.firmnessLevel,
        category: item.product.category,
      })
    );

  /**
   * @rule {be-business-rule-021} Return empty array if insufficient products
   */
  return successResult(relatedProducts, 200);
}
