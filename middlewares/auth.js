const jwt = require("jsonwebtoken");


function generateAccessToken(username, role) {
    const payload = { username, role };
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

function protect(req, res, next) {
    // const { username, mdp } = req.headers;

    // if (!username || !mdp) {
    //     return res.status(400).json({ success: false, message: "Username and password needed" });
    // }

    // try {
    //     const user = await User.findOne({ username });
    //     if (!user) {
    //         return res.status(404).json({ success: false, message: "User not found" });
    //     }

    //     const isMatch = await compare(mdp, user.password);
    //     if (!isMatch) {
    //         return res.status(401).json({ success: false, message: "Wrong password" });
    //     }

        if (!req.headers.authorization) {
            return res.status(302).json({ success: false, message: "No authorization header" });
        }

        const token = req.headers.authorization.replace("Bearer", "").trim();

        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log(`Decoded token:`, decoded); 

            const { username, role } = decoded;
            req.user = { username, role };
            next();
        } catch (err) {
            res.status(401).json({ success: false, message: "Invalid token" });
        }
    // } catch (err) {
    //     res.status(500).json({ success: false, message: "Error while logging in" });
    // }
}

module.exports = { generateAccessToken, protect };
