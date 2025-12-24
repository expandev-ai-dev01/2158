/**
 * @service Product Service
 * @domain product
 * @type REST API
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Product, RelatedProduct } from '../types/models';

export const productService = {
  /**
   * Get product detail by ID
   * @param id - Product unique identifier
   * @returns Product detail data
   */
  async getDetail(id: string): Promise<Product> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: Product }>(
      `/product/${id}`
    );
    return data.data;
  },

  /**
   * Get related products
   * @param id - Product unique identifier
   * @param limit - Maximum number of related products
   * @returns Array of related products
   */
  async getRelated(id: string, limit = 4): Promise<RelatedProduct[]> {
    const { data } = await authenticatedClient.get<{
      success: boolean;
      data: RelatedProduct[];
    }>(`/product/${id}/related`, {
      params: { limit },
    });
    return data.data;
  },
};
