import {body} from "express-validator"

// register

const registerValidator = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({min: 3 , max: 20})
        .withMessage("Username must be between 3 and 20 characters"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
]


// login

const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
];


// Forgot Password
const forgotPasswordValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email")
];

export {
    registerValidator,
    loginValidator,
    forgotPasswordValidator
};