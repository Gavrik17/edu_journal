const studyDate = require('../../services/date-service')
const groupRepository = require('./group-repository')


class Group{
    async getAll(req, res){
        let year = studyDate.getYear()
        let eco = await groupRepository.getEconomic(year)
        let jur = await groupRepository.getJuridical(year)
        let col = await groupRepository.getCollege(year)
        let result = [...eco, ...jur, ...col]

        return res.json(result)
    }

    async getInstitute(req, res){
        let year = studyDate.getYear()
        let eco = await groupRepository.getEconomic(year)
        let jur = await groupRepository.getJuridical(year)
        let result = [...eco, ...jur]

        return res.json(result)
    }

    async getEconomic(req, res){
        let year = studyDate.getYear()
        let result = await groupRepository.getEconomic(year)

        return res.json(result)
    }

    async getJuridical(req, res){
        let year = studyDate.getYear()
        let result = await groupRepository.getJuridical(year)

        return res.json(result)
    }

    async getCollege(req, res){
        let year = studyDate.getYear()
        let result = await groupRepository.getCollege(year)

        return res.json(result)
    }
}


module.exports = new Group