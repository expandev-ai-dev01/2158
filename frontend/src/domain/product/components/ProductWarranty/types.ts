import type { Certification } from '../../types/models';

export interface ProductWarrantyProps {
  warrantyPeriod: number;
  warrantyConditions: string;
  certifications: Certification[];
  certificationDisplayMode: 'logos_com_texto' | 'apenas_logos' | 'apenas_texto' | 'oculto';
}
