const {Router} = require('express')
const router = Router()
const planController = require('../controllers/planwork/plan-controller')
const isAuth = require('../middleware/authMiddleware')


router.get('/current/:group', planController.getCurrent)
router.get('/full/:group', planController.getFull)


module.exports = router