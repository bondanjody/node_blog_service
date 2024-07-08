import { Request, Response } from 'express';
import CategoryService from '../services/categoryService';

const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await CategoryService.createCategory(name);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const category = await CategoryService.updateCategory(Number(req.params.id), name);
        if (category) {
            res.json(category);
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const success = await CategoryService.deleteCategory(Number(req.params.id));
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send('Category not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

export default {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};