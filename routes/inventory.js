var express = require('express');
var router = express.Router();

const Genre = require("../models/genre");
const Item = require("../models/item");

const genre_controller = require('../controllers/genreController');
const item_controller = require('../controllers/itemController');
const fileController = require('../controllers/fileController');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const [
    numItems,
    numGenres,
  ] = await Promise.all([
    Item.countDocuments({}).exec(),
    Genre.countDocuments({}).exec(),
  ]);

  res.render('pages/index', { item_count: numItems, genre_count: numGenres });
});

// Item routes
// GET
router.get('/items', item_controller.item_index);

router.get('/items/create', item_controller.item_create_get);

router.get('/items/:id', item_controller.item_get);

router.get('/items/:id/delete', item_controller.item_delete_get);

router.get('/items/:id/update', item_controller.item_update_get);
// POST
router.post('/items/create', fileController.multer.single('image'), item_controller.item_create_post);

router.post('/items/:id/delete', item_controller.item_delete_post);

router.post('/items/:id/update', fileController.multer.single('image'), item_controller.item_update_post);

// Genre routes
// GET
router.get('/genres', genre_controller.genre_index);

router.get('/genres/create', genre_controller.genre_create_get);

router.get('/genres/:id', genre_controller.genre_get);

router.get('/genres/:id/delete', genre_controller.genre_delete_get);

router.get('/genres/:id/update', genre_controller.genre_update_get);
// POST
router.post('/genres/create', fileController.multer.single('image'), genre_controller.genre_create_post);

router.post('/genres/:id/delete', genre_controller.genre_delete_post);

router.post('/genres/:id/update', fileController.multer.single('image'), genre_controller.genre_update_post);

module.exports = router;