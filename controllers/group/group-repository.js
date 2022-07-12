const managmentDB = require('../../managmentDB')


class GroupRepository{
    constructor(){
        this.database = new managmentDB(process.env.DB_ACADEMIA)
    }

    async getEconomic(year){
        return await this.database.request(`SELECT [CodGrup], [NameGrup], [BeginYear], [CodOrganization], [CodFaculty]
                                            FROM dbo.Grup 
                                            WHERE BeginYear BETWEEN (${year}-YearStudy) AND ${year} 
                                            AND CodOrganization = 1 AND CodFormStudy = 0 AND CodFaculty = 86`)
    }

    async getJuridical(year){
        return await this.database.request(`SELECT [CodGrup], [NameGrup], [BeginYear], [CodOrganization], [CodFaculty]
                                            FROM dbo.Grup 
                                            WHERE BeginYear BETWEEN (${year}-YearStudy) AND ${year} 
                                            AND CodOrganization = 1 AND CodFormStudy = 0 AND CodFaculty = 83`)
    }

    async getCollege(year){
        return await this.database.request(`SELECT [CodGrup], [NameGrup], [BeginYear], [CodOrganization]
                                            FROM dbo.Grup 
                                            WHERE BeginYear BETWEEN (${year}-YearStudy) AND ${year} 
                                            AND CodOrganization = 2 AND CodFormStudy = 0`)
    }
}

module.exports = new GroupRepository