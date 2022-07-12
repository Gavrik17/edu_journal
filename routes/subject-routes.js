const {Router} = require('express')
const router = Router()
const subjectController = require('../controllers/subject/subject-controller')
const isAuth = require('../middleware/authMiddleware')


router.get('/subs', isAuth, subjectController.getAll)
router.get('/subs/review', isAuth, subjectController.getReview)
router.get('/subs/active', isAuth, subjectController.getActive)
router.get('/subs/archive', isAuth, subjectController.getArchive)
router.get('/subs/owner', subjectController.getOwner)
router.post('/sub', isAuth, subjectController.addOne)
router.delete('/sub', isAuth, subjectController.deleteOne)
router.put('/sub/active', isAuth, subjectController.makeActive)
router.put('/sub/archive', isAuth, subjectController.makeNonActive)


module.exports = router