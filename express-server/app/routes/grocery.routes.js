const express = require('express');
const router = express.Router();
const groceryController = require('../controllers/grocery.controller');
const authMiddleware = require('../../config/authMiddleware');

router.use(authMiddleware); // protect all routes

router.get('/', groceryController.getAll);
router.post('/', groceryController.add);
router.put('/:id/toggle', groceryController.toggleFound);
router.put('/:id', groceryController.update);
router.delete('/:id', groceryController.remove);

module.exports = router;
