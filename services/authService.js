import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

const registerUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    const { rows } = await pool.query(
        'INSERT INTO users (email, password_hash, verification_token) VALUES ($1, $2, $3) RETURNING *',
        [email, hashedPassword, verificationToken]
    );
    sendVerificationEmail(email, verificationToken);
    return rows[0];
};

const loginUser = async (email, password) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
        throw new Error('User not found');
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return user;
};

const verifyEmail = async (token) => {
    const { rows } = await pool.query('UPDATE users SET is_verified = true WHERE verification_token = $1 RETURNING *', [token]);
    if (rows.length === 0) {
        throw new Error('Invalid token');
    }
    return rows[0];
};

const forgotPassword = async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
        throw new Error('User not found');
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await pool.query(
        'UPDATE users SET reset_password_token = $1, reset_token_expiry = $2 WHERE email = $3',
        [resetToken, resetTokenExpiry, email]
    );
    sendResetPasswordEmail(email, resetToken);
};

const resetPassword = async (token, newPassword) => {
    const { rows } = await pool.query(
        'SELECT * FROM users WHERE reset_password_token = $1 AND reset_token_expiry > CURRENT_TIMESTAMP',
        [token]
    );
    if (rows.length === 0) {
        throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
        'UPDATE users SET password_hash = $1, reset_password_token = NULL, reset_token_expiry = NULL WHERE reset_password_token = $2',
        [hashedPassword, token]
    );
};

const transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS  // your email password
    }
});

const sendVerificationEmail = (email, token) => {
    const mailOptions = {
        from: `"Dhanur AI Team" <team@dhanurai.com>`, // specifying the alias
        to: email,
        subject: 'Email Verification - Dhanur AI',
        text: `Verify your email by clicking the following link: ${process.env.BASE_URL}/verify-email?token=${token}`,
        html: `
            <p>Dear User,</p>
            <p>Thank you for registering with us. Please click the link below to verify your email address:</p>
            <a href="${process.env.BASE_URL}/verify-email?token=${token}">Verify Email</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>Dhanur AI Team</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

const sendResetPasswordEmail = (email, token) => {
    const mailOptions = {
        from: `"Dhanur AI Team" <team@dhanurai.com>`, // specifying the alias
        to: email,
        subject: 'Reset Password - Dhanur AI',
        text: `Reset your password by clicking the following link: ${process.env.BASE_URL}/reset-password?token=${token}`,
        html: `
            <p>Dear User,</p>
            <p>We received a request to reset your password. Please click the link below to reset your password:</p>
            <a href="${process.env.BASE_URL}/reset-password?token=${token}">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>Best regards,<br>Dhanur AI Team</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

export { registerUser, loginUser, generateAccessToken, generateRefreshToken, verifyEmail, forgotPassword, resetPassword };
