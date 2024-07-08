import pool from '../config/database';

export class PostService {
    async getAllPosts() {
        const [rows]: any = await pool.execute('SELECT * FROM posts');
        return rows;
    }

    async getPostById(id: number) {
        const [rows]: any = await pool.execute(
            'SELECT * FROM posts WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    async createPost(title: string, content: string, userId: number, categoryId: number) {
        const [result] = await pool.execute(
            'INSERT INTO posts (title, content, userId, categoryId) VALUES (?, ?, ?, ?)',
            [title, content, userId, categoryId]
        );
        return result;
    }

    async updatePost(id: number, title: string, content: string, userId: number, categoryId: number) {
        const [result] = await pool.execute(
            'UPDATE posts SET title = ?, content = ?, userId = ?, categoryId = ? WHERE id = ?',
            [title, content, userId, categoryId, id]
        );
        return result;
    }

    async deletePost(id: number) {
        const [result] = await pool.execute(
            'DELETE FROM posts WHERE id = ?',
            [id]
        );
        return result;
    }
}

export default new PostService();
