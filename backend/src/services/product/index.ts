/**
 * @summary
 * Centralized exports for product service.
 *
 * @module services/product
 */

export { productGetDetail, productGetRelated } from './productRules';
export type {
  ProductEntity,
  ProductDetailEntity,
  ProductRelatedEntity,
  NavigationControls,
  SizeInfo,
  Certification,
} from './productTypes';
