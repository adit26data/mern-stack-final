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

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`
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

//reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })
    if (!user) {
        return next(new ErrorHander("reset password token is invalid or has expired!", 400));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHander("passwords do not match", 400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);

})


//get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})


//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHander("old password is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("password not matched!", 400));
    }
    user.password = req.body.newPassword;
    await user.save()

    sendToken(user, 200, res);
})

//update user profile

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {


    const newUserData = {
        name: req.body.name,
        email: req.body.email,

    }
    //we will add cloudinary later
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true
    })
})

//get all user exports --admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

//get single user details --admin
exports.getSingleUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHander(`user does not exist for this ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })
})


//update user role --admin
exports.updateRole = catchAsyncErrors(async (req, res, next) => {


    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,

    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true
    })
})


//delete user --admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    //remove cloudinary
    const user = await User.findByIdAndUpdate(req.params.id);

    if (!user) {
        return next(new ErrorHander(`User does not exist with ${req.params.id}`))
    }

    await user.deleteOne()
    res.status(200).json({
        success: true,
        message: "user deleted successfully"
    })
})



