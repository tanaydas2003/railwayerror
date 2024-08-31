import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from './db.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
    scope: ['profile', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        const { id, emails, displayName } = profile;
        const email = emails[0].value;

        try {
            const { rows } = await pool.query('SELECT * FROM users WHERE google_id = $1', [id]);

            if (rows.length > 0) {
                return done(null, rows[0]);
            } else {
                const { rows: existingUser } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

                if (existingUser.length > 0) {
                    await pool.query('UPDATE users SET google_id = $1 WHERE email = $2', [id, email]);
                    return done(null, existingUser[0]);
                } else {
                    const { rows: newUser } = await pool.query(
                        'INSERT INTO users (email, first_name, last_name, google_id, is_verified) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                        [email, displayName.split(' ')[0], displayName.split(' ')[1], id, true]
                    );
                    return done(null, newUser[0]);
                }
            }
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        done(null, rows[0]);
    } catch (err) {
        done(err);
    }
});
