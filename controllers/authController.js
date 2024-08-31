import { registerUser, loginUser, generateAccessToken, generateRefreshToken, verifyEmail, forgotPassword, resetPassword } from '../services/authService.js';

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await registerUser(email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginUser(email, password);
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const verify = async (req, res) => {
    try {
        const { token } = req.query;
        const user = await verifyEmail(token);
        res.status(200).json({ message: 'Email verified successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const forgot = async (req, res) => {
    try {
        const { email } = req.body;
        await forgotPassword(email);
        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const reset = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        await resetPassword(token, newPassword);
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { register, login, verify, forgot, reset };
