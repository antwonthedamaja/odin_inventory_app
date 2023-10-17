const Genre = require("../models/genre");
const Item = require("../models/item");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET
exports.genre_index = asyncHandler(async (req, res, next) => {
    const allGenres = await Genre.find().exec();
    res.render("pages/genre_index", { genres: allGenres })
})

exports.genre_create_get = asyncHandler(async (req, res, next) => {
    const genres = await Genre.find({}, "name").exec();
    res.render("pages/genre_create", { genres: genres })
})

exports.genre_get = asyncHandler(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id).exec();
    const items = await Item.find({ genre: req.params.id }).sort({ name: 1 }).exec();
    res.render("pages/genre", { genre: genre, items: items });
})

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id, "name").exec();
    res.render("pages/genre_delete", { genre: genre });
})

exports.genre_update_get = asyncHandler(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id).exec();
    res.render("pages/genre_update", { genre: genre });
})

// POST
exports.genre_create_post = [
    body('name').trim().notEmpty().escape(),
    body('description').trim().notEmpty().escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const genre = new Genre({
                name: req.body.name,
                description: req.body.description,
            })
            await genre.save();
            res.redirect(genre.url);
        }
    })
]

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    await Genre.findByIdAndDelete(req.params.id).exec();
    res.redirect("/genres")
})

exports.genre_update_post = [
    body('name').trim().notEmpty().escape(),
    body('description').trim().notEmpty().escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const genre = await Genre.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                description: req.body.description
            }).exec();
            res.redirect(genre.url);
        }
    })
]