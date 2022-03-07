const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/carrito', productsController.carrito);
router.get('/vota-a-Loki', productsController.votaLoki);
router.get('/noche-mas-oscura', productsController.nocheMasOscura);
router.get('/shingeki-no-kyojin', productsController.shingekiNoKyojin);
router.get('/scott-pilgrim', productsController.scottPilgrim);

module.exports = router;