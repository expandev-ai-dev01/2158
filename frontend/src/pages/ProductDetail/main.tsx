import { useParams } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/core/components/button';
import { Skeleton } from '@/core/components/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { useNavigation } from '@/core/hooks/useNavigation';
import { useProductDetail, useRelatedProducts } from '@/domain/product/hooks';
import {
  ProductImageGallery,
  ProductSpecifications,
  ProductSizeSelector,
  ProductWarranty,
  RelatedProducts,
} from '@/domain/product/components';
import { toast } from 'sonner';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { goBack } = useNavigation();

  const { data: product, isLoading, error } = useProductDetail({ productId: id || '' });
  const { data: relatedProducts, isLoading: isLoadingRelated } = useRelatedProducts({
    productId: id || '',
    limit: 4,
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.modelName,
          text: product?.detailedDescription,
          url: window.location.href,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('Erro ao compartilhar');
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência');
    }
  };

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Erro ao carregar produto</AlertTitle>
          <AlertDescription>
            Não foi possível carregar as informações do produto. Por favor, tente novamente.
          </AlertDescription>
        </Alert>
        <Button onClick={goBack} variant="outline" className="mt-4">
          <ArrowLeft />
          Voltar
        </Button>
      </div>
    );
  }

  if (isLoading || !product) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-8">
          <Skeleton className="h-10 w-32" />
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="space-y-8">
        {/* Header with Back Button */}
        {product.backToCatalogEnabled && (
          <Button onClick={goBack} variant="ghost" className="gap-2">
            <ArrowLeft className="size-4" />
            Voltar ao catálogo
          </Button>
        )}

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Image Gallery */}
          <div>
            <ProductImageGallery
              images={product.imageUrls}
              mainImageIndex={product.mainImageIndex}
              zoomEnabled={product.zoomEnabled}
              navigationControls={product.navigationControls}
              productName={product.modelName}
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">{product.brand}</p>
              <h1 className="text-3xl font-bold tracking-tight">{product.modelName}</h1>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Descrição</h2>
              <p className="text-muted-foreground leading-relaxed">{product.detailedDescription}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {product.socialSharingEnabled && (
                <Button onClick={handleShare} variant="outline" className="gap-2">
                  <Share2 className="size-4" />
                  Compartilhar
                </Button>
              )}
            </div>

            {/* Delivery Info */}
            {product.deliveryInfo && (
              <Alert>
                <AlertTitle>Informações de Entrega</AlertTitle>
                <AlertDescription>{product.deliveryInfo}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Specifications Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ProductSpecifications
            foamDensity={product.foamDensity}
            springConfiguration={product.springConfiguration}
            fabricMaterial={product.fabricMaterial}
            totalHeight={product.totalHeight}
            weightSupport={product.weightSupport}
            firmnessLevel={product.firmnessLevel}
          />

          <ProductSizeSelector
            availableSizes={product.availableSizes}
            sizeDimensions={product.sizeDimensions}
            sizePrices={product.sizePrices}
            stockStatus={product.stockStatus}
          />
        </div>

        {/* Warranty Section */}
        <ProductWarranty
          warrantyPeriod={product.warrantyPeriod}
          warrantyConditions={product.warrantyConditions}
          certifications={product.certifications}
          certificationDisplayMode={product.certificationDisplayMode}
        />

        {/* Related Products */}
        <RelatedProducts
          products={relatedProducts || []}
          isLoading={isLoadingRelated}
          minimumProducts={1}
        />
      </div>
    </div>
  );
}

export { ProductDetailPage };
