const studyRepository = require('./study-repository')


class Study{
    async getScoreTable(req, res){
        const {CodSelectSub} = req.body
        const name = await studyRepository.getSubName(CodSelectSub)
        const score = await studyRepository.getScore(CodSelectSub)
        const notes = await studyRepository.getNotes(CodSelectSub)
        const students = await studyRepository.getStudents(CodSelectSub)
        const result = {
            name: name[0].NameSub,
            students,
            score,
            notes
        }

        res.json(result)
    }

    async getVisitTable(req, res){
        try{
            const {CodSelectSub} = req.body
            const name = await studyRepository.getSubName(CodSelectSub)
            const visit = await studyRepository.getVisit(CodSelectSub)
            const notes = await studyRepository.getNotes(CodSelectSub)
            const students = await studyRepository.getStudents(CodSelectSub)
            const result = {
                name: name[0].NameSub,
                students,
                visit,
                notes
            }
    
            res.json(result)
        } catch (e) {
            console.log(e)
        }
        
    }

    async addScores(req, res){
        const data = req.body
        let count = 0
        data.forEach(async element => {
            count++
            await studyRepository.addScore(element)
        });

        let result = count == data.length ? true: false
        res.json(result)
    }

    async addVisits(req, res){
        const data = req.body
        let count = 0
        data.forEach(async element => {
            count++
            await studyRepository.addVisit(element)
        });

        let result = count == data.length ? true: false
        res.json(result)
    }

    async addNotes(req, res){
        const data = req.body
        let count = 0
        data.forEach(async element => {
            count++
            await studyRepository.addNote(element)
        });
        
        let result = count == data.length ? true: false
        res.json(result)
    }

    async updateScores(req, res){
        const data = req.body

        data.forEach(async element => {
            await studyRepository.updateScore(element)
        });

        res.json('update')
    }

    async updateVisits(req, res){
        const data = req.body

        data.forEach(async element => {
            await studyRepository.updateVisit(element)
        });

        res.json('update')
    }

    async updateNotes(req, res){
        const data = req.body

        data.forEach(async element => {
            await studyRepository.updateNote(element)
        });

        res.json('update')
    }
}

module.exports = new Study