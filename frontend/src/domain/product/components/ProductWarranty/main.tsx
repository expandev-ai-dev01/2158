import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Separator } from '@/core/components/separator';
import { ShieldCheck } from 'lucide-react';
import type { ProductWarrantyProps } from './types';

function ProductWarranty({
  warrantyPeriod,
  warrantyConditions,
  certifications,
  certificationDisplayMode,
}: ProductWarrantyProps) {
  const shouldShowCertifications =
    certificationDisplayMode !== 'oculto' && certifications?.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="size-5" />
          Garantia e Certificações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Warranty Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Período de Garantia:</span>
            <span className="text-primary text-lg font-bold">{warrantyPeriod} meses</span>
          </div>
          <Separator />
          <div className="space-y-2">
            <span className="text-sm font-semibold">Condições:</span>
            <p className="text-muted-foreground text-sm leading-relaxed">{warrantyConditions}</p>
          </div>
        </div>

        {/* Certifications */}
        {shouldShowCertifications && (
          <>
            <Separator />
            <div className="space-y-4">
              <span className="text-sm font-semibold">Certificações de Qualidade:</span>
              <div className="grid gap-4 sm:grid-cols-2">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="hover:bg-accent flex items-start gap-3 rounded-lg border p-3 transition-colors"
                  >
                    {(certificationDisplayMode === 'logos_com_texto' ||
                      certificationDisplayMode === 'apenas_logos') && (
                      <img
                        src={cert.logoUrl}
                        alt={cert.name}
                        className="h-12 w-12 object-contain"
                      />
                    )}
                    {(certificationDisplayMode === 'logos_com_texto' ||
                      certificationDisplayMode === 'apenas_texto') && (
                      <div className="flex flex-1 flex-col gap-1">
                        <span className="text-sm font-semibold">{cert.name}</span>
                        <span className="text-muted-foreground text-xs">{cert.description}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export { ProductWarranty };
