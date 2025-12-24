import type { SizeDimension } from '../../types/models';

export interface ProductSizeSelectorProps {
  availableSizes: string[];
  sizeDimensions: Record<string, SizeDimension>;
  sizePrices: Record<string, number>;
  stockStatus: Record<string, 'disponível' | 'indisponível' | 'sob encomenda'>;
}
