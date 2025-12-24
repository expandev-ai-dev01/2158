import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { Separator } from '@/core/components/separator';
import type { ProductSizeSelectorProps } from './types';

function ProductSizeSelector({
  availableSizes,
  sizeDimensions,
  sizePrices,
  stockStatus,
}: ProductSizeSelectorProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getStockBadge = (status: string) => {
    const variants = {
      disponível: 'default' as const,
      indisponível: 'destructive' as const,
      'sob encomenda': 'secondary' as const,
    };

    return <Badge variant={variants[status as keyof typeof variants] || 'default'}>{status}</Badge>;
  };

  if (!availableSizes?.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tamanhos e Preços</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {availableSizes.map((size, index) => {
            const dimensions = sizeDimensions?.[size];
            const price = sizePrices?.[size];
            const status = stockStatus?.[size];

            return (
              <div key={size}>
                <div className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{size}</span>
                    {dimensions && (
                      <span className="text-muted-foreground text-sm">
                        {dimensions.largura} x {dimensions.comprimento} cm
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {status && getStockBadge(status)}
                    {price && <span className="text-lg font-bold">{formatPrice(price)}</span>}
                  </div>
                </div>
                {index < availableSizes.length - 1 && <Separator />}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export { ProductSizeSelector };
