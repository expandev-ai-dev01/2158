/**
 * @api {get} /api/internal/product/:id/related Related Products
 * @apiName GetRelatedProducts
 * @apiGroup Product
 *
 * @apiParam {String} id Product unique identifier
 * @apiParam {Number} [limit=4] Maximum number of related products to return
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data Array of related products
 * @apiSuccess {String} data.id Product unique identifier
 * @apiSuccess {String} data.modelName Product model name
 * @apiSuccess {String} data.brand Product brand
 * @apiSuccess {String} data.mainImageUrl Main product image URL
 * @apiSuccess {Number} data.basePrice Base price for smallest size
 * @apiSuccess {String} data.firmnessLevel Firmness level
 * @apiSuccess {String} data.category Product category
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (PRODUCT_NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { productGetRelated } from '@/services/product';
import { errorResponse, successResponse } from '@/utils/response';
import { isServiceError } from '@/utils/serviceError';

const paramsSchema = z.object({
  id: z.string().uuid(),
});

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(20).optional().default(4),
});

export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate product ID and query parameters
     * @throws {ValidationError}
     */
    const paramsValidation = paramsSchema.safeParse(req.params);
    const queryValidation = querySchema.safeParse(req.query);

    if (!paramsValidation.success) {
      res
        .status(400)
        .json(
          errorResponse(
            'Invalid product ID format',
            'VALIDATION_ERROR',
            paramsValidation.error.errors
          )
        );
      return;
    }

    if (!queryValidation.success) {
      res
        .status(400)
        .json(
          errorResponse(
            'Invalid query parameters',
            'VALIDATION_ERROR',
            queryValidation.error.errors
          )
        );
      return;
    }

    const { id } = paramsValidation.data;
    const { limit } = queryValidation.data;

    /**
     * @rule {be-business-rule-020} Retrieve related products based on criteria
     */
    const result = await productGetRelated(id, limit);

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
