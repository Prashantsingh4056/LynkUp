import User from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyMail from "../service/verifyEmail.service.js";
import Session from "../Models/Session.model.js";
import sendOtpViaMail from "../service/sendOtpViaMail.service.js";
import ProfileModel from "../Models/Profile.model.js";

// register User
const registerUser = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;

        // 1. Validate input
        if (!username || !email || !password || !fullname) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const normalizedUsername = username.toLowerCase();
        const normalizedEmail = email.trim().toLowerCase();


        // 2. Check if user already exists
        const existingUser = await User.findOne(
            
            {
                $or : [
                    {username: normalizedUsername},
                    {email: normalizedEmail}
                ]
            } 
        );

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email or username already exists."
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const newUser = await User.create({
            username,
            fullname,
            email,
            password: hashedPassword,
        });

        // 5. Generate Email Verification Token
        const verificationToken = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "10m",
            }
        );

        // 6. Save token in database
        newUser.token = verificationToken;
        await newUser.save();

        // 7. Send verification email
        await verifyMail(
            newUser.email,
            newUser.fullname,
            verificationToken
        );

        // 8. Remove sensitive fields before sending response
        const userResponse = newUser.toObject();
        delete userResponse.password;
        delete userResponse.token;

        await ProfileModel.create({
                userId: newUser._id,
                username: newUser.username,
                fullname: newUser.fullname,
                bio: "",
                links: [],
                appearance: {
                    theme: "minimal",
                },
            });

        return res.status(201).json({
            success: true,
            message:
                "Registration successful. Please verify your email before logging in.",
            user: userResponse,
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// const emailVerification = async (req , res) => {

//     try {

//         const authHeader = req.headers.authorization;

//         if(!authHeader || !authHeader.startsWith("Bearer ")){
//             return res.status(401).json({
//                 success: false,
//                 message: "Authorization token is missing or invalid"
//             })
//         }

//         const token = authHeader.split(" ")[1];

//         let decoded;
//         try {

//             decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
            
//         } catch (err) {
//             if(err.name === "TokenExpiredError"){
//                 return res.status(400).json({
//                     success: false,
//                     message: "The registration token has expired"
//                 })
//             }

//             return res.status(400).json({
//                 success: false,
//                 message: "Token verification failed"
//             })
//         }

//         const user = await User.findById(decoded.id);

//         if(!user){
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             })
//         }

//         user.token = null;
//         user.isVerified = true;
//         await user.save();

//         return res.status(200).json({
//             success: true,
//             message: "Email verified Successfully"
//         })
        
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

const emailVerification = async (req , res) => {

    console.log("here ??");
    

    try {

        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
            success: false,
            message: "Verification token is required."
            });
        }

        let decoded;
        try {

            decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
            
        } catch (err) {
            if(err.name === "TokenExpiredError"){
                return res.status(400).json({
                    success: false,
                    message: "The registration token has expired"
                })
            }

            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            })
        }

        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified."
            });
        }

        if (user.token !== token) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification link."
            });
        }

        user.token = null;
        user.isVerified = true;
        await user.save({
            validateBeforeSave: false
        });

        return res.status(200).json({
            success: true,
            message: "Email verified Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const loginUser = async (req , res) => {

    try {

        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        const user = await User.findOne({
            email
        })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        const isCorrectPassword = await bcrypt.compare(password , user.password);

        if(!isCorrectPassword){
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password"
            })
        }

        // check is user is verified
        if(user.isVerified === false){
            return res.status(403).json({
                success: false,
                message: "Please verify your email before logging in."
            })
        }

        // check for existing session and delete it
        const existingSession = await Session.findOne({userId: user._id});

        if(existingSession){
            await Session.deleteOne({userId: user._id});
        }

        // create a new session
        await Session.create({userId: user._id});

        // Generate Tokens
        const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "10d"});
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "30d"});
        

        user.isLoggedIn = true;
        await user.save({
            validateBeforeSave: false
        });

        return res.status(200).json({
            success: true,
            message: `Welcome back ${user.fullname}`,
            accessToken,
            refreshToken,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const logoutUser = async(req , res) => {

    try {

        const userId = req.user._id;

        await Session.deleteMany({userId});

        await User.findByIdAndUpdate(userId,{isLoggedIn: false});

        return res.status(200).json({
            success: true,
            message: "User Logged Out Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const forgotPassword = async (req , res) => {

    try {

        const {email} = req.body;
        
        const user = await User.findOne({email})

        if(!user){

            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpExpiry = new Date(Date.now()+10*60*1000);

        
        
        
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        
        await user.save();
        
        await sendOtpViaMail(user.fullname , email , otp);
        
        return res.status(200).json({
            success: true,
            message: "Otp sent successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
} 


const verifyOtp = async(req , res) => {

    const {otp} = req.body;

    const email = req.params.email;

    if(!otp){
        return res.status(400).json({
            success: false,
            message: "Otp is required"
        })
    }

    try {

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({
                success: false,
                message: "OTP not generated or already verified"
            })
        }

        if(user.otpExpiry < new Date()){
            return res.status(400).json({
                success: false,
                message: "OTP expired. Please request a new One"
            })
        }
        

        if(otp !== user.otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const changePassword = async(req , res) => {

    const {newPassword , confirmPassword} = req.body;

    const email = req.params.email;

    if(!newPassword || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Password do not match"
        })
    }

    try {

        const user = await User.findOne({email});

        if(!user){

            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword , 10);
        user.password = hashedPassword;

        await user.save();
        
        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getCurrentUser = async (req, res) => {
    
    try {

        return res.status(200).json({
            success: true,
            user: req.user
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


export { registerUser , emailVerification , loginUser , logoutUser , forgotPassword, verifyOtp, changePassword, getCurrentUser};
