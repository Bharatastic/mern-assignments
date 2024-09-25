const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const authentication = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            error: "No token found"
        })
    }

    const decoded = jwt.verify(token, jwtPassword);
    req.user = decoded.userId;
    next();
}

module.exports = authentication;