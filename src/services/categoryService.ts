import pool from '../config/database';

export class CategoryService {
    async getAllCategories() {
        const [rows]: any = await pool.execute('SELECT * FROM categories');
        return rows;
    }

    async createCategory(name: string) {
        const [result] = await pool.execute(
            'INSERT INTO categories (name) VALUES (?)',
            [name]
        );
        return result;
    }

    async updateCategory(id: number, name: string) {
        const [result] = await pool.execute(
            'UPDATE categories SET name = ? WHERE id = ?',
            [name, id]
        );
        return result;
    }

    async deleteCategory(id: number) {
        const [result] = await pool.execute(
            'DELETE FROM categories WHERE id = ?',
            [id]
        );
        return result;
    }
}

export default new CategoryService();
