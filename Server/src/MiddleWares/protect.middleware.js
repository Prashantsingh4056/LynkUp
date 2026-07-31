import jwt from  "jsonwebtoken"
import User from "../Models/User.model.js"

const protect = async (req , res , next) => {

    try {

        const authHeader = req.headers.authorization;

        // check authorization header
        if(!authHeader || !authHeader.startsWith("Bearer ")){

            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login."
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // verify JWT
        let decoded;

        try {

            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
        } catch (err) {
            
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Session expired. Please login again."
                });
            }

            return res.status(401).json({
                success: false,
                message: "Invalid authentication token."
            });

        }

        // Find user
        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        //! Optional: prevent unverified users
        // if (!user.isVerified) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Please verify your email first."
        //     });
        // }


        // Make user available to controllers
        req.user = user;
        
        next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export default protect;