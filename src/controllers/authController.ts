import { Request, Response } from 'express';
import AuthService from '../services/authService';
import logger from '../config/logger';
import { InputRegister } from '../models/authModel';

const register = async (req: Request, res: Response) => {
    try {
        const { username, password, email }: InputRegister = req.body;

        // Validasi input
        if (!username || typeof username !== 'string') {
            return res.status(400).json({ message: 'Username is required and must be a string' });
        }
        if (!password || typeof password !== 'string') {
            return res.status(400).json({ message: 'Password is required and must be a string' });
        }
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: 'Email is required and must be a string' });
        }

        const user = await AuthService.register(username, password, email);
        res.status(201).json(user);
    } catch (error) {
        logger.error('Error registering user:', error);
        res.status(500).json({ message: `${error}` });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const result = await AuthService.login(username, password);
        if (result) {
            res.json(result);
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        logger.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
};

export default {
    register,
    login
};

