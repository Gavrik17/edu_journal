const managmentDB = require('../../managmentDB')


class SubjectRepository{
    constructor(){
        this.database = new managmentDB(process.env.DB_ACADEMIA)
    }

    // async getAll(CodPE){
    //     return await this.database.request(`SELECT [CodSelectSub], [NameSub], [NameGrup], [Year], [NumTerm], [YearStudy], [Active]
    //                                         FROM dbo.SelectedSubs, dbo.PlanWork, dbo.Subs, dbo.Grup
    //                                         WHERE SelectedSubs.CodPE = ${CodPE} AND SelectedSubs.CodPlan = PlanWork.id AND
    //                                         PlanWork.CodSub = Subs.CodSub AND PlanWork.CodGrup = Grup.CodGrup`)
    // }

    async getAll(CodPE){
        return await this.database.request(`SELECT [CodSelectSub], [NameSub], [CodGroup], [Active], [NameGrup], SelectedSubs.[CodPlan]
                                            FROM dbo.SelectedSubs, dbo.Subs, dbo.Grup
                                            WHERE SelectedSubs.CodPE = ${CodPE} AND SelectedSubs.CodSub = Subs.CodSub AND Grup.CodGrup = SelectedSubs.CodGroup`)
    }

    async getActual(){
        return await this.database.request(`SELECT [CodSelectSub], [NameSub], [CodGroup], [Active], [NameGrup], SelectedSubs.[CodPlan], [FIO]
                                            FROM dbo.SelectedSubs, dbo.Subs, dbo.Grup, personal.dbo.MyPassword
                                            WHERE SelectedSubs.CodSub = Subs.CodSub AND Grup.CodGrup = SelectedSubs.CodGroup
                                            AND Active = 1 AND SelectedSubs.CodPE = MyPassword.CodPE
                                            ORDER BY NameGrup, NameSub`)
    }

    async add(CodPE, CodPlan, CodSub, CodGroup){
        return await this.database.request(`INSERT INTO dbo.SelectedSubs (CodPE, CodPlan, CodSub, CodGroup)
                                            VALUES (${CodPE}, ${CodPlan}, ${CodSub}, ${CodGroup})
                                            
                                            SELECT @@ROWCOUNT AS rows`)
    }

    async find(CodPE, CodPlan, CodSub, CodGroup){
        return await this.database.request(`SELECT [CodSelectSub] 
                                            FROM dbo.SelectedSubs
                                            WHERE CodPlan = ${CodPlan} AND CodPE = ${CodPE}
                                            AND CodSub = ${CodSub} AND CodGroup = ${CodGroup}`)
    }

    // async owners(CodPlan){
    //     return await this.database.request(`SELECT TRIM(FIO) as FIO
    //                                         FROM dbo.SelectedSubs, personal.dbo.MyPassword
    //                                         WHERE CodPlan = ${CodPlan} AND SelectedSubs.CodPE = MyPassword.CodPE`)
    // }
    // WHERE 
	// `col1` IN (SELECT `col1` FROM `table` GROUP BY `col1` HAVING COUNT(*) > 1)
    // FROM users u, users u2
    // WHERE u.name = u2.name AND u.email = u2.email AND u.id > u2.id

    async owners(CodPlan, CodSub){
        return await this.database.request(`SELECT TRIM(FIO) as FIO
                                            FROM dbo.SelectedSubs, personal.dbo.MyPassword
                                            WHERE CodPlan = ${CodPlan} AND CodSub = ${CodSub} AND SelectedSubs.CodPE = MyPassword.CodPE
                                            ORDER BY FIO`)
    }

    async delete(id, CodPE){
        return await this.database.request(`DELETE FROM dbo.SelectedSubs
                                            WHERE CodSelectSub = ${id} AND COdPE = ${CodPE}
                                            
                                            SELECT @@ROWCOUNT AS rows
                                            `)
    }

    async archive(id, CodPE){
        return await this.database.request(`UPDATE dbo.SelectedSubs SET Active = 0
                                            WHERE CodSelectSub = ${id} AND COdPE = ${CodPE}
                                            
                                            SELECT @@ROWCOUNT AS rows`)
    }

    async active(id, CodPE){
        return await this.database.request(`UPDATE dbo.SelectedSubs SET Active = 1
                                            WHERE CodSelectSub = ${id} AND COdPE = ${CodPE}
                                            
                                            SELECT @@ROWCOUNT AS rows`)
    }
}


module.exports = new SubjectRepository