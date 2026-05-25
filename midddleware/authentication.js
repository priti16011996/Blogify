const { verifyToken } = require("../services/authentication");
function validateCookie(cookieName){
    return (req, res, next)=>{ 
        const token = req.cookies[cookieName];  
        if (!token) 
        {
            return next();
        }  
        try{
            const payload = verifyToken(token); 
            if (!payload) 
            {
                return next();
            }
            req.user = payload; 
        } catch (err) {
            console.error("Token verification error:", err);
           // return res.status(401).json({ message: "Unauthorized: Token verification failed" });
        }       
        return next();
    }
}

module.exports = {
    validateCookie
}