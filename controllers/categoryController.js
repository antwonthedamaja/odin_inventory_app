const Category = require("../models/category");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET
exports.category_index = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().exec();
    res.render("category_index", { categories: allCategories })
})

exports.category_create_get = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({}, "name").exec();
    res.render("category_create", { categories: categories })
})

exports.category_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    res.render("category", { category: category });
})

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id, "name").exec();
    res.render("category_delete", { category: category });
})

exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    res.render("category_update", { category: category });
})

// POST
exports.category_create_post = asyncHandler(async (req, res, next) => {
    
})

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    
})

exports.category_update_post = asyncHandler(async (req, res, next) => {
    
})