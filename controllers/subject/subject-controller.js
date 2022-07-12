const subjectRepository = require('./subject-repository')


class Subject{
    async getAll(req, res){
        let {id} = req.user
        let result = await subjectRepository.getAll(id)
        if (!result.length) {
            return res.json('Вы еще не выбрали ни одного предмета')
        }
        return res.json(result)
    }

    async getReview(req, res){
        let result = await subjectRepository.getActual()
        if (!result.length) {
            return res.json('У группы нет ниодного действующего предмета')
        }
        return res.json(result)
    }

    async getActive(req, res){
        let {id} = req.user
        let result = await subjectRepository.getAll(id)
        let processedData = result.filter((item) => item.Active)
        if (!processedData.length) {
            return res.json('Вы еще не выбрали ни одного предмета')
        }
        return res.json(processedData)
    }

    async getArchive(req, res){
        let {id} = req.user
        let result = await subjectRepository.getAll(id)
        let processedData = result.filter((item) => !item.Active)
        if (!processedData.length) {
            return res.json('Вы еще не добавили в архив ни один предмет')
        }
        return res.json(processedData)
    }

    async addOne(req, res){
        let {CodPlan, CodSub, CodGroup} = req.body

        let {id} = req.user
        
        let isThere = await subjectRepository.find(id, CodPlan, CodSub, CodGroup)
        
        if (isThere.length) {
            return res.status(201).json('Этот предмет уже добавлен')
        }

        let result = await subjectRepository.add(id, CodPlan, CodSub, CodGroup)
        let {rows} = result[0]

        if(rows){
            return res.status(201).json('Добавлен новый предмет')
        }
        return res.json('Произошла ошибка, предмет не добавлен')
    }

    async deleteOne(req, res){
        try{
            let {id} = req.body
            let CodPE = req.user.id
            let result = await subjectRepository.delete(id, CodPE)
            let {rows} = result[0]
            if(rows){
                return res.json('Предмет удален')
            }
            return res.json('Предмет не был удален')
        } catch (e) {
            return res.json('Произошла ошибка, предмет не удален')
        }
    }

    async makeNonActive(req, res){
        let {id} = req.body
        let CodPE = req.user.id
        let result = await subjectRepository.archive(id, CodPE)
        let {rows} = result[0]

        if(rows){
            return res.status(201).json('Предмет перемещен в архив')
        }
        return res.json('Предмет не был перемещен в архив')
    }

    async makeActive(req, res){
        let {id} = req.body
        let CodPE = req.user.id
        let result = await subjectRepository.active(id, CodPE)
        let {rows} = result[0]

        if(rows){
            return res.status(201).json('Предмет перемещен из архива в основной список')
        }
        return res.json('Предмет не перемещен из архива в основной список')
    }

    async getOwner(req, res){
        let {CodPlan, CodSub} = req.body
        let owners = await subjectRepository.owners(CodPlan, CodSub)
        
        return res.json(owners)
    }
}


module.exports = new Subject
