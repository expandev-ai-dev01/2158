/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as productDetailController from '@/api/internal/product/detail/controller';
import * as productRelatedController from '@/api/internal/product/related/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Product detail routes - /api/internal/product/:id
 */
router.get('/product/:id', productDetailController.getHandler);

/**
 * @rule {be-route-configuration}
 * Related products routes - /api/internal/product/:id/related
 */
router.get('/product/:id/related', productRelatedController.getHandler);

export default router;
