const jwt = require("jsonwebtoken");

const authanticateToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401); // The user is unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Not a valid token
        }

        req.user = user;
        next(); // Continue to the next middleware
    });
};

module.exports = authanticateToken;

// {
//     header :
//     Authorization : "Bearer token"
// }