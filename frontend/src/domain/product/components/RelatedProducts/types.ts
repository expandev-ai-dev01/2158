import type { RelatedProduct } from '../../types/models';

export interface RelatedProductsProps {
  products: RelatedProduct[];
  isLoading?: boolean;
  minimumProducts?: number;
}
