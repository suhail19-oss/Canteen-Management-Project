const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Render Signup Page
router.get('/signup', (req, res) => {
    res.render('signup'); // Render the signup form
});

// Signup Route
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    User.register(new User({ username }), password, (err) => {
        if (err) {
            console.error(err);
            return res.redirect('/auth/signup'); // Redirect to signup if there's an error
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/canteens'); // Redirect to canteens after signup
        });
    });
});

// Render Login Page
router.get('/login', (req, res) => {
    res.render('login'); // Render the login form
});

// Login Route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/canteens', // Redirect to canteens after login
    failureRedirect: '/auth/login' // Redirect back to login if failed
}));

// Logout Route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.redirect('/canteens');
        }
        res.redirect('/auth/login'); // Redirect to login page after logout
    });
});

module.exports = router;