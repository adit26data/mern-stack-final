const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto")

//registration for a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password, avatar: {
            public_id: "this is a sample id",
            url: "profilepicUrl"
        }
    });

    sendToken(user, 201, res);
});


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    ///checking if user has given both email and password
    if (!email || !password) {
        return next(new ErrorHander("please enter email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("invalid email or password", 401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHander("invalid email or password", 401));
    }
    sendToken(user, 200, res);
});


//logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json(
        {
            success: true,
            message: "logged out"
        })
})


//forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHander("invalid email or password", 404));
    }
    //get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protcol}://${req.get("host")}/password/reset/${resetToken}`
    const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then,please ignore it`;


    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password Recovery`,
            message

        });
        res.status(200).json({
            success: true,
            message: `email sent to ${user.email} successfully`
        })

    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHander(error.message, 500))
    }
})