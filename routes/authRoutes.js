import express from 'express';
import passport from 'passport';
import { register, login, verify, forgot, reset } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify-email', verify);
router.post('/forgot-password', forgot);
router.post('/reset-password', reset);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile'); // Redirect to your desired route
    }
);

export default router;
