var express = require('express');
var router = express.Router();

const category_controller = require('../controllers/categoryController')
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

// Category routes
// GET
router.get('/categories', category_controller.category_index)

router.get('/categories/create', category_controller.category_create_get)

router.get('/categories/:id', category_controller.category_get)

router.get('/categories/:id/delete', category_controller.category_delete_get)

router.get('/categories/:id/update', category_controller.category_update_get)
// POST
router.post('/categories/create', category_controller.category_create_post)

router.post('/categories/:id/delete', category_controller.category_delete_post)

router.post('/categories/:id/update', category_controller.category_update_post)

module.exports = router;