const express = require('express');
const spellistaCtrl = require('../controllers/spellistaController');
const router = express.Router();

router.route('/playlist').post(spellistaCtrl.getSpellistas);

module.exports = router;