import Express from 'express';
import spellistaCtrl from '../controllers/spellistaController';

const router = Express.Router();

router.route('/playlists').get(spellistaCtrl.getPlaylists);
router.route('/spellistas').get(spellistaCtrl.getSpellistas);
router.route('/spellista').post(spellistaCtrl.createSpellista);

export default router;
