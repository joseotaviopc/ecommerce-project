import express from 'express';
import {
  createCart,
  editCart,
  removeItemFromCart,
} from '../controllers/cart-controller';

const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Create a cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Create a cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   category:
 *                     type: string
 *                   stock:
 *                     type: number
 *                   imageUrl:
 *                     type: string
 */
router.post('/', createCart);

/**
 * @swagger
 * /api/cart/{id}:
 *   patch:
 *     summary: Edit a cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user id
 *     responses:
 *       200:
 *         description: A cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *                 stock:
 *                   type: number
 *                 imageUrl:
 *                   type: string
 */
router.patch('/:id', editCart);

/**
 * @swagger
 * /api/cart/{id}:
 *  delete:
 *    summary: Remove an item from the cart
 *    tags: [Cart]
 *    parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The user id
 *    responses:
 *        200:
 *          description: The cart with the item removed
 */
router.delete('/:id', removeItemFromCart);
export default router;
