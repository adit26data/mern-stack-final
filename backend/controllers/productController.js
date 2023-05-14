const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


//create product --admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {


    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});


//Get all product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products
    })
});

//get all product admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
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
        product,
        productCount
    })
});