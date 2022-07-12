const {Router} = require('express')
const router = Router()
const userController = require('../controllers/user/user-controller')

router.post('/login', userController.login)
router.get('/list', userController.list)


module.exports = router