import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Return API status
 *     tags: [Status]
 *     description: Check if API is running.
 *     responses:
 *       200:
 *         description: The API is running.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API is running...
 */
router.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});
export default router;
