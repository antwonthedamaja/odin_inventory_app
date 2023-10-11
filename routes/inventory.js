var express = require('express');
var router = express.Router();

const genre_controller = require('../controllers/genreController')
const item_controller = require('../controllers/itemController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Item routes
// GET
router.get('/items', item_controller.item_index)

router.get('/items/create', item_controller.item_create_get)

router.get('/items/:id', item_controller.item_get)

router.get('/items/:id/delete', item_controller.item_delete_get)

router.get('/items/:id/update', item_controller.item_update_get)
// POST
router.post('/items/create', item_controller.item_create_post)

router.post('/items/:id/delete', item_controller.item_delete_post)

router.post('/items/:id/update', item_controller.item_update_post)

// Genre routes
// GET
router.get('/genres', genre_controller.genre_index)

router.get('/genres/create', genre_controller.genre_create_get)

router.get('/genres/:id', genre_controller.genre_get)

router.get('/genres/:id/delete', genre_controller.genre_delete_get)

router.get('/genres/:id/update', genre_controller.genre_update_get)
// POST
router.post('/genres/create', genre_controller.genre_create_post)

router.post('/genres/:id/delete', genre_controller.genre_delete_post)

router.post('/genres/:id/update', genre_controller.genre_update_post)

module.exports = router;