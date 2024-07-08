import { Router } from 'express';
import CategoryController from '../controllers/categoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', authMiddleware, CategoryController.createCategory);
router.put('/:id', authMiddleware, CategoryController.updateCategory);
router.delete('/:id', authMiddleware, CategoryController.deleteCategory);

export default router;
