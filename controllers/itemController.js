const Item = require("../models/item");
const Genre = require("../models/genre");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose')

// GET
exports.item_index = asyncHandler(async (req, res, next) => {
    const allItems = await Item.find().sort({ name: 1 }).exec();
    res.render("pages/item_index", { items: allItems });
})

exports.item_create_get = asyncHandler(async (req, res, next) => {
    const genres = await Genre.find().exec();
    res.render("pages/item_create", { genres: genres });
})

exports.item_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("genre").exec();
    res.render("pages/item", { item: item });
})

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id, "name").exec();
    res.render("pages/item_delete", { item: item });
})

exports.item_update_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("genre").exec();
    res.render("pages/item_update", { item: item });
})

// POST
exports.item_create_post = [
    body('name').trim().notEmpty().escape(),
    body('description').trim().notEmpty().escape(),
    body('condition').trim().isIn('New', 'Used', 'Digital').escape(),
    body('stock').trim().notEmpty().escape().custom(value => {
        if (typeof parseInt(value) === Number && parseInt(value) < 0) {
            throw new Error('Stock must be greater than 0')
        } else if (typeof value === String && value != "Digital store key") {
            throw new Error('Value is not valid')
        }
        return true;
    }),
    body('genre').trim().notEmpty().escape().custom(value => {
        if (!mongoose.isValidObjectId(value)) {
            throw new Error("Genre value is not a valid ObjectID");
        }
        return true;
    }),
    body('developer').trim().notEmpty().escape(),
    body('platform').trim().notEmpty().escape(),
    body('released').trim().notEmpty().isLength(4).isNumeric(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const item = new Item({
                name: req.body.name,
                description: req.body.description,
                condition: req.body.condition,
                stock: req.body.stock,
                genre: req.body.genre,
                developer: req.body.developer,
                platform: req.body.platform,
                released: req.body.released
            })
            await item.save();
            res.redirect(item.url);
        }
    })
]

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    await Item.findByIdAndDelete(req.body.id).exec();
    res.redirect("/items");
})

exports.item_update_post = [
    body('name').trim().notEmpty().escape(),
    body('description').trim().notEmpty().escape(),
    body('condition').trim().isIn('New', 'Used', 'Digital').escape(),
    body('stock').trim().notEmpty().escape().custom(value => {
        if (typeof parseInt(value) === Number && parseInt(value) < 0) {
            throw new Error('Stock must be greater than 0')
        } else if (typeof value === String && value != "Digital store key") {
            throw new Error('Value is not valid')
        }
        return true;
    }),
    body('genre').trim().notEmpty().escape().custom(value => {
        if (!mongoose.isValidObjectId(value)) {
            throw new Error("Genre value is not a valid ObjectID");
        }
        return true;
    }),
    body('developer').trim().notEmpty().escape(),
    body('platform').trim().notEmpty().escape(),
    body('released').trim().notEmpty().isLength(4).isNumeric(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const item = await Item.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                description: req.body.description,
                condition: req.body.condition,
                stock: req.body.stock,
                genre: req.body.genre,
                developer: req.body.developer,
                platform: req.body.platform,
                released: req.body.released
            }).exec();
            res.redirect(item.url);
        }
    })
]