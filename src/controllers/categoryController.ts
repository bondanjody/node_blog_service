import { Request, Response } from 'express';
import CategoryService from '../services/categoryService';

export class CategoryController {
    async getAllCategories(req: Request, res: Response) {
        const categories = await CategoryService.getAllCategories();
        res.json(categories);
    }

    async createCategory(req: Request, res: Response) {
        const { name } = req.body;
        const category = await CategoryService.createCategory(name);
        res.status(201).json(category);
    }

    async updateCategory(req: Request, res: Response) {
        const { name } = req.body;
        const category = await CategoryService.updateCategory(Number(req.params.id), name);
        if (category) {
            res.json(category);
        } else {
            res.status(404).send('Category not found');
        }
    }

    async deleteCategory(req: Request, res: Response) {
        const success = await CategoryService.deleteCategory(Number(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('Category not found');
        }
    }
}

export default new CategoryController();
