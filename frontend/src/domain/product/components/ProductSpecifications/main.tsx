import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Separator } from '@/core/components/separator';
import type { ProductSpecificationsProps } from './types';

function ProductSpecifications({
  foamDensity,
  springConfiguration,
  fabricMaterial,
  totalHeight,
  weightSupport,
  firmnessLevel,
}: ProductSpecificationsProps) {
  const specifications = [
    { label: 'Densidade da Espuma', value: `${foamDensity} kg/m³` },
    { label: 'Sistema de Molas', value: springConfiguration },
    { label: 'Material do Tecido', value: fabricMaterial },
    { label: 'Altura Total', value: `${totalHeight} cm` },
    { label: 'Peso Suportado', value: `${weightSupport} kg` },
    { label: 'Nível de Firmeza', value: firmnessLevel },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Especificações Técnicas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {specifications.map((spec, index) => (
            <div key={index}>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground text-sm font-medium">{spec.label}</span>
                <span className="text-sm font-semibold">{spec.value}</span>
              </div>
              {index < specifications.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { ProductSpecifications };
