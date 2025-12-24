import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseRelatedProductsOptions } from './types';

export const useRelatedProducts = ({ productId, limit = 4 }: UseRelatedProductsOptions) => {
  return useQuery({
    queryKey: ['relatedProducts', productId, limit],
    queryFn: () => productService.getRelated(productId, limit),
    enabled: !!productId,
  });
};
