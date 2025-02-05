import express from 'express';
import { createUser, getUsers } from '../controllers/user-controller';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/', createUser);

router.get('/', getUsers);

export default router;
