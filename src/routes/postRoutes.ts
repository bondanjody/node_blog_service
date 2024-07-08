import { Router } from 'express';
import PostController from '../controllers/postController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);
router.post('/', authMiddleware, PostController.createPost);
router.put('/:id', authMiddleware, PostController.updatePost);
router.delete('/:id', authMiddleware, PostController.deletePost);

export default router;
