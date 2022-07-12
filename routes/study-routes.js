const {Router} = require('express')
const router = Router()
const studyController = require('../controllers/study/study-controller')
const isAuth = require('../middleware/authMiddleware')

router.post('/score', studyController.getScoreTable)
router.post('/visit', studyController.getVisitTable)
router.post('/addscore', studyController.addScores)
router.post('/addvisit', studyController.addVisits)
router.post('/addnote', studyController.addNotes)
router.put('/updatescore', studyController.updateScores)
router.put('/updatevisit', studyController.updateVisits)
router.put('/updatenote', studyController.updateNotes)



module.exports = router