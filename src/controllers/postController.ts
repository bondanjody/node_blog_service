import { Request, Response } from 'express';
import PostService from '../services/postService';

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await PostService.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await PostService.getPostById(Number(req.params.id));
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, userId, categoryId } = req.body;
        const post = await PostService.createPost(title, content, userId, categoryId);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const updatePost = async (req: Request, res: Response) => {
    try {
        const { title, content, userId, categoryId } = req.body;
        const post = await PostService.updatePost(Number(req.params.id), title, content, userId, categoryId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const deletePost = async (req: Request, res: Response) => {
    try {
        const success = await PostService.deletePost(Number(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

export default {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};