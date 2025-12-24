import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductDetailOptions } from './types';

export const useProductDetail = ({ productId }: UseProductDetailOptions) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => productService.getDetail(productId),
    enabled: !!productId,
  });
};
