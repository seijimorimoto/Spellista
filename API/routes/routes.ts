import Express from 'express';
import spellistaCtrl from '../controllers/spellistaController';

const router = Express.Router();

router.route('/playlists').get(spellistaCtrl.getPlaylists);
router.route('/user').post(spellistaCtrl.createUserIfNeeded);

export default router;
