const Category = require("../models/category");
const Item = require("../models/item");

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
    const items = await Item.find({ category: req.params.id }).exec();
    res.render("category", { category: category, items: items });
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
exports.category_create_post = [
    body('name').trim().notEmpty().escape(),
    body('description').trim().notEmpty().escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const category = new Category({
                name: req.body.name,
                description: req.body.description,
            })
            await category.save();
            res.redirect(category.url);
        }
    })
]

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    await Category.findByIdAndDelete(req.params.id).exec();
    res.redirect("/categories")
})

exports.category_update_post = [
    body('name').trim().notEmpty().escape(),
    body('description').trim().notEmpty().escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const category = await Category.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                description: req.body.description
            }).exec();
            res.redirect(category.url);
        }
    })
]