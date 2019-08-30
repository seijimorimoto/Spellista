const express = require('express');
const spellistaCtrl = require('../controllers/spellistaController');

const router = express.Router();

router.route('/playlists').get(spellistaCtrl.getPlaylists);
router.route('/user').post(spellistaCtrl.createUserIfNeeded);

module.exports = router;
