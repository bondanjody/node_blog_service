import { Request, Response } from 'express';
import PostService from '../services/postService';

export class PostController {
    async getAllPosts(req: Request, res: Response) {
        const posts = await PostService.getAllPosts();
        res.json(posts);
    }

    async getPostById(req: Request, res: Response) {
        const post = await PostService.getPostById(Number(req.params.id));
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Post not found');
        }
    }

    async createPost(req: Request, res: Response) {
        const { title, content, userId, categoryId } = req.body;
        const post = await PostService.createPost(title, content, userId, categoryId);
        res.status(201).json(post);
    }

    async updatePost(req: Request, res: Response) {
        const { title, content, userId, categoryId } = req.body;
        const post = await PostService.updatePost(Number(req.params.id), title, content, userId, categoryId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Post not found');
        }
    }

    async deletePost(req: Request, res: Response) {
        const success = await PostService.deletePost(Number(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('Post not found');
        }
    }
}

export default new PostController();
