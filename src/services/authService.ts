import pool from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// const register = async (username: string, password: string, email: string) => {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const [result] = await pool.execute(
//         'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
//         [username, hashedPassword, email]
//     );
//     return result;
// };
const register = async (username: string, password: string, email: string) => {
    // Pengecekan apakah username atau email sudah terdaftar
    const [rows] = await pool.execute(
        'SELECT username, email FROM users WHERE username = ? OR email = ?',
        [username, email]
    );

    // Memastikan rows memiliki length atau menentukan cara lain untuk memeriksa hasil
    if (Array.isArray(rows) && rows.length > 0) {
        // Jika username atau email sudah terdaftar, kembalikan error
        const errorMessages = [];
        if (rows.some((user: any) => user.username === username)) {
            errorMessages.push('Username is already taken');
        }
        if (rows.some((user: any) => user.email === email)) {
            errorMessages.push('Email is already registered');
        }
        throw new Error(errorMessages.join(' and '));
    }

    // Hash password dan simpan data pengguna baru
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
        'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
        [username, hashedPassword, email]
    );

    return result;
};

const login = async (username: string, password: string) => {
    const [rows]: any = await pool.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
    const user = rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return { token, user };
    }
    return null;
};

export default {
    register,
    login
}