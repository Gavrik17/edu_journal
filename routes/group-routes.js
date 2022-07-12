const {Router} = require('express')
const router = Router()
const groupController = require('../controllers/group/group-controller')

router.get('/all', groupController.getAll)
router.get('/institute', groupController.getInstitute)
router.get('/economic', groupController.getEconomic)
router.get('/juridical', groupController.getJuridical)
router.get('/college', groupController.getCollege)


module.exports = router