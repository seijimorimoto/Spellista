import Express from 'express';
import spellistaCtrl from '../controllers/spellistaController';

const router = Express.Router();

router.route('/llista').post(spellistaCtrl.createLlista);
router.route('/llistas').get(spellistaCtrl.getLlistas);
router.route('/playlists').get(spellistaCtrl.getPlaylists);
router.route('/spellista').post(spellistaCtrl.createSpellista);
router.route('/spellistas').get(spellistaCtrl.getSpellistas);
router.route('/track').post(spellistaCtrl.addTrackToLlista);

export default router;
