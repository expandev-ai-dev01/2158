/**
 * @api {get} /api/internal/product/:id Product Detail
 * @apiName GetProductDetail
 * @apiGroup Product
 *
 * @apiParam {String} id Product unique identifier
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Product unique identifier
 * @apiSuccess {String} data.modelName Product model name
 * @apiSuccess {String} data.brand Product brand
 * @apiSuccess {String} data.detailedDescription Complete product description
 * @apiSuccess {String[]} data.imageUrls Array of product image URLs
 * @apiSuccess {Number} data.mainImageIndex Index of main image in gallery
 * @apiSuccess {Boolean} data.zoomEnabled Zoom functionality status
 * @apiSuccess {Object} data.navigationControls Gallery navigation settings
 * @apiSuccess {Object} data.navigationControls.arrows Arrow controls configuration
 * @apiSuccess {Boolean} data.navigationControls.arrows.enabled Arrow controls enabled
 * @apiSuccess {String} data.navigationControls.arrows.style Arrow style
 * @apiSuccess {Object} data.navigationControls.dots Dot indicators configuration
 * @apiSuccess {Boolean} data.navigationControls.dots.enabled Dot indicators enabled
 * @apiSuccess {String} data.navigationControls.dots.position Dot position
 * @apiSuccess {Boolean} data.navigationControls.swipeEnabled Swipe gestures enabled
 * @apiSuccess {Boolean} data.navigationControls.keyboardEnabled Keyboard navigation enabled
 * @apiSuccess {Number} data.foamDensity Foam density in kg/m³
 * @apiSuccess {String} data.springConfiguration Spring system type
 * @apiSuccess {String} data.fabricMaterial Fabric material
 * @apiSuccess {Number} data.totalHeight Total height in centimeters
 * @apiSuccess {Number} data.weightSupport Maximum weight support in kg
 * @apiSuccess {String} data.firmnessLevel Firmness level (macio | médio | firme)
 * @apiSuccess {String[]} data.availableSizes Available sizes array
 * @apiSuccess {Object} data.sizeDimensions Dimensions for each size
 * @apiSuccess {Object} data.sizePrices Prices for each size
 * @apiSuccess {Object} data.stockStatus Stock status for each size
 * @apiSuccess {Number} data.warrantyPeriod Warranty period in months
 * @apiSuccess {String} data.warrantyConditions Warranty terms and conditions
 * @apiSuccess {Object[]} data.certifications Product certifications
 * @apiSuccess {String} data.certifications.name Certification name
 * @apiSuccess {String} data.certifications.logoUrl Certification logo URL
 * @apiSuccess {String} data.certifications.description Certification description
 * @apiSuccess {String} data.certificationDisplayMode Display mode for certifications
 * @apiSuccess {Boolean} data.comparisonEnabled Comparison feature enabled
 * @apiSuccess {Boolean} data.socialSharingEnabled Social sharing enabled
 * @apiSuccess {String} data.deliveryInfo Delivery information
 * @apiSuccess {Boolean} data.backToCatalogEnabled Back navigation enabled
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (PRODUCT_NOT_FOUND | PRODUCT_INACTIVE | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { productGetDetail } from '@/services/product';
import { errorResponse, successResponse } from '@/utils/response';
import { isServiceError } from '@/utils/serviceError';

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate product ID parameter
     * @throws {ValidationError}
     */
    const validationResult = paramsSchema.safeParse(req.params);

    if (!validationResult.success) {
      res
        .status(400)
        .json(
          errorResponse(
            'Invalid product ID format',
            'VALIDATION_ERROR',
            validationResult.error.errors
          )
        );
      return;
    }

    const { id } = validationResult.data;

    /**
     * @rule {be-business-rule-001} Retrieve complete product details
     */
    const result = await productGetDetail(id);

    if (!result.success) {
      res
        .status(result.statusCode)
        .json(errorResponse(result.error!.message, result.error!.code, result.error!.details));
      return;
    }

    res.json(successResponse(result.data));
  } catch (error: unknown) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
    } else {
      next(error);
    }
  }
}
