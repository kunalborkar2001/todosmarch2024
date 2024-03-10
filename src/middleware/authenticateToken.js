const jwt = require("jsonwebtoken")

const authanticateToken = (req, res, next) => {
    
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(' ')[1]
    
    // {
    //     header : 
    //     Authorization : "Bearer token"
    // }

    if(token == null) res.sendStatus(401) //The user is unauthorized
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403) //not a valid token

        console.log("Verified User id: ", user);
        console.log("User: ", user)
        req.user = user

})

next()
}

module.exports = authanticateToken