import express from 'express';
import { healthController } from '../../controllers';

const router = express.Router();

router.route('/').get(healthController.getHealth);

export default router;

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Systems Health
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     description: Systems status
 *     tags: [Health]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
