import { Request, Response } from 'express';
import AuthService from '../services/authService';
import logger from '../config/logger';

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { username, password, email } = req.body;
            const user = await AuthService.register(username, password, email);
            res.status(201).json(user);
        } catch (error) {
            logger.error('Error registering user:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async login(req: Request, res: Response) {
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
    }
}

export default new AuthController();
