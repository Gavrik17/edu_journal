const managmentDB = require('../../managmentDB')


class planWorkRepository{
    constructor(){
        this.database = new managmentDB(process.env.DB_ACADEMIA)
    }

    // async getCurrentPlan(group, year, term){
    //     return await this.database.request(`SELECT [id], [Year], [NumTerm], [NameSub]
    //                                         FROM dbo.PlanWork, dbo.Subs
    //                                         WHERE PlanWork.CodGrup = ${group} AND PlanWork.CodSub = Subs.CodSub
    //                                         AND PlanWork.Year = ${year} AND PlanWork.NumTerm = ${term}`)
    // }

    // async getGroupPlan(group){
    //     return await this.database.request(`SELECT [id], [Year], [NumTerm], [NameSub]
    //                                         FROM dbo.PlanWork, dbo.Subs
    //                                         WHERE PlanWork.CodGrup = ${group} AND PlanWork.CodSub = Subs.CodSub`)
    // }

    async getGroupPlan(group){
        return await this.database.request(`SELECT StudyContents.[CodPlan], [NameSub], [Course], [NumTerm], [BeginYear], Subs.[CodSub]
                                            FROM dbo.StudyContents, dbo.Subs, dbo.Grup, dbo.StudyTerm
                                            WHERE Grup.CodGrup = ${group} AND StudyContents.CodPlan = Grup.CodPlan AND StudyContents.CodSub = Subs.CodSub
                                            AND StudyTerm.CodPlan = Grup.CodPlan AND StudyTerm.CodSub = Subs.CodSub
                                            ORDER BY Course, NumTerm`)
    }


}


module.exports = new planWorkRepository