const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async (req, res, next) => {
    // Get token from header
    // Header can be the auth you want to use Bearer etc...
    const token = req.header('x-auth-token');

    // Check if token exist
    if (!token) {
        // 401 not authorized
        return await res
            .status(401)
            .json({ errors: [{ msg: 'No token, authorization denied' }] });
    }

    // Verify token
    try {
        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode.user;
        next();
    } catch (error) {
        // console.error(error.message);
        await res.status(401).json({
            errors: [{ msg: 'Token not valid' }]
        });
    }
};
