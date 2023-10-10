const Item = require("../models/item");
const Category = require("../models/category");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose')

// GET
exports.item_index = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find().exec();
    res.render("item_index", { items: allItems });
})

exports.item_create_get = asyncHandler(async (req, res, next) => {
    const items = await Item.find({}, "name").exec();
    const categories = await Category.find({}, "name").exec();
    res.render("item_create", { items: items, categories: categories });
})

exports.item_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category").exec();
    res.render("item", { item: item });
})

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id, "name").exec();
    res.render("item_delete", { item: item });
})

exports.item_update_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category").exec();
    res.render("item_update", { item: item });
})

// POST
exports.item_create_post = [
    body('name').trim().notEmpty().escape(),
    body('description').trim().notEmpty().escape(),
    body('condition').trim().isIn('New', 'Used').escape(),
    body('stock').trim().notEmpty().isInt({ min: 0 }),
    body('category').trim().notEmpty().escape(),
    body('price').trim().notEmpty().isInt({ min: 0 }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty() && mongoose.isValidObjectId(req.body.category)) {
            const item = new Item({
                name: req.body.name,
                description: req.body.description,
                condition: req.body.condition,
                stock: req.body.stock,
                category: req.body.category,
                price: req.body.price
            })
            await item.save();
            res.redirect(item.url);
        }
    })
]

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    
})

exports.item_update_post = asyncHandler(async (req, res, next) => {
    
})