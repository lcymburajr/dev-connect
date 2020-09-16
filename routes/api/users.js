const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Models
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    '/',
    [
        // Express Validation Array
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check(
            'password',
            'Please entere a password with 6 or more character'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        // Pass requst to express validation and get error array
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Put the error arry into a json errors reponse
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        try {
            // Look if user already exists in User model
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    errors: [{ msg: 'User already exist' }]
                });
            }

            // s = size of image
            // r = rating, g, pg, r, x
            // d = default image
            avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'monsterid'
            });

            // Create instance of user does not get saved into the data base
            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            // Save user to database
            await user.save();

            // Return jsonwebtoken
            // Mongoose changes the mondo DB _id to id
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (error, token) => {
                    if (error) throw error;

                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
