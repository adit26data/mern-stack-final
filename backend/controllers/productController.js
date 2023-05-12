const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")


//create product --admin
exports.createProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});


//Get all product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
});


//update product admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        if (!product) {
            return next(new ErrorHander("Product now found", 404))
        }
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
});


//delete product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        if (!product) {
            return next(new ErrorHander("Product now found", 404))
        }
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "deleted product successfully"
    })
});


//GET PRODUCT DETAILS
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product now found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
});