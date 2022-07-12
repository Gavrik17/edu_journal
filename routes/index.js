const {Router} = require('express')
const router = Router()

const userRoutes = require('./user-routes')
const groupRoutes = require('./group-routes')
const subjectRoutes = require('./subject-routes')
const planRoutes = require('./plan-routes')
const studytRoutes = require('./study-routes')

router.use('/user', userRoutes)
router.use('/groups', groupRoutes)
router.use('', subjectRoutes)
router.use('/planwork', planRoutes)
router.use('/study', studytRoutes)

module.exports = router