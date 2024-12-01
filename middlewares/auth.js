const jwt = require("jsonwebtoken");


function generateAccessToken(username, role) {
    const payload = { username, role };
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}


// function verifyToken(req, res, next) {

//     if (!req.headers.authorization) {
//         return res.status(302).json({ success: false, message: "No authorization header" });
//     }

//     const token = req.headers.authorization.replace("Bearer", "").trim();

//     try {
//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
//         console.log(`Decoded token:`, decoded); 

//         const { username, role } = decoded;
//         req.user = { id, username, role };
//         next();
//     } catch (err) {
//         res.status(401).json({ success: false, message: "Invalid token" });
//     }
// }
async function  verifyToken(req, res, next){
    if (!req.headers.authorization) {
        return res.status(302).json({ success: false, message: "No authorization header" });
    }

    const token = req.headers.authorization.replace("Bearer", "").trim();

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findById(decoded.id);
         req.user = user;
         next();
    } catch (err) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
}

module.exports = {verifyToken, generateAccessToken};
