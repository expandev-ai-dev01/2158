import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { Skeleton } from '@/core/components/skeleton';
import { useNavigation } from '@/core/hooks/useNavigation';
import type { RelatedProductsProps } from './types';

function RelatedProducts({
  products,
  isLoading = false,
  minimumProducts = 1,
}: RelatedProductsProps) {
  const { navigate } = useNavigation();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Produtos Relacionados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!products?.length || products.length < minimumProducts) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos Relacionados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => navigate(`/produto/${product.id}`)}
              className="hover:border-primary group flex flex-col gap-3 rounded-lg border p-3 text-left transition-all hover:shadow-md"
            >
              <div className="bg-muted aspect-square overflow-hidden rounded-md">
                <img
                  src={product.mainImageUrl}
                  alt={product.modelName}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">{product.brand}</p>
                <h3 className="group-hover:text-primary line-clamp-2 text-sm font-semibold">
                  {product.modelName}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.firmnessLevel}
                  </Badge>
                </div>
                <p className="text-lg font-bold">{formatPrice(product.basePrice)}</p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { RelatedProducts };
