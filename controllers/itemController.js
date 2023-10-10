const Item = require("../models/item");
const Category = require("../models/category");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

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
exports.item_create_post = asyncHandler(async (req, res, next) => {
    
})

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    
})

exports.item_update_post = asyncHandler(async (req, res, next) => {
    
})