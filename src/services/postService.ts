import pool from '../config/database';

const getAllPosts = async () => {
    const [rows]: any = await pool.execute('SELECT * FROM posts');
    return rows;
};

const getAllPostsByUser = async (userId: number) => {
    const [rows]: any = await pool.execute('SELECT * FROM posts LEFT JOIN users ON users.id = posts.userId WHERE userId = ?;', [userId]);
    return rows;
};

const getPostById = async (id: number) => {
    const [rows]: any = await pool.execute(
        'SELECT * FROM posts WHERE id = ?',
        [id]
    );
    return rows[0];
};

const createPost = async (title: string, content: string, userId: number, categoryId: number) => {
    const [result]: any = await pool.execute(
        'INSERT INTO posts (title, content, userId, categoryId) VALUES (?, ?, ?, ?)',
        [title, content, userId, categoryId]
    );
    return result;
};

const updatePost = async (id: number, title: string, content: string, userId: number, categoryId: number) => {
    const [result]: any = await pool.execute(
        'UPDATE posts SET title = ?, content = ?, userId = ?, categoryId = ? WHERE id = ?',
        [title, content, userId, categoryId, id]
    );
    return result;
};

const deletePost = async (id: number) => {
    const [result]: any = await pool.execute(
        'DELETE FROM posts WHERE id = ?',
        [id]
    );
    return result;
};

export default {
    getAllPosts,
    getAllPostsByUser,
    getPostById,
    createPost,
    updatePost,
    deletePost
};