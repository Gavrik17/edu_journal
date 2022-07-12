const planRepository = require('./plan-repository')
const StudyDate = require('../../services/date-service')
const errorApi = require('../../error/error-api')

//TODO: Протестить систему с разными датами
class Plan{
    async getCurrent(req, res, next){
        try {
            let term = StudyDate.getTerm()
            let {group} = req.params
            let result = await planRepository.getGroupPlan(group)
            let course = StudyDate.getCourse(result[0].BeginYear)

            result = result.filter(item => item.Course == course & item.NumTerm == term)
    
            if (!result.length) {
                return next(errorApi.badRequest('Не удалось найти учебный план, похоже такой группы не существует'))
            }
            return res.json(result)

        } catch (err) {
            return next(errorApi.badRequest('Не удалось найти учебный план, похоже такой группы не существует'))
        }
    }

    async getFull(req, res, next){
        try {
            let {group} = req.params
            const result = await planRepository.getGroupPlan(group)

            if (!result.length) {
                return next(errorApi.badRequest('Не удалось найти учебный план, похоже такой группы не существует'))
            }
            return res.json(result)
        } catch (err) {
            return next(errorApi.badRequest('Не удалось найти учебный план, похоже такой группы не существует'))
        }
        
    }
}


module.exports = new Plan