const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    // check if the token is sent with the request
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    // verifying the token
    try {
        const verified = await jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).send(error);
    }
}